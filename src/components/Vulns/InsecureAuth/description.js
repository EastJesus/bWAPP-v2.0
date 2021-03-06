import React, { Component } from "react";
import auth from '../../../images/auth.png'

class Desc extends Component {
    render() {
        return (
            <div className="main">
                <img src={auth} alt="auth" />
                <h2>A2: Недостатки аутентификации</h2>
                <p>
                Подтверждение личности пользователя, аутентификация и управление
                сессиями играют важную роль в защите от атак, связанных с
                аутентификацией. Приложение имеет недостатки в аутентификации,
                если: <br />
                • допускается проведение автоматизированных атак, например,
                на учетные записи, когда у атакующего есть список действующих имен
                и паролей пользователей; <br />
                • допускается проведение атак методом подбора или других
                автоматизированных атак; <br />
                • допускается использование стандартных, ненадежных или хорошо
                известных паролей, например, "Password1" или "admin/admin"; <br />
                • используются ненадежные или неэффективные методы восстановления
                учетных данных и паролей, например, "ответы на основе знаний",
                которые являются небезопасными; <br />
                • используются незашифрованные, зашифрованные или ненадежно
                хешированные пароли <br />
                • отсутствует или является неэффективной многофакторная
                аутентификация; <br />
                • отображаются идентификаторы сессии в URL (например, перезапись
                URL); <br />
                • не меняются идентификаторы сессий после успешного входа в
                систему; <br />• некорректно аннулируются идентификаторы сессий.
                Пользовательские сессии или токены аутентификации (в частности,
                токены единого входа (SSO)) неправильно аннулируются при выходе из
                системы или бездействии
                </p>
                <h3>Примеры сценариев атак</h3>
                <p>
                <h4>Сценарий №1:</h4> <br/>Атака на учетные записи, с
                использованием списков известных паролей, является очень
                распространенной. Если в приложении нет защиты от
                автоматизированных атак или атак на учетные записи, то оно может
                быть использовано для определения действующих учетных данных.
                <h4>Сценарий №2:</h4> Большинство атак на аутентификацию связано с
                использованием исключительно паролей. Ранее считавшиеся хорошими
                требования к смене пароля и его сложности способствуют
                использованию и переиспользованию пользователями ненадежных
                паролей. Организациям рекомендуется отказаться от подобной
                практики (см. NIST 800-63) и внедрить многофакторную
                аутентификацию. 
                <h4>Сценарий №3:</h4> Тайм-ауты сессий настроены
                некорректно. Люди используют общедоступные компьютеры для доступа
                к приложению, а вместо "выхода из приложения" просто закрывают
                вкладку и уходят. Злоумышленник может открыть тот же самый
                браузер, спустя час, и воспользоваться все еще действующей
                аутентификацией пользователя.
                </p>
            </div>
        )
    }
}

export default Desc