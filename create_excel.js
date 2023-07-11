const ExcelJs = require('exceljs')


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
    
    let file_name = `licitaciones-${day}-${month}-${hours}:${minutes}.xlsx`
    await workbook.xlsx.writeFile(`data_xlsx/${file_name}`)

    console.log('file created')
    console.log(file_name)

}

module.exports = {createExcel}