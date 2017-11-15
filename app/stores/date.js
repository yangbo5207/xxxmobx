import { observable, action } from 'mobx';
import { getNavigation } from 'utils/transfer';
import http from 'utils/http';
import API from 'utils/API';

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
    async getFeeds(selectD) {
        this.loading = true;
        try {
            const resp = await http.get(API.getDay(selectD), { lang: 'zh_CN' });
            if (resp.ret != 0) {
                return;
            }

            self.loading = false;
            self.currentData = resp.items;
            self.navProcess = getNavigation(resp.items);
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
