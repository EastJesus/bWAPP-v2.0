import React, { Component } from "react";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import ActionFavoriteBorder from "material-ui/svg-icons/action/favorite-border";

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    marginBottom: 16
  }
};

class QuestionAnswers extends Component {
    render() {

        const {question, answers} = this.props

        return (
          <div className="question__answer">
            <RadioButtonGroup name="shipSpeed">
              {answers &&
                answers
                .map(answer => (
                  <RadioButton
                    value={answer.id}
                    label={answer.title}
                    style={styles.radioButton}
                    onClick={() => {this.props.confirmAnswer(question, answer)}}
                  />
                ))}
            </RadioButtonGroup>
          </div>
        );
    }
}

export default QuestionAnswers