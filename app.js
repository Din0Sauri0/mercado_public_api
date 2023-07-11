const axios = require('axios')

const send_email = require('./send_email')


const url = 'https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?estado=activas&ticket=ACEEDB34-5640-46E1-990C-4D6B74EB71FC'
buscar = 'CAMA'
correoText = []

const get_all_licitaciones = async () => {
    try{
        const response = await axios.get(url)
        response.data.Listado.forEach(element => {
            upperCaseName = element.Nombre.toUpperCase()
            if(upperCaseName.search(buscar) != -1){
                text = element.CodigoExterno+' - '+upperCaseName
                correoText.push(text)
            }
        })
        send_email.send(correoText.join('\n \n'), response.data.Listado)
    }catch(err){
        console.log(err)
    }
};


get_all_licitaciones()

// let word = 'CAMA'
// let search = 'CAMA'

// let expresionRegular = new RegExp("\\b" + search + "\\b", "gi");
// let resultado = word.match(expresionRegular)
// console.log(resultado)

// LO DE ARRIBA ES UNA EXPRECION REGULAR PARA BUSCAR UNA PALABRA
// EXACTA, DENTRO DE UNA CADENA DE TEXTO