const { Telegraf } = require('telegraf');
const bot = new Telegraf('6342255727:AAHO8J2eVFEvQHNJATVXCB6oQd2kPzbilPw')

bot.start((ctx) => {
    ctx.reply('Welcome to MercadoPublico')
})
bot.command('licitaciones', (ctx) => {
    ctx.reply('licitaciones')

})

bot.launch()
