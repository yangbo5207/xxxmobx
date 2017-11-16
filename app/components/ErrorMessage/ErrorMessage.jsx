import React, { Component } from 'react';

import './style.scss';

class ErrorMessage extends Component {
    render() {
        return (
            <div className="error-wrap">
                出错啦！请<a onClick={this.props.queryData}>点击重试</a>
            </div>
        )
    }
}

export default ErrorMessage;
