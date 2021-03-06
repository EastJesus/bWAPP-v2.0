import React, { Component } from "react";
import auth from '../../../images/auth.jpg'

class Desc extends Component {
  render() {
    return (
      <div className="main">
        <img src={auth} alt="auth" />
        <h2>A5: Недостатки контроля доступа</h2>
        <p>
          Эксплуатация контроля доступа является основным навыком
          злоумышленников. Инструменты <a href="https://habr.com/ru/company/pt/blog/305000/">
          SAST и DAST </a> могут обнаружить отсутствие
          контроля доступа, но не могут проверить его работоспособность при его
          наличии. Наличие контроля доступа можно обнаружить вручную, а его
          отсутствие можно обнаружить автоматически в некоторых фреймворках.
        </p>
        <p>
          Уязвимости, связанные с контролем доступа, довольно распространены
          из-за отсутствия автоматического обнаружения и эффективного
          функционального тестирования разработчиками. Контроль доступа обычно
          не проверяется автоматическими статическими или динамическими тестами.
          Тестирование вручную — наилучший способ обнаружения отсутствия или
          неэффективности контроля доступа, включая методы HTTP (GET, PUT и т.
          п.), контроллеры, прямые ссылки на объекты и т. д.
        </p>
        <p>
          Технические последствия: выполнение злоумышленником действий с правами
          пользователя или администратора; использование пользователем
          привилегированных функций; создание, просмотр, обновление или удаление
          любых записей. Последствия для бизнеса зависят от критичности защиты
          приложения и данных.
        </p>
        <p>
          Контроль доступа предполагает наличие политики, определяющей права
          пользователей. Обход ограничений доступа обычно приводит к
          несанкционированному разглашению, изменению или уничтожению данных, а
          также выполнению непредусмотренных полномочиями бизнес-функций.
          Наиболее распространенные уязвимости контроля доступа включают:
          <br /> • обход ограничений доступа путем изменения URL, внутреннего состояния
          приложения или HTML-страницы, а также с помощью специально
          разработанных API;
          <br /> • возможность изменения первичного ключа для
          доступа к записям других пользователей, включая просмотр или
          редактирование чужой учетной записи; 
          <br /> • повышение привилегий.
          Выполнение операций с правами пользователя, не входя в систему, или с
          правами администратора, войдя в систему с правами пользователя; 
          <br /> • манипуляции с метаданными, например, повторное воспроизведение или
          подмена токенов контроля доступа JWT или куки-файлов, а также
          изменение скрытых полей для повышения привилегий или некорректное
          аннулирование JWT;
          <br /> • несанкционированный доступ к API из-за
          некорректной настройки междоменного использования ресурсов (CORS); •
          доступ неаутентифицированных пользователей к страницам, требующим
          аутентификации, или доступ непривилегированных пользователей к
          привилегированным страницам. Доступ к API с отсутствующим контролем
          привилегий для POST-, PUT- и DELETE-методов/запросов.
        </p>
        <h3>Неправильный контроль доступа</h3>
        <p>Если неправильно организовать контроль доступа к частям приложения,
          злоумышленник может получить доступ к страницам, к которым у него не должно быть
          доступа. Например, он не может зайти на страницу /admin, т.к. она защищена
          от просмотра обычными пользователям, но страница /admin/addUser не защищена, и 
          любой пользователь может зайти на нее.
        </p>
      </div>
    );
  }
}

export default Desc
