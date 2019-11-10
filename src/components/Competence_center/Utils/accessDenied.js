import React, {Component} from 'react'
import access_denied from '../../../images/access_denied.jpg'
import { Link, withRouter } from "react-router-dom";

class AccessDenied extends Component {
    render() {
        return (
          <div className="access_denied">
            <h3>
              Отказано в доступе. Пожалуйста,{" "}
              <Link to="/competence_center/login"> авторизуйтесь </Link>
            </h3>
            <img src={access_denied} alt="acces_denied" />
          </div>
        );
    }
}

export default AccessDenied