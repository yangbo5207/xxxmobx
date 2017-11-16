import React from 'react';
import { prefixZero } from 'utils/calendar';

function ChangeDate(props) {
    const { changeDay, selectD } = props;
    const { year, month, date } = selectD;

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

export default ChangeDate;
