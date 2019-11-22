import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { withRouter } from "react-router";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import TestQuestion from './TestQuestion'

class TakeTest extends Component {

    state = {
        testIsBegin: false,
        questions: [],
        questionObjects: [],
        testIsConfirmed: false,
        test_questions: null
    }

    componentWillMount() {
        const {match} = this.props
        this.props.getQueryTest(match.params.id)
    }

    componentDidUpdate() {
      if(!this.state.test_questions && this.props.test && this.props.test.test_questions) {
        let test = this.props.test
        let questions = test.test_questions.sort(() => {return Math.random() - 0.5})
        questions = questions.map(question => {
          question.question_answers.sort(() => {return Math.random() - 0.5})
          return question
        })
        this.setState({test_questions: questions})
      }  
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
                      "Количество вопросов: " + test.test_questions_count
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
                        onClick={() => {
                          this.props.openTestQuestions(test.id);
                          this.setState({
                            testIsBegin: true,
                            testIsConfirmed: false
                          });
                        }}
                      />
                    </CardActions>
                  </div>
                </Card>

                <section className="test__questions">
                  {this.state.testIsBegin &&
                    this.state.test_questions &&
                    this.state.test_questions &&
                    this.state.test_questions.map((question, index) => (
                      <ReactCSSTransitionGroup
                        transitionName="charts"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                      >
                        <TestQuestion
                          index={++index}
                          length={test.test_questions.length}
                          question={question}
                          confirmAnswer={this.confirmAnswer}
                        />
                      </ReactCSSTransitionGroup>
                    ))}
                </section>
                {this.state.testIsBegin && test.test_questions && (
                  <RaisedButton
                    primary={true}
                    label={"Проверить"}
                    className="confirmButton"
                    disabled={this.state.testIsConfirmed}
                    onClick={() => {
                      this.confirmTest(
                        test.pk,
                        test.test_questions.length,
                        this.state.questionObjects
                      );
                    }}
                  />
                )}
              </>
            )}
          </>
        );
    }

    confirmTest = (test, all_questions, questions) => {
        this.props.passTest(test, all_questions, questions)
        this.setState({testIsConfirmed: true})
        setTimeout(() => {
          this.props.history.push("/competence_center/courses/");
        }, 3000)
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

export default withRouter(TakeTest)