import React, {Component} from 'react'
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { List, ListItem } from "material-ui/List";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Course extends Component {

    render() {

        const course = this.props.course

        return (
          <Card className="course__cards_card">
            <ReactCSSTransitionGroup
              transitionName="charts"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              transitionAppear={true}
              transitionAppearTimeout={500}
            >
              <CardHeader
                title={course.title}
                subtitle={course.description}
                avatar={course.icon}
              />
              <CardText>
                <p className="course__related_tests">Доступные тесты:</p>
                <List>
                  {course.course_tests &&
                    course.course_tests.map(test => (
                      <Link to={`/competence_center/tests/${test.id}/`}>
                        <ListItem
                          primaryText={test.title}
                          leftIcon={<ContentInbox />}
                        />
                      </Link>
                    ))}
                </List>
              </CardText>
            </ReactCSSTransitionGroup>
          </Card>
        );
    }
}

class Courses extends Component {

  componentWillMount() {
    this.props.getCourses();
  }

  render() {

    const {courses} = this.props

    return (
      <>
        <h3>Список курсов</h3>
        <div className="cards">
          {courses && courses.map(course => <Course course={course} />)}
        </div>
      </>
    );
  }
}


export default Courses