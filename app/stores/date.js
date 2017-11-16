import { observable, action } from 'mobx';
import { getNavigation } from 'utils/transfer';
import http from 'utils/http';
import API from 'utils/API';
import detail from './detail';

const d = new Date();
let _date = { year: d.getFullYear(), month: d.getMonth() + 1, date: d.getDate() }
let _month = { year: _date.year, month: _date.month }

class Dates {
    @observable currentD = _date;
    @observable currentM = _month;
    @observable selectD = _date;
    @observable loading = true;
    @observable error = null;
    @observable currentData = [];
    @observable navProcess = [[], [], [], []];

    @action
    setCurrentD = date => self.currentD = date;

    @action
    setSelectD = date => {
        self.selectD = date;
        self.currentD = date;
        self.month = {
            year: date.year,
            month: date.month
        }
    }

    @action
    setCurrentM = month => self.currentM = month;

    @action
    async getFeeds(selectD, type) {
        self.loading = true;
        try {
            const resp = await http.get(API.getDay(selectD), { lang: 'zh_CN' });
            if (resp.ret != 0) {
                return;
            }

            self.loading = false;
            self.currentData = resp.items;
            console.log(self.currentData);
            self.navProcess = getNavigation(resp.items);
            detail.getMarketData(detail.active, type, resp.items);
        } catch(e) {
            self.loading = false;
            self.error = e.message;
            self.currentData = [];
            self.navProcess = [[], [], [], []];
        }
    }
}

const self = new Dates();
export default self;
