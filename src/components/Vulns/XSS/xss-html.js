import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Tabs, Tab } from "material-ui/Tabs";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Slider from "material-ui/Slider";
import './xss.css'
import user from '../../../images/user.png'

class XSS_html extends Component {
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
      ]
    };
    this.putValue = this.putValue.bind(this);
    this.refreshValue = this.refreshValue.bind(this);
    this.getScript = this.getScript.bind(this);
  }

  getScript() {
    if(this.state.inputValue.indexOf('<script>') > -1){
      const script = document.createElement("script");
      script.innerHTML = this.state.dangerousScript;
      script.async = true;
      document.body.appendChild(script);
    }
  }

  refreshValue(event) {
    this.setState({
      dangerousScript: event.target.value.replace(/<\/?[a-z][a-z0-9]*>/gi, ""),
      inputValue: event.target.value
    });
  }

  putValue() {
    this.setState({
      inputs: [...this.state.inputs, this.state.inputValue]
    });
  }

  render() {
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
      }
    };

    return (
      <div className="vuln">
        <Tabs>
          <Tab label="Описание">
            <div>
              <h2 style={styles.headline}>Описание уязвимости</h2>
              <p>This is an example tab.</p>
              <p>
                You can put any sort of HTML or react component in here. It even
                keeps the component state!
              </p>
              <Slider name="slider0" defaultValue={0.5} />
            </div>
          </Tab>
          <Tab label="Эксплуатация">
            <div>
              <header className="App-header">

                <ul>
                  {this.state.inputs.map(item => (
                    <Card>
                      <CardHeader
                        title="Username"
                        subtitle="Пользователь"
                        avatar={user}
                      />
                      
                      <CardText dangerouslySetInnerHTML={{ __html: `${item}`}}>
                        
                      </CardText>
                    </Card>
                  ))}
                </ul>
                <TextField
                  hintText="Ваше сообщение"
                  floatingLabelText="Введите сообщение"
                  onChange={this.refreshValue}
                />
                <RaisedButton
                  className="eventButton"
                  label="Отправить"
                  primary={true}
                  onClick={() => {this.putValue(); this.getScript()}}
                />
              </header>
            </div>
          </Tab>
          <Tab label="Защита">
            <div>
              <h2 style={styles.headline}>Tab Three</h2>
              <p>This is a third example tab.</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default XSS_html;
