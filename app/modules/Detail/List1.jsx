import React from 'react';

import { subTitles } from './config';

function List1(props) {
    const { subTitleNames, open, subSplitData, changeOpen } = props;

    return (
        <div>
            {subTitleNames.map((name, i) => (
                <div className="item" key={i}>
                    <div className={open[i] && (subSplitData[name].length > 0) ? 'title' : 'title hide-border'} onClick={changeOpen.bind(null, i)}>
                        <span>{`${subTitles[name]}(${subSplitData[name].length})`}</span>
                        <span className={open[i] && (subSplitData[name].length > 0) ? 'arrow2 arrow-top' : 'arrow2 arrow-bottom' + (subSplitData[name].length == 0 ? ' hide' : '')}>
                            <div className="arrow2-item arrow2-item1"></div>
                            <div className="arrow2-item arrow2-item2"></div>
                        </span>
                    </div>
                    <div className={open[i] && (subSplitData[name].length > 0) ? 'sub-item open' : 'sub-item'}>
                        {subSplitData[name].map((item, i) => {
                            return (
                                <div key={i} dangerouslySetInnerHTML={{__html: item.html}}></div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List1;
