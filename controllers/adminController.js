import jwt from "jsonwebtoken";
import { database, db } from "../database.js";

const JWT_Secret = 'inikuncirahasia'

export const adminloginController = (req, res) => {
    res.render('loginadmin')
}

export const dbadminloginController = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.query(`select * from user where email = "${email}" and password = "${password}"`, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/loginadmin')
        }
        const pengguna = result[0]
        if (!pengguna) return res.redirect('/loginadmin')

        const token = jwt.sign({
            nama: pengguna.nama,
            email: pengguna.email,
            password: pengguna.password
        }, JWT_Secret, { expiresIn: '6h' })

        req.session.penggunaToken = token;
        return res.redirect('/buka')
    })
}


export const logoutadminController = (req, res) => {
    req.session.penggunaToken = undefined
    return res.redirect('/home')
}

export const cekadminController = (req, res, next) => {
    if (!req.session.penggunaToken)
        return res.redirect('/loginadmin')

    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna) => {
        if (err) {
            console.log(err)
            return res.redirect('/loginadmin')
        }
        req.pengguna = pengguna
        next()
    })
}

export const TransaksiadminController = (req, res) => {
    database.query('select * from items', (err, items) => {
        if (err) console.error(err);

        database.query('select * from pembukuan order by create_time desc limit 5', (err, pembukuan) => {
            if (err) console.error(err);
            res.render("transaksiadmin", {
                pembukuan: pembukuan || [],
                items: items || []
            })
        })
    })
}

export const tambahadminController = (req, res) => {
    const data = req.body;

    database.query('insert into items (name, harga, gambar) values (?,?,?)', [data.name, data.harga, data.gambar], (err, result) => {
        if (err) console.error(err);
        res.redirect('/transaksiadmin');
    })
}

export const transaksiadminController = (req, res) => {
    const data = req.body;

    database.query('insert into pembukuan (type, item_id, amount) values (?, ?, ?)', [data.type, data.item_id, data.amount], (err, result) => {
        if (err) {
            console.error(err);
            res.redirect('/transaksiadmin');
            return;
        }

        const qty = data.type === 'ditarik' ? data.amount * -1 : data.amount;
        database.query('update items set qty = qty + ? where id = ?', [qty, data.item_id], (err, result) => {
            if (err) console.error(err);
            res.redirect('/transaksiadmin');
        });
    })
}

export const updateItemController = (req, res) => {

    const id = req.params.id;

    database.query(`update items set status = "ready" where id = ${id}`)

    res.redirect('/transaksiadmin')
}