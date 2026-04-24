const QRCode = require("qrcode");
const path = require("path");

const URL = "https://abdelilahwajid.com/";
const OUTPUT = path.join(__dirname, "qr-portfolio.png");

QRCode.toFile(OUTPUT, URL, {
  width: 200,
  margin: 1,
  color: {
    dark: "#ffffffFF",
    light: "#00000000",
  },
}).then(() => {
  console.log("✅ QR code saved →", OUTPUT);
});
