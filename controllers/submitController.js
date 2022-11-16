import { request } from "express";
import { db } from "../database.js";


export const submitController = (req, res) => {

    const Emaill = req.body.email;
    const Passwordd = req.body.password;
    db.query(`insert into login (Email, Password) values ('${Emaill}','${Passwordd}')`)

    res.redirect('/buka')
}

// const JWT_Secret = 'inikuncirahasia'

// export const loginController = (req, res) => {
//     res.render('login')
// }

// export const dbloginController = (req, res) => {
//     const email = req.body.email
//     const password = req.body.password

//     db.query(`select * from login where Email = "${email}" and Password = "${password}"`, (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.redirect('/login')
//         }
//         const pengguna = result[0]
//         if (!pengguna) return res.redirect('/login')

//         const token = jwt.sign({
//             nama: pengguna.nama,
//             email: pengguna.email,
//             password: pengguna.password
//         }, JWT_Secret, { expiresIn: '6h' })

//         req.session.penggunaToken = token;
//         return res.redirect('/buka')
//     })
// }


// export const updateController = (req, res) => {
//     const id = req.params.id

//     db.query(`update user set password= "ersa123" where id = ${id}`)
//     res.redirect('/about')
// }

export const deleteController = (req, res) => {
    const id = req.params.id

    db.query(`delete from user where id = ${id}`)
    res.redirect('/about')
}

export const edittController = (req, res) => {
    const id = req.params.id
    const data = req.body
    console.log(data)

    db.query(`update user set nama = "${data.nama}", email = "${data.email}", password = "${data.password}" where id = ${id}`)
    res.redirect('/about')
}
