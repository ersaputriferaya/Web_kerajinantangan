import { db } from "../database.js"

export const indexController = (req, res) => {
    res.render('index')
}

export const homeController = (req, res) => {
    res.render('home')
}

export const aboutController = (req, res) => {
    return db.query('select * from user', (err, result) => {
        if (err) throw err
        return res.render('about', { user: result })
    })
    // res.render('about')
}

export const contactusController = (req, res) => {
    return db.query('select * from user', (err, result) => {
        if (err) throw err
        return res.render('contactus', { user: result })
    })
    // res.render('contactus')
}

export const bukaController = (req, res) => {
    return db.query('select * from user', (err, result) => {
        if (err) throw err
        return res.render('about', { user: result })
    })
    // res.render('buka')
}
export const mobilController = (req, res) => {
    res.render('mobil')
}
export const bonekaController = (req, res) => {
    res.render('boneka')
}
export const pesawatController = (req, res) => {
    res.render('pesawat')
}
export const kincirController = (req, res) => {
    res.render('kincir')
}
export const robotController = (req, res) => {
    res.render('robot')
}
export const vasController = (req, res) => {
    res.render('vas')
}
export const kartunController = (req, res) => {
    res.render('kartun')
}
export const rumahController = (req, res) => {
    res.render('rumah')
}
export const becakController = (req, res) => {
    res.render('becak')
}
export const tempattisuController = (req, res) => {
    res.render('tempattisu')
}
export const laciController = (req, res) => {
    res.render('laci')
}
export const lampuController = (req, res) => {
    res.render('lampu')
}
export const tempatsampahController = (req, res) => {
    res.render('tempatsampah')
}
export const piringController = (req, res) => {
    res.render('piring')
}
export const keranjangController = (req, res) => {
    res.render('keranjang')
}
export const standhpController = (req, res) => {
    res.render('standhp')
}
export const editController = (req, res) => {
    const id = req.params.id
    return db.query(`select * from user where id = ${id}`, (err, result) => {
        if (err) throw err
        return res.render('edit', { user: result[0] })
    })
}
// export const transaksiController = (req, res) => {
//     res.render('transaksi')
// }

export const aboutUserController = (req, res) => {

    res.render('aboutUser')
}

export const bukaUserController = (req, res) => {
    res.render('bukaUser')
}

export const contactusUserController = (req, res) => {
    res.render('contactusUser')
}

// export const transaksiUserController = (req, res) => {
//     res.render('transaksiUser')
// }