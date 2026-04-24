const QRCode = require("qrcode");
const path = require("path");

const URL = "https://www.abdelilahwajid.com/";
const OUTPUT = path.join(__dirname, "qr-portfolio.png");

QRCode.toFile(OUTPUT, URL, {
  width: 240,
  margin: 2,
  color: {
    dark: "#111827FF",
    light: "#FFFFFFFF",
  },
}).then(() => {
  console.log("✅ QR code saved →", OUTPUT);
});
