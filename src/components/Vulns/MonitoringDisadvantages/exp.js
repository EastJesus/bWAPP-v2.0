import React, { Component } from "react";

class Exp extends Component {
    render() {
        return (
          <div className="main">
            <h2>Примеры сценариев атак</h2>
            <h3>Сценарий #1</h3>
            <p>
              {" "}
              Форум открытого проекта, используемый небольшой командой, был
              взломан через уязвимость в его ПО. Злоумышленники удалили
              внутренний репозиторий, содержащий следующую версию продукта, а
              также все содержимое форума. Несмотря на возможность
              восстановления источника, отсутствие мониторинга, журналирования
              или оповещений привело к более серьезным последствиям. Из-за
              инцидента программный проект с форума более не развивается.
            </p>
            <h3>Сценарий #2</h3>
            <p>
              Злоумышленник может использовать один стандартный пароль для
              проверки доступа ко всем учетным записям, к некоторым из них он
              может подойти. Для остальных будет зарегистрирована лишь неудачная
              попытка входа. Через несколько дней попытка может повториться, но
              уже с другим паролем.
            </p>
            <h3>Сценарий #3</h3>
            <p>
              В крупной торговой сети имеется песочница для внутреннего анализа
              вредоносных вложений. Средства песочницы обнаружили потенциально
              вредоносное ПО, но никто не обращал внимания на получаемые от
              песочницы предупреждения, пока взлом не обнаружили в связи с
              мошенническими транзакциями по банковским картам от стороннего
              банка
            </p>
            <br /> <br />
            <p>
              Хотя недостатки журналирования и мониторинга не является прямой
              уязвимостью, которой может воспользоваться злоумышленник и
              взломать приложение, в случае успешного взлома вы не узнаете об
              этом и не сможете вовремя отреагировать, а когда все таки узнаете
              об атаке, может быть слишком поздно.
            </p>
            <p>
              Например, в данном приложении можно осуществлять сколько угодно
              попыток входа в приложение, каждая попытка нигде не
              регистрируется, а ведь большое количество попыток входа (например,
              1000), скорее всего является атакой методом Брутфорс, которую
              необходимо блокировать и оповещать об этом разработчкиков.
              Воспользоваться этой атакой можно на вкладке <b>"A2: Недостатки аутентификации"</b> данного приложения.
            </p>
          </div>
        );
    }
}

export default Exp