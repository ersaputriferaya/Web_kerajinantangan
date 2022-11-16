//module js

import express, { urlencoded } from 'express';
import { aboutController, aboutUserController, becakController, bonekaController, bukaController, bukaUserController, contactusController, contactusUserController, editController, homeController, indexController, kartunController, keranjangController, kincirController, laciController, lampuController, mobilController, pesawatController, piringController, robotController, rumahController, standhpController, tempatsampahController, tempattisuController, vasController } from './controllers/indexController.js';
import { deleteController, edittController, submitController } from './controllers/submitController.js';
import { cekuserController, dbloginController, dbRegistrasiController, loginController, logoutController, RegistrasiController, transaksiUserController, transaksiuserController, TransaksiuserController } from './controllers/userController.js';
import session from 'express-session';
import { adminloginController, cekadminController, dbadminloginController, logoutadminController, tambahadminController, transaksiadminController, TransaksiadminController, updateItemController } from './controllers/adminController.js';
const app = express();

app.use(urlencoded({ extended: true }))
// app.use(express.static('views'))
app.use(express.static('public'))
app.use(express.static('views/img'))
app.use(express.static('views/vid'))
app.use(session({
    secret: 'inikuncirahasia'
}));

app.set("view engine", "ejs")

app.get("/index", indexController);
app.get("/about", aboutController);
app.get("/contactus", contactusController);
app.get("/home", homeController);
app.get("/buka", cekadminController , bukaController);
app.get("/mobil", mobilController);
app.get("/boneka", bonekaController);
app.get("/pesawat", pesawatController);
app.get("/kincir", kincirController);
app.get("/robot", robotController);
app.get("/vas", vasController);
app.get("/kartun", kartunController);
app.get("/rumah", rumahController);
app.get("/becak", becakController);
app.get("/tempattisu", tempattisuController);
app.get("/laci", laciController);
app.get("/lampu", lampuController);
app.get("/tempatsampah", tempatsampahController);
app.get("/piring", piringController);
app.get("/keranjang", keranjangController);
app.get("/standhp", standhpController);
// app.get("/transaksi", transaksiController);
app.get("/aboutUser", aboutUserController);
app.get("/bukaUser", cekuserController , bukaUserController);
app.get("/contactusUser", contactusUserController);
// app.get("/transaksiUser", transaksiUserController);

app.post("/submit", submitController);
// app.get("/update/:id", updateController)
app.get("/delete/:id", deleteController)
app.get("/edit/:id", editController)
app.post("/edit/:id", edittController)

app.get("/registrasi", RegistrasiController)
app.post("/registrasi", dbRegistrasiController)

app.get("/login", loginController)
app.post("/login", dbloginController)

app.get("/logout", logoutController)

app.get("/loginadmin", adminloginController)
app.post("/loginadmin", dbadminloginController)
app.get("/logout", logoutadminController)

app.get("/transaksiadmin", cekadminController, TransaksiadminController)
app.post("/items/tambahadmin", tambahadminController)
app.post("/items/transaksiadmin", transaksiadminController)
app.get("/updateItem/:id", updateItemController)

app.get("/transaksiuser", cekuserController, TransaksiuserController, transaksiuserController)
app.post("/items/transaksiuser", transaksiUserController)

app.listen(3000, () => {
    console.log("app berjalan dengan baik")
})