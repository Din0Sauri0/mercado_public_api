const axios = require('axios')
const ExcelJs = require('exceljs')

const send_email = require('./send_email')

const url = 'https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?estado=activas&ticket=ACEEDB34-5640-46E1-990C-4D6B74EB71FC'
buscar = 'CAMA'
correoText = []


const createExcel = async (licitaciones) => {
    const workbook = new ExcelJs.Workbook()
    const worksheet = workbook.addWorksheet('Licitaciones')
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const day = now.getDate()
    const month = now.getMonth()

    worksheet.columns = [
        {header: 'ID', key: 'CodigoExterno', width: 10},
        {header: 'Nombre', key: 'Nombre', width:50}
    ]

    worksheet.addRows(licitaciones)

    await workbook.xlsx.writeFile(`data_xlsx/licitaciones-${day}-${month}-${hours}-${minutes}.xlsx`)
    console.log('file created')

}

const get_all_licitaciones = async () => {
    try{
        const response = await axios.get(url)
        createExcel(response.data.Listado)
        response.data.Listado.forEach(element => {
            upperCaseName = element.Nombre.toUpperCase()
            if(upperCaseName.search(buscar) != -1){
                text = element.CodigoExterno+' - '+upperCaseName
                correoText.push(text)
            }

        })
        send_email.send(correoText.join('\n \n'))
    }catch(err){
        console.log(err)
    }
};


get_all_licitaciones()