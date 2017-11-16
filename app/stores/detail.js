import { observable, action } from 'mobx';
import { translate } from 'utils/transfer';
import {titleNames1, titleNames2, subTitleNames1, subTitleNames2, subTitleNames3} from 'modules/Detail/config';

class Detail {
    @observable active = 0;
    @observable currentMarketData = [];
    @observable subSplitData = {};
    @observable open: [false, false, false, false];
    @observable subTitleNames = [];

    @action
    getSubTitles(active, type) {
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

        self.subTitleNames = subTitleNames;
    }

    @action
    getMarketData(active, type, currentData) {
        self.getSubTitles(active, type);
        let marketTitles = type == 4 ? titleNames2 : titleNames1;
        let currentTypeData = [];
        let currentMarketData = [];
        let curMarket = marketTitles[active];

        let temp = translate(currentData);
        temp.map((item, i) => {
            item.type == type && currentTypeData.push(item);
            return item;
        })

        if (curMarket == 'ALL') {
            currentMarketData = currentTypeData;
        } else {
            currentTypeData.map((item, i) => {
                if(item.market == curMarket) {
                    currentMarketData.push(item);
                }
                return item;
            })
        }

        let subSplitData = {}
        self.subTitleNames.map((sub, i) => {
            subSplitData[sub] = [];
            return sub;
        })
        self.subTitleNames.map((sub, i) => {
            currentMarketData.map((item, n) => {
                if(item.subType == sub) {
                    subSplitData[sub].push(item);
                }
                return item;
            })
            return sub;
        })

        self.currentMarketData = currentMarketData;
        self.subSplitData = subSplitData;
        self.setOpen(subSplitData, self.subTitleNames);
    }

    @action
    setOpen(subSplitData, subTitleNames) {
        let open = 0;
        subTitleNames.length > 1 && subTitleNames.map((name, i) => {
            if(!!subSplitData[name] && subSplitData[name].length >= 10) {
                open = 1;
            }
            return name;
        })

        self.open = open == 0 ? [true, true, true, true] : [false, false, false, false];
    }

    @action
    changeOpen(index) {
        let newOpen = self.open;
        newOpen[index] = !newOpen[index];
        self.open = newOpen;
    }

    @action
    switchMarket = (index, type, currentData) => {
        self.active = index;
        self.getMarketData(index, type, currentData);
    }
}

const self = new Detail();
export default self;
