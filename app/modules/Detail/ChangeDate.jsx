import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { prefixZero, getDayInfo } from 'utils/calendar';

@inject(stores => ({
    selectD: stores.dates.selectD,
    setSelectD: stores.dates.setSelectD,
    getFeeds: stores.dates.getFeeds
}))
@observer
class ChangeDate extends Component {
    changeDay = (date, tag) => {
        const { setSelectD, getFeeds, type } = this.props;
        const newDate = getDayInfo(date, tag);
        setSelectD(newDate);
        getFeeds(newDate, type);
    }

    render() {
        const selectD = this.props.selectD;
        const { year, month, date } = selectD;
        const changeDay = this.changeDay;

        return (
            <div className="cur-date">
                <span className="date">
                    <span className="arrow2 arrow-left" onClick={changeDay.bind(null, selectD, false)}>
                        <div className="arrow2-item arrow2-item1"></div>
                        <div className="arrow2-item arrow2-item2"></div>
                    </span>
                    {`${year}年${prefixZero(month)}月${prefixZero(date)}日`}
                    <span className="arrow2 arrow-right" onClick={changeDay.bind(null, selectD, true)}>
                        <div className="arrow2-item arrow2-item1"></div>
                        <div className="arrow2-item arrow2-item2"></div>
                    </span>
                </span>
            </div>
        )
    }
}

export default ChangeDate;
