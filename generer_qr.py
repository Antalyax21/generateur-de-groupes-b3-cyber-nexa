import qrcode

url = "https://antalyax21.github.io/generateur-de-groupes-b3-cyber-nexa/"

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4
)

qr.add_data(url)
qr.make(fit=True)

image = qr.make_image(
    fill_color="black",
    back_color="white"
)

image.save("qr-generateur-groupes.png")

print("QR code généré !")