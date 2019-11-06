import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import TestQuestion from './TestQuestion'

class TakeTest extends Component {

    state = {
        testIsBegin: false,
        questions: [],
        questionObjects: [],
        qu: []
    }

    componentWillMount() {
        const {match} = this.props
        this.props.getQueryTest(match.params.id)
    }

    render() {

        const {test, match} = this.props
        return (
          <>
            {test && (
              <>
                <Card className="course__cards_oneTest">
                  <CardHeader
                    title={test.title}
                    subtitle={
                      "Количество вопросов: " + test.test_questions.length
                    }
                  />
                  <CardText>
                    <p className="card__related_title">
                      Курс: {test.course.title}
                    </p>
                    <span className="card__description">
                      {test.description}
                    </span>
                  </CardText>
                  <div className="card__actions">
                    <CardActions>
                      <RaisedButton
                        primary={true}
                        label={
                          this.state.testIsBegin
                            ? "Вы начали прохождение теста"
                            : "Начать прохождение теста"
                        }
                        disabled={this.state.testIsBegin}
                        onClick={() => {this.setState({testIsBegin: true})}}
                      />
                    </CardActions>
                  </div>
                </Card>
                <section className="test__questions">
                  {this.state.testIsBegin && test &&
                    test.test_questions &&
                    test.test_questions.map((question, index) => (
                      <TestQuestion
                        index={++index}
                        length={test.test_questions.length}
                        question={question}
                        confirmAnswer={this.confirmAnswer}
                      />
                    ))}
                </section>
                {this.state.testIsBegin && 
                 <RaisedButton
                    primary={true}
                    label={'Проверить'}
                    className="confirmButton"
                    onClick={() => {this.confirmTest(test.pk, this.state.questionObjects)}}
                 />
                }
              </>
            )}
          </>
        );
    }

    confirmTest = (test, questions) => {
        this.props.passTest(test, this.state.questionObjects)
    }

    confirmAnswer = (question, answer) => {
        const questionObject = {
          question: question,
          answer: answer
        };
        if (this.state.questions.includes(question)) {
           
          let questionObjects = [...this.state.questionObjects];
          for (let i = 0; i < questionObjects.length; i++) {
            if (question.id == questionObjects[i].question.id) {
              
              questionObjects.splice(questionObjects.indexOf(questionObjects[i]), 1)
              questionObjects.push(questionObject);
              

              this.setState({questionObjects: questionObjects})
              break;
            }
          }
        } else {
          
          this.setState({
            questions: [...this.state.questions, question],
            questionObjects: [...this.state.questionObjects, questionObject]
          });
        }
    }
}

export default TakeTest