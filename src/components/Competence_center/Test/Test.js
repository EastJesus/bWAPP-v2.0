import React, {Component} from 'react'
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { List, ListItem } from "material-ui/List";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import { Link } from "react-router-dom";

class Test extends Component {
    render() {

        const {test} = this.props

        return (
          <Card className="course__cards_card">
            <CardHeader
              title={test.title}
              subtitle={"Количество вопросов: " + test.test_questions.length}
            />
            <CardText>
              <p className="card__related_title">Курс: {test.course.title}</p>
              <span className="card__description">{test.description}</span>
            </CardText>
            <div className="card__actions">
              <CardActions>
                <Link to={`/competence_center/tests/${test.id}/`}>
                  <RaisedButton
                    className="button__takeTest"
                    primary={true}
                    label="Пройти тест"
                  />
                </Link>
              </CardActions>
            </div>
          </Card>
        );
    }
}

class Tests extends Component {

    render() {
        const { tests, ...props } = this.props;
        
        return (
          <div className="cards">
            {tests && tests.map(test => (
                <Test test={test} />
            ))}
          </div>
        );
    }
}

export default Tests