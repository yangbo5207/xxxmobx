import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Item from './Item';

import './style.scss';

const typeNames = ['财报公布', '分红个股', '新股发行', '经济数据'];

@inject(stores => ({
    navProcess: stores.dates.navProcess
}))
@observer
class Classification extends Component {
    getPathInfo(index) {
        return {
            pathname: '/detail',
            query: {
                type: index + 1
            }
        }
    }
    render() {
        const {navProcess} = this.props;

        return (
            <div className="classification">
                {navProcess.map((item, index) => {
                    return (
                        <div className={'class-item item' + index} key={index}>
                            <div className="class-main">
                                <div className="class-title-wrap">
                                    <div className={"class-title"}>{typeNames[index]}</div>
                                    <div className={item.length > 0 ? 'show-more' : 'show-more hide'}>
                                        <Link to={`/detail/${index + 1}`}>更多
                                            <span className="arrow">
                                                <div className="arrow-item arrow-item1"></div>
                                                <div className="arrow-item arrow-item2"></div>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <Item data={ item } />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Classification;
