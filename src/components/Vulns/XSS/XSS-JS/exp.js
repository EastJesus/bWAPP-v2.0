import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Card, CardHeader, CardText } from "material-ui/Card";

import user from "../../../../images/user.png";

class Exp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      dangerousScript: "",
      inputs: [
        "Всем привет! Как пропатчить KDE под FreeBSD?",
        "@username, Довольно давно существует KDE FreeBSD Initiative — ее команда специально занимается обеспечением высокого уровня совместимости между FreeBSD и KDE. Они обсуждают патчи, ищут ошибки и предлагают новые возможности. Присоединяйтесь — freebsd.kde.org",
        "Какой инструмент можете подкинуть для выполнения статического анализа различной бинарщины?",
        "Коллеги, узнал, что в принтерах стоит так называемый форматер. Что это за зверь?"
      ],
      regexp: 'replace(/</?[a-z][a-z0-9]*>/gi, "")'
    };
  }

  componentDidMount() {
    document.cookie = "userID=p25M98tGkfEWGR2";
    localStorage.name = "Alexey Kabanov";
    localStorage.age = "23";
    localStorage.location = "Moscow";
  }

  getScript = () => {
    if (this.state.inputValue.indexOf("<script>") > -1) {
      const script = document.createElement("script");
      script.innerHTML = this.state.dangerousScript;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  refreshValue = event => {
    this.setState({
      dangerousScript: event.target.value.replace(/<\/?[a-z][a-z0-9]*>/gi, ""),
      inputValue: event.target.value
    });
  };

  putValue = () => {
    this.setState({
      inputs: [...this.state.inputs, this.state.inputValue]
    });
  };

  render() {
    return (
      <div>
        <header className="App-header">
          {this.state.inputs.map(item => (
            <Card className="xss-card">
              <CardHeader
                title="Username"
                subtitle="Пользователь"
                avatar={user}
                className="userAvatar"
              />
              <CardText>{item}</CardText>
            </Card>
          ))}

          <TextField
            hintText="Ваше сообщение"
            floatingLabelText="Введите сообщение"
            onChange={this.refreshValue}
            className="xss__input"
          />
          <RaisedButton
            className="eventButton"
            label="Отправить"
            primary={true}
            onClick={() => {
              this.putValue();
              this.getScript();
            }}
          />
        </header>
      </div>
    );
  }
}

export default Exp;
