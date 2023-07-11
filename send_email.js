const nodemailer = require('nodemailer')

//Transporter cofiguration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'gustavo.ovalle.zambrano@gmail.com',
        pass: 'rsoceakwkdlxcivh'
    }
})

const send = (text) => {
    //Mail options
    const mailOptions = {
        from: 'gustavo.ovalle.zambrano@gmail.com',
        to: 'mioelectrico@gmail.com',
        subject: 'correo de prueba',
        text: text
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