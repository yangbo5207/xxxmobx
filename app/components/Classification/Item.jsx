import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Item extends Component {
    render() {
        const { data } = this.props;
        if (data.length != 0) {
            return (
                <div className="class-list">
                    {data.map((item, i) => (
                        <div key={i} dangerouslySetInnerHTML={{__html: item.type == 4 ? item.content : item.html}}></div>
                    ))}
                </div>
            )
        }
        return (
            <div className="noDate">暂无数据</div>
        )
    }
}

export default Item;
