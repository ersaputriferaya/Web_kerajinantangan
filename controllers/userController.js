import jwt from "jsonwebtoken";
import { database, db } from "../database.js";

const JWT_Secret = 'inikuncirahasia'

export const RegistrasiController = (req, res) => {
    return res.render('registrasi')
}

export const dbRegistrasiController = (req, res) => {
    const nama = req.body.nama
    const email = req.body.email
    const password = req.body.password

    db.query(`insert into user (nama, email, password) values ('${nama}','${email}','${password}')`)

    res.redirect('/login')
}

export const loginController = (req, res) => {
    res.render('login')
}

export const dbloginController = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query(`select * from user where email = "${email}" and password = "${password}"`, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/login')
        }
        const pengguna = result[0]
        if (!pengguna) return res.redirect('/login')

        const token = jwt.sign({
            nama: pengguna.nama,
            email: pengguna.email,
            password: pengguna.password
        }, JWT_Secret, { expiresIn: '6h' })

        req.session.penggunaToken = token;
        return res.redirect('/bukaUser')
    })
}

export const logoutController = (req, res) => {
    req.session.penggunaToken = undefined
    return res.redirect('/home')
}

export const cekuserController = (req, res, next) => {
    if (!req.session.penggunaToken)
        return res.redirect('/login')

    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna) => {
        if (err) {
            console.log(err)
            return res.redirect('/login')
        }
        req.pengguna = pengguna
        next()
    })
}

export const transaksiuserController = (req,res)=>{
    res.render('transaksiuser')
}

export const TransaksiuserController = (req, res) => {
	database.query('select * from items', (err, items) => {
		if (err) console.error(err);

		database.query('select * from pembukuan order by create_time desc limit 5', (err, pembukuan) => {
			if (err) console.error(err);
			res.render("transaksiuser", {
				pembukuan: pembukuan || [],
				items: items || []
			})
		})
	})
}

export const transaksiUserController = (req, res) => {
	const data = req.body;

	database.query('insert into pembukuan (type, item_id, amount) values (?, ?, ?)', [data.type, data.item_id, data.amount], (err, result) => {
		if (err) {
			console.error(err);
			res.redirect('/transaksiuser');
			return;
		}

		const qty = data.type === 'dibeli' ? data.amount * -1 : data.amount;
		database.query('update items set qty = qty + ? where id = ?', [qty, data.item_id], (err, result) => {
			if (err) console.error(err);
			res.redirect('/transaksiuser');
		});
	})
}
