import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { titles, titleNames1, titleNames2 } from './config';

@inject(stores => ({
    active: stores.detail.active,
    switchMarket: stores.detail.switchMarket,
    currentData: stores.dates.currentData
}))
@observer
class Header extends Component {
    render() {
        const { type, active, switchMarket, currentData } = this.props;
        const marketTitles = type == 4 ? titleNames2 : titleNames1;

        return (
            <div className="detail-title">
                {marketTitles.map((name, i) => (
                    <div className={active == i ? 'type active' : 'type'} onClick={switchMarket.bind(null, i, type, currentData)} key={i}>{titles[name]}</div>
                ))}
            </div>
        )
    }
}

export default Header;
