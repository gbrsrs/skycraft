const puppeteer = require('puppeteer')
const { minigames } = require('../config.json')

async function start(options) {

    try {

        let show = options.show
        if(show == true && show == false) show = false

        const browser = await puppeteer.launch({ headless: !show });
        return browser

    } catch(e) {

        console.log('Você não inseriu nenhum parametro de inicialização, não consegui iniciar com sucesso...')

    }

}

async function searchPage(options) {

    try {

        const page = await options.response.newPage()
        for(let i in minigames) {
    
            if(minigames[i].minigame === options.minigame.toLowerCase()) {
    
                confirm = true
                await page.goto(`https://skycraft.com.br/ranks/mg/${minigames[i].code}/${options.temporada}/pagina/${options.page}/ordem/1/1`)
    
                const data = await page.evaluate(() => {
    
                    const tds = Array.from(document.querySelectorAll('table tr'))
                    return tds.map(td => td.innerText)
            
                });
    
                let formatando = []
                let result = []
                
                data.forEach(x => {
            
                    formatando.push(x.replace(/s/g, ''))
            
                })
            
                let removing = formatando.slice(1, formatando.length)
                for (let i in removing) {
            
                    let a = removing[i].replace(/\n/g, '').replace(/\t/g, ' ')
                    let recorte = a.split(' ')
            
                    result.push(recorte)
            
                }

                setTimeout(() => {

                    if(result) {

                        return;

                    } else {

                        console.log('O tempo máximo de uma request foi obtido... A sua conexão com a internet está muito lenta.')

                    }

                }, 3000)
        
                return result
    
            }
    
        }


    } catch(e) {

        console.log('Um erro inesperado ocorreu durante a busca da página. Os parametros foram inseridos de forma incorreta, o que ocasionou falha no sistema.')

    }

}

module.exports = { start, searchPage }