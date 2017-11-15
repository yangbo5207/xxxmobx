import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getPrefixDateString } from 'utils/calendar';

@inject(stores => ({
    selectD: stores.dates.selectD,
    setSelectD: stores.dates.setSelectD,
    type: stores.calendar.type,
    monthType: stores.calendar.monthType,
    getFeeds: stores.dates.getFeeds
}))
@observer
class MonthItem extends Component {
    clickHandler = item => {
        const { setSelectD, getFeeds } = this.props;
        if (!item.isPreMonth && !item.isNextMonth) {
            setSelectD(item);
            getFeeds(item);
        }
    }
    getSpanClass = item => {
        const { selectD } = this.props;
        const selectDateString = getPrefixDateString(selectD);
        const nowDateString = getPrefixDateString(item);
        return !item.isPreMonth && !item.isNextMonth && selectDateString == nowDateString ? 'number active' : 'number'
    }
    render() {
        const { monthType, monthItemInfo } = this.props;

        return (
            <div>
                {[0, 1, 2, 3, 4, 5].map((itemA, a) => {
                    return (
                        <div className="row" key={a}>
                            {[0, 1, 2, 3, 4, 5, 6].map((itemB, b) => {
                                let curItem = monthItemInfo[a * 7 + b]
                                let nowDateString = getPrefixDateString(curItem)
                                let monthNumberClass = `date-number${curItem.isPreMonth ? ' preMonth' : ''}${curItem.isNextMonth ? ' nextMonth' : ''}`

                                const typeArr = !!monthType[nowDateString] ? monthType[nowDateString] : [];

                                return (
                                    <div className={monthNumberClass} onClick={this.clickHandler.bind(null, curItem)} key={b}>
                                        <span className={this.getSpanClass(curItem)}>{curItem.date}</span>
                                        {!curItem.isPreMonth && !curItem.isNextMonth && <div className="dots">
                                            {typeArr.indexOf(1) > -1 ? <span className="blue"></span> : null}
                                            {typeArr.indexOf(2) > -1 ? <span className="red"></span> : null}
                                            {typeArr.indexOf(3) > -1 ? <span className="green"></span> : null}
                                            {typeArr.indexOf(4) > -1 ? <span className="orange"></span> : null}
                                        </div>}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default MonthItem;
