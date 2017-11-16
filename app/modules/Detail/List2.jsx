import React from 'react';

import { countrys } from './config';

function List2(props) {
    const { currentMarketData } = props;

    return (
        <div>
            {currentMarketData.map((item, i) => {
                return (
                    <div className="item-sd" key={i}>
                        <div className="top">
                            <div className="top-l">
                                <div className="time">{item.datetime.split(' ')[1]}</div>
                                <div className={`national-flag ${countrys[item.country]}`}></div>
                                <div className="country">{item.country}</div>
                            </div>
                            <div className={ item.importance == 3 ? 'top-r active' : 'top-r' }>重要</div>
                        </div>
                        <div className="content">{ item.content }</div>
                        <div className="down">
                            <div className="current">{`今值：${!!item.actual ? item.actual : '— —'}`}</div>
                            <div className="previous">{`前值：${!!item.previous ? item.previous : '— —'}`}</div>
                            <div className="redict">{`预期：${!!item.expected ? item.expected : '— —'}`}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List2;
