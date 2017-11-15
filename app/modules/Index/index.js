import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Classification from 'components/Classification';

@inject(stores => ({
    getFeeds: stores.dates.getFeeds,
    currentD: stores.dates.currentD
}))
@observer
class Index extends Component {
    componentDidMount() {
        const { currentD, getFeeds } = this.props;
        console.log(currentD);
        getFeeds(currentD);
    }
    render() {
        return (
            <Classification />
        )
    }
}

export default Index;
