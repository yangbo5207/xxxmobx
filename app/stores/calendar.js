import { observable, action } from 'mobx';
import { getNavigation } from 'utils/transfer';
import http from 'utils/http';
import API from 'utils/API';
import * as c from 'utils/calendar';
import each from 'lodash/each';

class Calendar {
    @observable type = false;   // false = week   , true = month
    @observable weekType = {};
    @observable monthType = {};

    @action
    switchType = () => self.type = !self.type;

    @action
    async getMessageType(cur, type) {
        const stateType = !type ? 'weekType' : 'monthType';
        const curThree = !type ? c.getThreeWeekString(cur) : c.getThreeMonthString(cur);

        let tag = true;
        let temp = {};

        curThree.forEach(item => {
            if (typeof self[stateType][item] == 'undefined') {
                tag = false;
                return tag;
            }
        })

        if (!tag) {
            // 因为请求到的数据并非每一天都有数据，因此先将日期全部设置为空值
            curThree.forEach(item => {
                temp[item] = []
            })

            const resp = await http.get(API.getMessageType(cur, type));
            const newItems = {};
            each(resp.items, (data, date) => {
                if (date >= '2017-02-27') {
                    newItems[date] = data;
                }
            })
            self[stateType] = Object.assign(temp, self[stateType], newItems);
        }
    }
}

const self = new Calendar();
export default self;
