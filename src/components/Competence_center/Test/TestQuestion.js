import React, {Component} from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';

import QuestionAnswers from './QuestionAnswer'

const { noun, verb } = require("plural-ru");

class TestQuestion extends Component {
    render() {

        const {question, index, length} = this.props

        return (
          <>
            {question &&
                <div className="test__questions_question">
                  <Card>
                    <CardHeader
                      title={index + '/' + length + '. ' + question.title}
                      subtitle={noun(
                        question.score,
                        "%d балл",
                        "%d балла",
                        "%d баллов"
                      ) + ' ' + 'за правильный ответ'}
                    />
                    <CardText>
                      {question.question_answers &&
                        <QuestionAnswers question={question} answers={question.question_answers} confirmAnswer={this.props.confirmAnswer} />
                      }
                    </CardText>
                  </Card>
                </div>
            }
          </>
        );
    }
}

export default TestQuestion