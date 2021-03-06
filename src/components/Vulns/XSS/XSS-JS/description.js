import React, { Component } from "react";

import xss from "../../../../images/xss.png";
import xss_screen from "../../../../images/xss_screen.png";

class Description extends Component {

  render() {
    
    const script1 = `<script>alert("cookie: "+document.cookie)</script>`;
    const script2 = `http://site.ru/catalog?p=<script>alert("cookie: "+document.cookie)</script>`;

    return (
      <div className="vulnInner">
        
        <img src={xss} alt="" className="xss-image" />
        <h2 style={this.props.styles.headline}>A7: Межсайтовый скриптинг (Script)</h2>

        <p>
          {" "}
          XSS (межсайтовый скриптинг) – одна из разновидностей атак на
          веб-системы, которая подразумевает внедрение вредоносного кода на
          определенную страницу сайта и взаимодействие этого кода с удаленным
          сервером злоумышленников при открытии страницы пользователем.
        </p>

        <p>
          {" "}
          Термин с английского расшифровывается как Cross-Site Scripting, но при
          этом получил аббревиатуру XSS, чтобы не было путаницы с CSS (каскадные
          таблицы стилей).{" "}
        </p>

        <h2> Как работает межсайтовый скриптинг </h2>
        <p>
          {" "}
          Основная цель межсайтового скриптинга – кража cookies пользователей
          при помощи встроенного на сервере скрипта с дальнейшей выборкой
          необходимых данных и использованием их для последующих атак и взломов.
          Злоумышленник осуществляет атаку пользователей не напрямую, а с
          использованием уязвимостей веб-сайта, который посещают жертвы, и
          внедряет специальный JavaScript. В браузере у пользователей этот код
          отображается как единая часть сайта. При этом посещаемый ресурс по
          факту является соучастником XSS-атаки.{" "}
        </p>

        <p>
          {" "}
          Если сравнивать с SQL-инъекциями, то XSS безопасен для сервера, но
          несет угрозу для пользователей зараженного ресурса или страницы.
          Однако, если к злоумышленнику попадут cookies администратора, можно
          получить доступ к панели управления сайтом и его содержимому.{" "}
        </p>

        <h2> Методика атаки через XSS </h2>
        <p>
          {" "}
          Запуск вредоносного кода JavaScript возможен только в браузере жертвы,
          поэтому сайт, на который зайдет пользователь, должен иметь уязвимость
          к XSS. Для совершения атаки злоумышленник изначально проверяет ресурсы
          на наличие уязвимостей через XSS, используя автоматизированные скрипты
          или ручной режим поиска. Обычно это стандартные формы, которые могут
          отправлять и принимать запросы (комментарии, поиск, обратная связь).{" "}
        </p>

        <p>
          {" "}
          Проводится полный сбор страниц с формами ввода, и каждая сканируется
          на наличие уязвимостей. Например, у нас есть страница «Поиск» на
          сайте. Для проверки уязвимости XSS достаточно ввести запрос:{" "}
          <b>
            {" "}
            &lt;script&gt;alert("cookie: " + document.cookie)&lt;/script&gt;{" "}
          </b>{" "}
        </p>

        <p>
          {" "}
          Если на экране появится уведомление, значит вы обнаружили брешь в
          безопасности. В противном случае система отобразит вам страницу с
          результатами поиска. Основные популярные CMS уже давно лишились
          подобных проблем, но из-за возможности расширения функционала за счет
          модулей и плагинов, создаваемых сторонними разработчиками, шансы на
          использование уязвимостей XSS возрастают в разы, особенно в Joomla,
          DLE, Bitrix, Wordpress. Чаще всего XSS-уязвимости проверяются в
          браузере Internet Explorer.{" "}
        </p>

        <p>
          Еще один возможный вариант поиска – использование страниц, которые
          обрабатывают GET-запросы. Допустим, у нас есть ссылка вида:
          http://site.ru/catalog?p=8{" "}
        </p>

        <p>
          В адресной строке вместо идентификатора (8) добавляем скрипт –
          <pre class="prettyprint lang-js">{script1}</pre>В результате чего
          получаем ссылку такого вида:
          <pre class="prettyprint lang-js">{script2}</pre>
        </p>

        <p>
          Если страница имеет уязвимости XSS, на экране появится уведомление
          такого же плана, как и в первом случае.
        </p>

        <p>
          {" "}
          Для поиска «дыр» на сайте существует огромное количество готовых
          скриптов и запросов, и если ни один из них не подходит, значит ресурс
          надежно защищен от подобных атак.{" "}
        </p>

        <h2>Эксплуатация</h2>
        <p>
          Во второй вкладке данного приложения можно проэксплуатировать атаку
          XSS. Самый простой способ - это ввести в окно ввода скрипт,
          показывающий Cookie браузера:
          <b>
            {" "}
            &lt;script&gt;alert("cookie: " + document.cookie)&lt;/script&gt;{" "}
          </b>
          После этого появится окно с Cookie браузера.
        </p>
        <img src={xss_screen} alt="" className="xss-image" />
        <p>
          Cookie служат для сохранения учетных данных сайта на компьютере
          посетителя. <br />
          Если вы зарегистрировались на сайте под ником 'username123', то сайт
          сохранил у вас на компьютере файл с cookies, где закодированы ваши
          данные. <br />А если вы администратор и у вас есть доступ к сайту, а я
          - пользователь, который украл у вас cookies, то я могу зайти на сайт,
          и сайт меня определяет как 'admin' - у меня будут полные
          администраторские права.
        </p>
        <p>
          Если информация из полей ввода хранится в базе данных (блог, чат и
          т.д.), то злоумышленник может отправить в базу данных скрипт, который
          будет красть cookies пользователей и отправлять себе на почту. Т.к.
          все записи из БД выводятся для всех пользователей на страницу, то
          когда пользователь зайдет на сайт, этот скрипт загрузится для него из
          БД и сразу отправит cookies пользователя на почту злоумышленника.
        </p>
      </div>
    );
  }
}

export default Description;
