import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Classification from 'components/Classification';
import Calendar from 'components/Calendar';

@inject(stores => ({
    getFeeds: stores.dates.getFeeds,
    currentD: stores.dates.currentD
}))
@observer
class Index extends Component {
    componentDidMount() {
        const { currentD, getFeeds } = this.props;
        getFeeds(currentD);
    }
    render() {
        return ([
            <Calendar />,
            <Classification />
        ])
    }
}

export default Index;
