import React, { Component } from "react";

import sqlIcon from "../../../images/sql.png";
import table from "../../../images/Table.jpg";

class Description extends Component {
  render() {
      
    const high = `if(!preg_match("/^[0-9a-z\_\.\-]+@([\-a-z0-9]+\.)+[a-z]{2,}$/i", $email))
        {
            echo 'INVALID Email Address!';
            return;
        }`;
    const php2 = `
        $username = mysql_real_escape_string($username, $ dbLink);
        `;

    const php3 = `
        // Отключить вывод ошибок
        error_reporting(0);`;

    const php4 = `
        $visitorDbLink = mysql_connect('host', 'general_user', 'general_user_pass');
        $adminDbLink = mysql_connect('host', 'admin_user', 'admin_pass');
        `;

    return (
      <div className="tab__inner" onload="PR.prettyPrint()">
        <img src={sqlIcon} alt="sql" />
        <h2>A1: Инъекции</h2>
        <p>
          Для работы с базами данных используется язык SQL (Структурированный
          Язык Запросов). Это язык, который дает возможность создавать
          реляционные базы данных (и работать с ними), которые представляют
          собой наборы связанной информации, сохраняемой в таблицах. Реляционная
          база данных это тело связанной информации, сохраняемой в двумерных
          таблицах. Это напоминает адресную или телефонную книгу.
        </p>
        <img src={table} className="table" alt="table" />
        <p>
          Есть несколько основных команд SQL которые необходимо знать для работы
          с БД.
        </p>
        <h3>Вставка записи</h3>
        <pre class="prettyprint lang-sql">
          <p>
            INSERT INTO имя таблицы (имя поля1, имя поля2, ...) VALUES
            ('значение1','значение2',...)
          </p>
          <p>
            Добавляет в указаную таблицу поля и соответствующие им значения.
            Поля, которые существуют в таблице, но не указаны в данной команде
            получают 'неопределенное значение'. 'Неопределенное значение' - это,
            своего рода, внутренний флаг, который указывает MySQL, что поле не
            имеет значения.
          </p>
          Примеры:
          <p>
            INSERT INTO users (name, password, email) VALUES ('root', 'pass',
            'admin@localhost.com');
          </p>
          <p>
            Вставляет в таблицу "users" запись: root в поле name, pass в поле
            password
          </p>
          <p>INSERT INTO admins (name, posts) VALUES ('admin', 2);</p>
          <p>
            Вставляет в таблицу admins запись: admin в поле name и 2 в поле
            posts
          </p>
        </pre>

        <h3>Поиск и выборка</h3>
        <pre class="prettyprint lang-sql">
          <p>SELECT * FROM имя таблицы WHERE выражение</p>
          <p>
            Ищет в указанной таблице все записи, которые удовлетворяют условиям
            выражения. Знак * означает выбор всех полей записи, если нужно
            выбрать всего-лишь несколько полей, они перечисляются явным образом
            через запятую.
          </p>
          Примеры:
          <p>SELECT * FROM users; Выведет все записи из таблицы users</p>
          <p>
            SELECT name, email FROM users; Выведет записи колонок name и email
          </p>
          <p>
            SELECT name FROM admins WHERE post>2; Выведет записи колонки name из
            таблицы admins для которых соответствующее значение post>2
          </p>
          <p>SELECT * FROM admins WHERE name='root';</p>
        </pre>
        <h3>Атака</h3>

        <p>
          Если приложение взаимодействует с данными и пользователем (загружает
          данные, выводит их на странице, изменяет, записывает), значит сервер
          посылает базе данных запросы, похожие на приведенные выше (если
          используется реляционная база данных). <br />
          Такие атаки основаны на использовании языка SQL. Если используются
          NoSQL базы данных, то атака будет немного отличаться.
        </p>
        <p>
          Когда пользователь вводит что-либо в поле ввода для поиска,
          фильтрации, добавления или изменения данных, сервер обрабатывает этот
          ввод и посылает базе данных сформированный SQL - запрос. <br />
          Суть атаки заключается в том, что мы можем дополнить и изменить этот
          запрос, просто добавив в поле ввода/строку поиска свой SQL - код,
          написанный специальным способом.
        </p>
        <p>
          Например, рассмотрим пример, представленный на второй вкладке. Есть
          некоторая система, позволяющая осуществить поиск по имени пользователя
          в системе. При этом изначально все пользователи скрыты, а некоторые
          имена составлены таким образом, что случайно их не найти (например,
          #mySqlAdminDBusers1984__hidden). Если вы введете какое-нибудь имя и
          нажмете на кнопку поиска, сервер сформирует и отправит базе данных
          следующий запрос:
          <pre class="prettyprint lang-sql">
            SELECT username, lastname, email FROM users WHERE username =
            'Andrey'
          </pre>
        </p>
        <p>
          Если в приложении есть SQL - уязвимости, то мы можем изменить запрос,
          формируемый сервером, дописав к имени пользователя часть своего
          запроса:
          <pre class="prettyprint lang-sql">Andrey' OR username = 'Alexey</pre>
          Таким образом мы закрываем кавычку после имени пользователя и
          добавляем оператор OR (ИЛИ), а в конце кавычку не закрываем, т.к. это
          сделаем сервер при формировании запроса. В итоге получится следующий
          запрос:
          <pre class="prettyprint lang-sql">
            SELECT username, lastname, email FROM users WHERE username =
            'Andrey' OR username = 'Alexey'
          </pre>
          Таким образом мы подделали запрос и вывели несколько пользователей
          сразу.
        </p>
        <p>
          Чтобы вывести всех пользователей, мы можем использовать следующую
          конструкцию:
          <pre class="prettyprint lang-sql">Andrey' OR '1' = '1</pre>
          Дело в том, что условие верно, 1 = 1, поэтому такое условие будет
          выполняться всегда, независимо от того, какое имя мы ввели.
          <br />В итоге получим следующий запрос:
          <pre class="prettyprint lang-sql">
            SELECT username, lastname, email FROM users WHERE username =
            'Andrey' OR '1' = '1'
          </pre>
          С помощью этой конструкции сервер отдаст нам список всех
          пользователей.
        </p>
        <p>
          Конечно, просто списка пользователей нам мало. Нас интересуют скрытые
          поля - например, пароли пользователей. Т.к. по умолчанию запрос отдает
          только три поля, нам нужно воспользоваться SQL - оператором UNION, с
          помощью которого мы можем объеденить несколько запросов - один из них
          будет запросом сервера, а второй мы напишем сами, выбрав интересующие
          нас поля.
          <br />
          Важное замечение: при использовании оператора UNION на выходе
          получается объединенная таблица из двух запросов. Дело в том, что
          количество строк и полей в обоих запросах должны быть идентичны.{" "}
          <br />
          Предположим, что у всех пользователей есть поле password. Тогда напишем в поле ввода следующее:
          <pre class="prettyprint lang-sql">
            Andrey' UNION SELECT username, lastname, password FROM users WHERE
            '1' = '1
          </pre>
          На выходе получится запрос вида:
          <pre class="prettyprint lang-sql">
            SELECT username, lastname, email WHERE username = 'Andrey' UNION
            SELECT username, lastname, password FROM users WHERE '1' = '1'
          </pre>
          <p>
            И теперь видим, что сервер отдал нам хеши паролей всех пользователей
            в колонке "почта", которые мы можем попробовать взломать и войти от
            их имени.
          </p>
        </p>
      </div>
    );
  }
}

export default Description;
