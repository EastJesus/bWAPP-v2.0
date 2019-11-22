import React, {Component} from 'react'
import './style.scss'

class Loader extends Component {
    render() {
        return (  
          <div className="loader-container">
            <div class="📦"></div>
            <div class="📦"></div>
            <div class="📦"></div>
            <div class="📦"></div>
            <div class="📦"></div>
          </div>
        );
    }
}

export default Loader