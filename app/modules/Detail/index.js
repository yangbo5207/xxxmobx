import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import Loading from 'components/Loading';

import Header from './Header';
import ChangeDate from './ChangeDate';
import List1 from './List1';
import List2 from './List2';

import './style.scss';

import { typeNames } from './config';

/**
 * 最初的原始数据，由接口获得，未经过处理
 */

@inject(stores => ({
    currentMarketData: stores.detail.currentMarketData,
    loading: stores.dates.loading,
    currentD: stores.dates.currentD,
    getFeeds: stores.dates.getFeeds
}))
@observer
class Detail extends Component {
    componentDidMount() {
        const type = this.props.match.params.type;
        const { getFeeds, currentD } = this.props;
        document.title = typeNames[type - 1];
        getFeeds(currentD, type);
    }

    render() {
        const { loading, currentMarketData } = this.props;
        const type = this.props.match.params.type;

        return (
            <div className="detail">
                <Header type={type} />
                <ChangeDate type={type} />
                {loading ? <Loading /> :
                    <div className="list-wrap">
                        {type != 4 && <List1 />}
                        {type == 4 && <List2 />}
                        {type == 4 && currentMarketData.length == 0 && <div className="no-data">暂无数据</div>}
                </div>
                }
            </div>
        )
    }
}

export default Detail;
