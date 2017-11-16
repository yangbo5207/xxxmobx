import React from 'react';
import { titles, titleNames1, titleNames2 } from './config';

function Header(props) {
    const { type, active, switchMarket } = props;
    const marketTitles = type == 4 ? titleNames2 : titleNames1;

    return (
        <div className="detail-title">
            {marketTitles.map((name, i) => (
                <div className={active == i ? 'type active' : 'type'} onClick={switchMarket.bind(null, i)} key={i}>{titles[name]}</div>
            ))}
        </div>
    )
}

export default Header;
