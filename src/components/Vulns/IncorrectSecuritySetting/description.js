import React, { Component } from "react";
import security from '../../../images/security.jpg'

class Description extends Component {
  render() {
    return (
      <div className="main">
        <h2>A6: Некорректная настройка параметров безопасности</h2>
        <img src={security} alt="security" />
        <p>
          Злоумышленники часто пытаются эксплуатировать неисправленные
          уязвимости, настроенные по умолчанию учетные записи, неиспользуемые
          страницы, незащищенные файлы и каталоги для получения
          несанкционированного доступа или информации о системе
        </p>
        <p>
          Настройка безопасности может быть выполнена некорректно на любом
          уровне приложения, включая сетевые службы, платформы, веб-службы,
          сервер, базу данных, фреймворки, код, а также предустановленные
          виртуальные машины, контейнеры или хранилища. Для поиска уязвимых
          настроек, настроенных по умолчанию учетных записей, неиспользуемых
          служб, устаревших параметров и т. п. можно использовать
          автоматизированные сканеры
        </p>
        <p>
          Подобные уязвимости позволяют злоумышленникам получить
          несанкционированный доступ к системным данным или функциям, а также
          могут привести к полной компрометации системы. Последствия для бизнеса
          зависят от критичности защиты приложения и данных.
        </p>
        <h3>Является ли приложение уязвимым?</h3>
        <p>Приложение уязвимо, если:</p>
        <ul>
          <li>
            Любой из компонентов приложения недостаточно защищен или разрешения
            облачных сервисов некорректно настроены
          </li>
          <li>
            Включены или присутствуют лишние функции (например, неиспользуемые
            порты, службы, страницы, учетные записи или привилегии)
          </li>
          <li>
            Учетные записи и пароли, создаваемые по умолчанию, используются без
            изменений
          </li>
          <li>
            Обработка ошибок позволяет осуществить трассировку стека или
            получить слишком подробные сообщения об ошибках
          </li>
          <li>
            Отключены или некорректно настроены последние обновления
            безопасности
          </li>
          <li>
            Не выбраны безопасные значения параметров защиты серверов
            приложений, фреймворков (например, Struts, Spring, ASP.NET),
            библиотек и т. п
          </li>
          <li>
            Сервер не использует безопасные заголовки или директивы, а также
            если они некорректно настроены
          </li>
          <li>ПО устарело или имеет уязвимости </li>
        </ul>
      </div>
    );
  }
}

export default Description
