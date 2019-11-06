import React, { Component } from "react";

class Defense extends Component {
    render() {
        return (
            <div className="main">
                <p>
                Контроль доступа эффективен только при реализации через проверенный код на стороне сервера или беcсерверный API, где атакующий не может изменять проверки прав доступа или метаданные.
                </p>
                <h2>Запрет доступа по умолчанию</h2>
                <p>Необходимо запрещать доступ к опредленным страницам по умолчанию, за исключением открытых ресурсов.</p>
                <h2>Контроль доступа</h2>
                <p>Важно реализовать механизмы контроля доступа и использовать их во всех приложениях, а также минимизировать междоменное использование ресурсов.</p>
                <h2>Отключение вывода информации о сервер</h2>
                <p>Необходимо отключить вывод списка каталогов веб-сервера, а также обеспечить отсутствие метаданных файлов (например, .git) и файлов резервных копий в корневых веб-каталогах.</p>
                <h2>Ограничение частоты обращения к API</h2>
                <p>Нужно ограничивать частоту доступа к API и контроллерам для минимизации ущерба от инструментов автоматизации атак.</p>
                <h2>Аннулирование токенов</h2>
                <p>Необходимо аннулировать токены JWT на сервере после выхода пользователя из системы.</p>
            </div>
        )
    }
}

export default Defense