import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as c from 'utils/calendar';

@inject(stores => ({
    selectD: stores.dates.selectD,
    setSelectD: stores.dates.setSelectD,
    type: stores.calendar.type,
    weekType: stores.calendar.weekType,
    getFeeds: stores.dates.getFeeds
}))
@observer
class WeekItem extends Component {
    clickHandler = item => {
        const { setSelectD, getFeeds } = this.props;
        setSelectD(item);
        getFeeds(item);
    }
    render() {
        let _key = 0;
        const { selectD, weekType, weekItemInfo } = this.props;
        const selectDateString = c.getPrefixDateString(selectD);
        return (
            <div className="week-wrap">
                {weekItemInfo.map((item, i) => {
                    const nowDateString = c.getPrefixDateString(item);
                    let typeArr = !!weekType[nowDateString] ? weekType[nowDateString] : [];

                    return (
                        <div className="date-number" onClick={this.clickHandler.bind(null, item)} key={`number${_key++}`}>
                            <span className={selectDateString == nowDateString ? 'number active' : 'number'}>{item.date}</span>
                            <div className="dots">
                                {typeArr.indexOf(1) > -1 ? <span className="blue"></span> : null}
                                {typeArr.indexOf(2) > -1 ? <span className="red"></span> : null}
                                {typeArr.indexOf(3) > -1 ? <span className="green"></span> : null}
                                {typeArr.indexOf(4) > -1 ? <span className="orange"></span> : null}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default WeekItem;
