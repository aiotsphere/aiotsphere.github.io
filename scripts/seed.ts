import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const firestore = admin.firestore();

async function seedUsers() {
  const users = [
    {
      id: 'system_admin',
      email: 'admin@utcc.ac.th',
      displayName: 'UTCC Admin',
      role: 'administrator',
      locale: 'en',
      xp: 12000,
      level: 15,
      loyaltyPoints: 1500,
      badges: ['founder', 'strategist'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const batch = firestore.batch();
  users.forEach((user) => {
    const ref = firestore.collection('users').doc(user.id);
    batch.set(ref, user);
  });

  await batch.commit();
}

async function main() {
  await seedUsers();
  console.log('Seed complete');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
