const puppeteer = require('puppeteer');
var fs = require('fs')

var array = fs.readFileSync('./passwords.txt').toString().split("\n");

 (async () => {
    const browser = await puppeteer.launch({headless: false, args: ['--no-sandbox', '--disable-notifications']});
    const page = await browser.newPage();
    for(let i = 0; i < array.length; i += 2) {
        await page.goto('http://127.0.0.1:3000/sandbox/auth');
        const login = await page.$$('#username');
        await login[0].click();
        await login[0].type(array[i]);
        const pass = await page.$$('#password');
        await pass[0].click();
        await pass[0].type(array[i + 1]);
        const submit = await page.$$('.eventButton');
        await submit[0].click();
        
        await page.waitFor(2000)
        const text = await page.$eval('.swal2-header', (heading) => {
            return heading.innerText;
        })

        if(text.indexOf("успешно") > -1) {
            console.log('ok')
            fs.appendFile('./success.txt', `Логин: ${array[i]}, пароль: ${array[i + 1]}\n`, (err) => {
                if(err) console.log(err)
            })
        }
    }
        
  })();


