import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@observer
class Detail extends Component {
    componentWillReact() {
        console.log(this.props);
    }
    render() {
        return (
            <div>xxxxxxx detail</div>
        )
    }
}

export default Detail;
