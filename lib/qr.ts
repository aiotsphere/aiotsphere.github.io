import QRCode from "qrcode";

export async function createQrDataUrl(url: string) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 720,
    color: {
      dark: "#081120",
      light: "#FFFFFF"
    }
  });
}
