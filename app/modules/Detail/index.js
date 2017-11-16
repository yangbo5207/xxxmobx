import React, {Component} from 'react';
import withWrapped from 'utils/withWrapped';
import { translate } from 'utils/transfer';
import { getDayInfo } from 'utils/calendar';
import Loading from 'components/Loading';

import Header from './Header';
import ChangeDate from './ChangeDate';
import List1 from './List1';
import List2 from './List2';

import './style.scss';

import {titleNames1, titleNames2, typeNames, subTitleNames1, subTitleNames2, subTitleNames3} from './config';

/**
 * 最初的原始数据，由接口获得，未经过处理
 */
let currentData = null;

class Detail extends Component {
    state = {
        currentMarketData: [],
        subSplitData: {},
        active: 0, // 用来表示当前被选中的市场，依次
        open: [false, false, false, false]  // 用来表示当前展开的子分类
    }

    getCurData(active) {
        const type = this.props.match.params.type;
        let marketTitles = type == 4 ? titleNames2 : titleNames1;
        let subTitleNames = this.getSubTitles(type, active);

        /**
         * 将原始数据currentData经过translate方法处理之后，并挑选出符合当前类别的全部数据，如所有的财报公布(type=1)数据
         */
        let currentTypeData = [];

        /**
         * 将currentTypeData根据市场类别(全部、美股、沪深等)，过滤出符合当前市场的所有数据
         */
        let currentMarketData = [];
        let curMarket = marketTitles[active];

        const temp = currentData ? translate(currentData) : [];

        temp.map((item, i) => {
            item.type == type && currentTypeData.push(item);
            return item;
        })

        if(curMarket == 'ALL') {
            currentMarketData = currentTypeData;
        } else {
            currentTypeData.map((item, i) => {
                if(item.market == curMarket) {
                    currentMarketData.push(item);
                }
                return item;
            })
        }

        /**
         * 将currentMarketData的数据根据当前市场下的子类别进行分类，并得到的数据
         */
        let subSplitData = {};

        subTitleNames.map((sub, i) => {
            subSplitData[sub] = [];
            return sub;
        })
        subTitleNames.map((sub, i) => {
            currentMarketData.map((item, n) => {
                if(item.subType == sub) {
                    subSplitData[sub].push(item);
                }
                return item;
            })
            return sub;
        })

        this.setState({
            currentMarketData: currentMarketData,
            subSplitData: subSplitData
        });

        this.setOpen(subSplitData, subTitleNames);
    }

    switchMarket = index => {
        this.getCurData(index);
        this.setState({
            active: index
        })
    }

    changeDay = (date, tag) => {
        const { setDate } = this.props;
        const newDate = getDayInfo(date, tag);
        setDate({ selectD: newDate });
    }

    changeOpen = index => {
        var newOpen = this.state.open;
        newOpen[index] = !newOpen[index];

        this.setState({
            open: newOpen
        })
    }

    getSubTitles(type, active) {
        let subTitleNames = [];
        switch(parseInt(type)) {
            case 1:
                active == 0 && (subTitleNames = subTitleNames1);
                active == 1 && (subTitleNames = ['usPre', 'usClose']);
                active == 2 && (subTitleNames = ['hk']);
                active == 3 && (subTitleNames = ['sh']);
                break;
            case 2:
                subTitleNames = subTitleNames2;
                break;
            case 3:
                (active == 0 || active == 3) && (subTitleNames = subTitleNames3);
                (active == 1 || active == 2) && (subTitleNames = ['appearOn']);
                break;
            case 4:
                break;
            default:
                break;
        }

        return subTitleNames;
    }

    setOpen(subSplitData, subTitleNames) {
        let open = 0;
        subTitleNames.length > 1 && subTitleNames.map((name, i) => {
            if(!!subSplitData[name] && subSplitData[name].length >= 10) {
                open = 1;
            }
            return name;
        })

        this.setState({
            open: open == 0 ? [true, true, true, true] : [false, false, false, false]
        })
    }

    componentWillMount() {
        const type = this.props.match.params.type;
        document.title = typeNames[type - 1];
        this.getCurData(this.state.active);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentData.length > 0) {
            currentData = nextProps.currentData;
        } else {
            currentData = [];
        }
        this.getCurData(this.state.active);
    }

    render() {
        const { selectD, loading } = this.props;
        const { active, open, subSplitData, currentMarketData } = this.state;

        const type = this.props.match.params.type;

        let subTitleNames = this.getSubTitles(type, active);

        return (
            <div className="detail">
                <Header type={type} active={active} switchMarket={this.switchMarket} />
                <ChangeDate selectD={selectD} changeDay={this.changeDay} />
                {loading ? <Loading /> :
                    <div className="list-wrap">
                        {type != 4 && <List1 subTitleNames={subTitleNames} open={open} subSplitData={subSplitData} changeOpen={this.changeOpen} />}
                        {type == 4 && <List2 currentMarketData={currentMarketData} />}
                        {type == 4 && currentMarketData.length == 0 && <div className="no-data">暂无数据</div>}
                </div>
                }
            </div>
        )
    }
}

export default withWrapped(Detail);
