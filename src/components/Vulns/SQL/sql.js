import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from "material-ui/Tabs";
import sqlIcon from '../../../images/sql.png'
import table from '../../../images/Table.jpg'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import './sql.css'
import axios from 'axios';

class SqlInjection extends Component{
    constructor(props){
        super(props);
        this.state = {
            inputSql: null,
            users: null
        }
    }

    refreshValue = (event) => {
        this.setState({
            inputSql: event.target.value
        })
    }

    getUser = () => {
        axios.get(`http://localhost:8080/api/getUser/${this.state.inputSql}`)
        .then(res => {
            const users = res.data;
            this.setState({
                users: users
            });
            console.log(this.state.users)
        })
    }

    getAllUsers = () => {
        axios.get('http://localhost:8080/api/allUsers')
        .then(res => {
            const users = res.data;
            this.setState({
                users: users
            })
            console.log(this.state.users)
        })
    }

    
    render(){


        const high = `if(!preg_match("/^[0-9a-z\_\.\-]+@([\-a-z0-9]+\.)+[a-z]{2,}$/i", $email))
        {
            echo 'INVALID Email Address!';
            return;
        }`
        const php2 = `
        $username = mysql_real_escape_string($username, $ dbLink);
        `

        const php3 = `
        // Отключить вывод ошибок
        error_reporting(0);`
        

        const php4 = `
        $visitorDbLink = mysql_connect('host', 'general_user', 'general_user_pass');
        $adminDbLink = mysql_connect('host', 'admin_user', 'admin_pass');
        `
        
        return(
            <div className="sql">
                <Tabs>
                    <Tab label="Описание">
                        <div className="tab__inner">
                            <h1>SQL Инъекции</h1>
                            <img src={sqlIcon} alt="sql" />
                            <p>
                                Для  работы  с  базами  данных  используется язык  SQL  (Структурированный Язык Запросов). 
                                Это язык, который дает возможность создавать реляционные базы данных 
                                (и  работать  с  ними), которые представляют собой наборы связанной информации,
                                сохраняемой  в таблицах. Реляционная база данных это тело связанной информации,
                                сохраняемой в двумерных таблицах. Это напоминает адресную или телефонную книгу.
                            </p>
                            <img src={table} className="table" alt="table" />
                            <p>Есть  несколько основных команд SQL которые необходимо знать для  работы  с  БД.</p>
                            <h3>Вставка записи</h3>
                            <pre class="prettyprint lang-sql">
                            <p>INSERT INTO имя таблицы (имя поля1, имя поля2, ...) VALUES ('значение1','значение2',...)</p>
                            <p>Добавляет  в указаную таблицу поля и соответствующие им значения. Поля,  которые
                            существуют  в  таблице, но не указаны в данной команде получают  'неопределенное
                            значение'.  'Неопределенное  значение' -  это,  своего  рода,  внутренний  флаг,
                            который указывает MySQL, что поле не имеет значения.</p>
                            
                            Примеры:
                            
                            <p>INSERT INTO users (name, password, email) VALUES ('root', 'pass', 'admin@localhost.com');</p>
                            <p>Вставляет в таблицу "users" запись: root в поле name, pass в поле password</p>

                            <p>INSERT INTO admins (name, posts) VALUES ('admin', 2);</p>
                            <p>Вставляет в таблицу  admins  запись: admin в поле name и 2 в поле posts</p>
                            
                            </pre>
                           
                           <h3>Поиск и выборка</h3>
                            <pre class="prettyprint lang-sql">
                            
                            <p>SELECT * FROM имя таблицы WHERE выражение</p>

                                <p>Ищет  в  указанной таблице все записи, которые удовлетворяют условиям выражения.
                                Знак * означает выбор всех полей записи, если нужно выбрать всего-лишь несколько
                                полей, они перечисляются явным образом через запятую.</p>

                                Примеры: 

                                <p>SELECT * FROM users;
                                Выведет все записи из таблицы users</p>

                                <p>SELECT name, email FROM users;
                                 Выведет записи колонок name и email</p>

                               <p>SELECT name FROM admins WHERE post>2;
                                 Выведет записи колонки name из таблицы admins для которых соответствующее значение post>2</p>

                                <p>SELECT * FROM admins WHERE name='root';</p>
                            </pre>
                            <h3>Атака</h3>
                        
                            <p>Если приложение взаимодействует с данными и пользователем
                                (загружает данные, выводит их на странице, изменяет, записывает), 
                                значит сервер посылает базе данных запросы, похожие на приведенные выше
                                (если используется реляционная база данных). <br/> 
                                Такие атаки основаны на использовании языка SQL. Если используются NoSQL
                                базы данных, то атака будет немного отличаться.
                            </p>
                            <p>Когда пользователь вводит что-либо в поле ввода для поиска, фильтрации,
                                добавления или изменения данных, сервер обрабатывает этот ввод и посылает 
                                базе данных сформированный SQL - запрос. <br />
                                Суть атаки заключается в том, что мы можем дополнить и изменить 
                                этот запрос, просто добавив в поле ввода/строку поиска 
                                свой SQL - код, написанный специальным способом.
                            </p>
                            <p>Например, рассмотрим пример, представленный на второй вкладке. 
                                Есть некоторая система, позволяющая осуществить поиск по имени пользователя
                                в системе.
                                При этом изначально все пользователи скрыты, а некоторые имена
                                составлены таким образом, что случайно их не найти 
                                (например, #mySqlAdminDBusers1984__hidden).
                                Если вы введете какое-нибудь имя и нажмете на кнопку поиска,
                                сервер сформирует и отправит базе данных следующий запрос:
                                <pre class="prettyprint lang-sql">
                                    SELECT username, lastname, email FROM users WHERE username = 'Andrey'
                                </pre>
                            </p>
                            <p>
                                Если в приложении есть SQL - уязвимости, то мы можем изменить запрос,
                                формируемый сервером, дописав к имени пользователя часть своего запроса:
                                <pre class="prettyprint lang-sql">
                                    Andrey' OR username = 'Alexey
                                </pre>
                                Таким образом мы закрываем кавычку после имени пользователя и добавляем 
                                оператор OR (ИЛИ), а в конце кавычку не закрываем, т.к. это сделаем сервер
                                при формировании запроса. В итоге получится следующий запрос:
                                <pre class="prettyprint lang-sql">
                                    SELECT username, lastname, email FROM users WHERE username = 'Andrey' OR username = 'Alexey'
                                </pre>
                                Таким образом мы подделали запрос и вывели несколько пользователей сразу.
                            </p>
                            <p>
                                Чтобы вывести всех пользователей, мы можем использовать следующую конструкцию:
                                <pre class="prettyprint lang-sql">
                                   Andrey' OR '1' = '1
                                </pre>
                                Дело в том, что условие верно, 1 = 1, поэтому такое условие будет выполняться
                                всегда, независимо от того, какое имя мы ввели.<br/>
                                В итоге получим следующий запрос:
                                <pre class="prettyprint lang-sql">
                                SELECT username, lastname, email FROM users WHERE username = 'Andrey' OR '1' = '1'
                                </pre>
                                С помощью этой конструкции сервер отдаст нам список всех пользователей.
                            </p>
                            <p>Конечно, просто списка пользователей нам мало. Нас интересуют скрытые поля - 
                                например, пароли пользователей. Т.к. по умолчанию запрос отдает только три поля,
                                нам нужно воспользоваться SQL - оператором UNION, с помощью которого мы можем
                                объеденить несколько запросов - один из них будет запросом сервера, а второй мы
                                напишем сами, выбрав интересующие нас поля.
                                <br/>
                                Важное замечение: при использовании оператора UNION на выходе получается
                                объединенная таблица из двух запросов. Дело в том, что количество строк и 
                                полей в обоих запросах должны быть идентичны. <br/>
                                Предположим, что у всех пользователей есть поле password. Тогда составим напишем
                                в поле ввода следующее:
                                <pre class="prettyprint lang-sql">
                                Andrey' UNION SELECT username, lastname, password FROM user WHERE '1' = '1
                                </pre>
                                На выходе получится запрос вида:
                                <pre class="prettyprint lang-sql">
                                SELECT username, lastname, email WHERE username = 'Andrey' 
                                UNION SELECT username, lastname, password FROM user WHERE '1' = '1'
                                </pre>
                                <p>И теперь видим, что сервер отдал нам хеши паролей всех пользователей
                                    в колонке "почта",
                                    которые мы можем попробовать взломать и войти от их имени.
                                </p>
                            </p>
                        </div>
                    </Tab>
                    <Tab label="Эксплуатация">
                      <div className="injection__wrapper">
                        {this.state.users && 
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderColumn> ID </TableHeaderColumn>
                                        <TableHeaderColumn> Имя </TableHeaderColumn>
                                        <TableHeaderColumn> Фамилия </TableHeaderColumn>
                                        <TableHeaderColumn> Почта </TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {this.state.users.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn> {index} </TableRowColumn>
                                            <TableRowColumn> {user.username} </TableRowColumn>
                                            <TableRowColumn> {user.lastname} </TableRowColumn>
                                            <TableRowColumn> {user.email} </TableRowColumn>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        }

                        <TextField
                            hintText="Введите имя сотрудника"
                            floatingLabelText="Введите имя сотрудника"
                            onChange={this.refreshValue}
                            className="inputField"
                        />
                        <RaisedButton
                            label="Найти"
                            primary={true}
                            onClick={this.getUser}
                            className="viewStaff"
                        />
                        <RaisedButton
                            label="Вывести всех сотрудников"
                            primary={true}
                            onClick={this.getAllUsers}
                            className="viewStaff"
                        />
                        </div>
                      </Tab>
                    <Tab label="Защита">
                        <div className="tab__inner">
                            <h1>Способы защиты от SQL - инъекций</h1>
                            <h3>Использование параметризованных запросов</h3>
                            <p>Вместо того, чтобы подставлять значения SQL-заявлений напрямую, подставляйте их параметризованные значения</p>
                            <pre class="prettyprint lang-php">
                            $db_connection = new mysqli("localhost", "user", "pass", "db"); <br/>
                            $statement = $db_connection->prepare("SELECT * FROM customers WHERE id = ?");<br/>
                            $statement->bind_param("i", $id);<br/>
                            $statement->execute();
                            </pre>
                            <h3>Применение регулярных выражений</h3>
                            <pre class="prettyprint lang-php">
                            {high}
                            </pre>
                            <p>Регулярные выражения используются для того, чтобы привести 
                                входные данные к одному шаблону. Например, здесь мы проверяем 
                                email клиента на валидность и отвергаем возможность для SQL-инъекций.</p>
                            <p>Также вы можете пользоваться встроенными функциями PHP is_array(), 
                                is_bool(), is_double(), is_float(), is_int(), is_integer() и другими, 
                                для проверки данных пользователя.</p>    
                            <h3>Использование функции блокировки</h3>   
                            <p>Используйте функцию mysql_real_escape_string() для обработки внешних данных. </p>
                            <pre class="prettyprint lang-php">
                                {php2}
                            </pre>
                            <p>
                            Это очень мощная встроенная функция PHP, способная предотвратить SQL-инъекции 
                            в большинстве случаев. Вы можете попробовать внедрить SQL-код после 
                            использования mysql_real_escape_string() и тестировать на уязвимости. 
                            Эта функция отвергает множество умных методов атак, используемых злоумышленниками.
                            </p>
                            <h3>Отключение сообщений об ошибках</h3>
                            <p>Прежде всего избегайте встроенной MySQL функции mysql_error(). 
                                Умный взломщик может угадать некоторые параметры базы данных из 
                                сообщения об ошибке, а иногда и увидеть параметры соединения. 
                                Используйте mysql_error() только на стадии разработки. Но убирайте ее, 
                                когда запускаете сайт на сервере. 
                                Также отключите отчеты об ошибках в PHP. Это делается 
                                одной строкой:</p>
                            <pre class="prettyprint lang-php">
                                {php3}
                            </pre>    
                            <p>В результате, пользователь не узнает из сообщения об ошибке никакой важной информации, 
                                такой как, имя базы данных, имя таблицы, имя пользователя и других. Тем самым мы 
                                усложняем хакеру возможность узнать структуру SQL-запроса, 
                                используя различные инъекции.</p>
                            <h3>Создайте менее привилегированного пользователя БД</h3>   
                            <p>В большинстве случаев, вы заметите, что посетителям не нужно удалять или 
                                обновлять информацию. Представим интернет-магазин. Пользователь может запросить 
                                данные (SELECT) или оставить заказ (INSERT). <br/>
                                Таким образом, лучше создать несколько различных пользователей. 
                                Для администратора предоставить все привилегии, а для обычного 
                                пользователя ограниченные. Пример соединения для различных пользователей:
                            </p>
                            <pre class="prettyprint lang-php">
                                {php4}
                            </pre>   
                            <p>Теперь можно использовать $visitorDbLink для регулирования доступа к базе данных 
                                для посетителей, и использовать $adminDbLink для доступа в качестве администратора.</p>
                            <h3>Использование специальных библиотек</h3>
                            <p>Для любого языка уже созданые специальные библиотеки, которые помогают защитить
                                приложение от атак, автоматически используя встроенные функции. 
                                Например, для Node.js используется библиотека node-mysql, которая 
                                автоматически применяет экранирование символов и другие функции
                                защиты от инъекций.
                            </p>  
                        </div>  
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default SqlInjection