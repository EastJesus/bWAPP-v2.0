import React, { Component } from "react";

const xml = `<?xml version="1.0" encoding="ISO-8859-1"?>
            <!DOCTYPE foo [
            <!ELEMENT foo ANY >
            <!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
            <foo>&xxe;</foo>`

const xml2 = `<!ENTITY xxe SYSTEM "https://192.168.1.1/private" >]>`
const xml3 = `<!ENTITY xxe SYSTEM "file:///dev/random" >]>`

class Exp extends Component {
    render() {
        return (
          <div className="main">
            <p>
              Было зафиксировано большое количество XXE-атак, включая атаки на
              встроенные устройства. XXE обнаруживаются в самых неожиданных
              местах, включая глубоко вложенные зависимости. Самым простым
              способом реализации атаки является загрузка (если поддерживается)
              вредоносного XML-файла:
            </p>
            <h3>Сценарий #1</h3>
            <p>
              Злоумышленник пытается получить данные с сервера:
              <pre class="prettyprint lang-js">{xml}</pre>
            </p>
            <h3>Сценарий #2</h3>
            <p>
              Злоумышленник исследует внутреннюю сеть сервера, заменяя
              вышеуказанную строку ENTITY на:
              <pre class="prettyprint lang-js">{xml2}</pre>
            </p>
            <h3>Сценарий #3</h3>
            <p>
              Злоумышленник пытается вызвать отказ в обслуживании, используя
              потенциально бесконечный файл:
              <pre class="prettyprint lang-js">{xml3}</pre>
            </p>
          </div>
        );
    }
}

export default Exp