import React from 'react';
import * as c from 'utils/calendar';

export default function(props) {
    const { setDate, selectDate, monthType, monthItemInfo } = props;
    const selectDateString = c.getPrefixDateString(selectDate);

    return (
        <div>
            {[0, 1, 2, 3, 4, 5].map((itemA, a) => {
                return (
                    <div className="row" key={a}>
                        {[0, 1, 2, 3, 4, 5, 6].map((itemB, b) => {
                            let curItem = monthItemInfo[a * 7 + b]
                            let nowDateString = c.getPrefixDateString(curItem)
                            let monthNumberClass = `date-number${curItem.isPreMonth ? ' preMonth' : ''}${curItem.isNextMonth ? ' nextMonth' : ''}`

                            const typeArr = !!monthType[nowDateString] ? monthType[nowDateString] : [];

                            return (
                                <div className={monthNumberClass} onClick={!curItem.isPreMonth && !curItem.isNextMonth && setDate.bind(null, { selectD: curItem })} key={b}>
                                    <span className={!curItem.isPreMonth && !curItem.isNextMonth && selectDateString == nowDateString ? 'number active' : 'number'}>{curItem.date}</span>
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
