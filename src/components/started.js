import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import owasp from "../images/owasp.png";
import "./started.css";

class Started extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <ReactCSSTransitionGroup
          transitionName="charts"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          transitionAppear={true}
          transitionAppearTimeout={500}
        >
          <CardHeader title="OWASP TOP-10" className="CardHeader" />
          <CardMedia className="CardMedia">
            <img className="owasp" src={owasp} alt="" />
          </CardMedia>
          <CardText className="CardText">
            <p>
              {" "}
              Современный мир несет в себе тысячи угроз и потенциальных
              опасностей буквально на каждом шагу и в каждый момент времени.
              Всемирная сеть, ставшая неотъемлемой частью нашей жизни, не
              является исключением.
            </p>

            <p>
              Киберпреступность сейчас развита как никогда – ведь почти каждая
              компания имеет свой сайт в интернете, а злоумышленник в сети может
              легко оставаться абсолютно анонимным.
            </p>

            <p>
              При этом все компании, имеющие сайт в интернете, делятся на три
              типа:
              <ul>
                <li>Те, чей сайт уже сломали;</li>
                <li>Те, чей сайт еще не ломали;</li>
                <li>
                  Те, кто знаком с основными векторами атак и защитил
                  приложения.
                </li>
              </ul>
            </p>

            <p>
              Количество угроз растет пропорционально росту бизнеса, однако как
              показала многолетняя практика, 99% атак происходят через десяток
              стандартных ошибок валидации входящих данных, либо обнаруженные
              уязвимости в установленных компонентах программного обеспечения
              сторонних производителей, либо банально, по халатности системных
              администраторов, использующих настройки и пароли, установленные
              по-умолчанию.
            </p>
            <p>
              Классификацией векторов атак и уязвимостей занимается сообщество
              OWASP (Open Web Application Security Project). Это международная
              некоммерческая организация, сосредоточенная на анализе и улучшении
              безопасности программного обеспечения.
            </p>
            <p>
              OWASP создал список из 10-и самых опасных векторов атак на
              Web-приложения, этот список получил название OWASP TOP-10 и в нем
              сосредоточены самые опасные уязвимости, которые могут стоить
              некоторым людям больших денег, или подрыва деловой репутации,
              вплоть до потери бизнеса.
            </p>

            <p>
              В этом приложении рассматривается список OWASP TOP-10, а также
              подробно рассматривается каждый из перечисленных векторов атак,
              методы практической эксплуатации, степень опасности на примерах
              реального бизнеса, а также методы практической защиты
              Web-приложений и Web-сервисов.
            </p>
          </CardText>
          {/*}
          <CardActions className="button__wrapper">
            <RaisedButton label="Перейти к инструкции" className="mainButton" secondary={true} />
          </CardActions>
          {*/}
        </ReactCSSTransitionGroup>
      </Card>
    );
  }
}

export default Started;
