import React from 'react';
import * as c from 'utils/calendar';

export default function(props) {
    let _key = 0;
    const { setDate, selectDate, weekType, weekItemInfo } = props;
    const selectDateString = c.getPrefixDateString(selectDate);
    return (
        <div className="week-wrap">
            {weekItemInfo.map((item, i) => {
                const nowDateString = c.getPrefixDateString(item);
                let typeArr = !!weekType[nowDateString] ? weekType[nowDateString] : [];

                return (
                    <div className="date-number" onClick={setDate.bind(null, { selectD: item })} key={`number${_key++}`}>
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
