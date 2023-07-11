if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}
const nodemailer = require('nodemailer')
const create_excel = require('./create_excel')

//Transporter cofiguration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_AUTH_EMAIL,
        pass: process.env.USER_AUTH_PASSWORD
    }
})

const send = (text, json_data_excel) => {

    create_excel.createExcel(json_data_excel)

    //Mail options
    const mailOptions = {
        from: process.env.USER_AUTH_EMAIL,
        to: process.env.USER_TO_EMAIL,
        subject: 'correo de prueba',
        text: text,
        
    }

    //Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
        }else{
            
            console.log('Correo envia '+info.response)
        }
    })
}

module.exports = {send}