import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const firestore = admin.firestore();

export const createCertificate = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Authentication required.');
  }

  const { userId, activityId, registrationId } = data;
  if (!userId || !activityId || !registrationId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required certificate data.');
  }

  const certificateId = firestore.collection('certificates').doc().id;
  const certificate = {
    id: certificateId,
    userId,
    activityId,
    registrationId,
    status: 'issued',
    issuedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await firestore.collection('certificates').doc(certificateId).set(certificate);

  return { certificateId };
});
