import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Classification from 'components/Classification';
import Calendar from 'components/Calendar';
import Loading from 'components/Loading';

@inject(stores => ({
    getFeeds: stores.dates.getFeeds,
    currentD: stores.dates.currentD,
    loading: stores.dates.loading
}))
@observer
class Index extends Component {
    componentDidMount() {
        const { currentD, getFeeds } = this.props;
        getFeeds(currentD);
    }
    render() {
        const { loading } = this.props;
        return ([
            <Calendar key="a" />,
            <div key="b">{ loading ? <Loading /> : <Classification /> }</div>
        ])
    }
}

export default Index;
