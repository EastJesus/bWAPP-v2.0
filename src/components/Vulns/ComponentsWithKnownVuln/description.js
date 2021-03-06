import React, { Component } from "react";
import hearthbleed from "../../../images/hearthbleed.jpg"

class Description extends Component {
    render() {
        return (
          <div className="main">
            <img src={hearthbleed} alt="hearthbleed" />
            <h2>A9: Использование компонентов с известными уязвимостями</h2>
            <p>
              Несмотря на простоту поиска уже готовых эксплойтов для большинства
              известных уязвимостей, некоторые из них требуют создания
              специальных средств для их эксплуатации
            </p>
            <p>
              Данная уязвимость является очень распространенной. Шаблоны для
              разработчиков, содержащие большое количество компонентов, могут
              привести к непониманию того, какие компоненты реально используются
              в приложении или API. Некоторые сканеры, такие как retire.js,
              могут помочь с обнаружением уязвимостей, но определение сложности
              их эксплуатации потребует дополнительных усилий.
            </p>
            <p>
              Несмотря на то, что не все уязвимости приводят к серьезным
              последствиям, причиной некоторых масштабных взломов стали именно
              компоненты, содержащие известные уязвимости. В зависимости от
              защищаемых активов подобная угроза может оказаться на вершине
              вашего списка
            </p>
            <h3>Является ли приложение уязвимым?</h3>
            <p>
              Приложение уязвимо, если:
              <ul>
                <li>
                  Вы не знаете версии всех используемых (на стороне клиента и на
                  стороне сервера) компонентов. Сюда относятся сами компоненты и
                  встроенные зависимости
                </li>
                <li>
                  ПО содержит уязвимости, не поддерживается или устарело. Сюда
                  относятся ОС, веб-серверы, серверы приложений, СУБД,
                  приложения, API, а также все компоненты, среды исполнения и
                  библиотеки
                </li>
                <li>
                  Поиск уязвимостей выполняется нерегулярно, а также отсутствует
                  подписка на бюллетени по безопасности используемых компонентов
                </li>
                <li>
                  Своевременно не устанавливаются исправления или обновления для
                  используемых платформ, фреймворков и зависимостей. Обычно
                  такое происходит, когда наличие обновлений проверяется раз в
                  месяц или квартал, в результате чего организации неделями или
                  месяцами не устраняют исправленные уязвимости
                </li>
                <li>
                  Разработчики ПО не тестируют совместимость обновленных или
                  исправленных библиотек
                </li>
              </ul>
            </p>
          </div>
        );
    }
}

export default Description