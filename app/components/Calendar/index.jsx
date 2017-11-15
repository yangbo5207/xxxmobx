import React, { Component } from 'react';

import * as c from 'utils/calendar';
import each from 'lodash/each';
import API from 'utils/API';
import http from 'utils/http';
import { requestAnimationFrame, cancelAnimationFrame, getTransform } from 'utils/requestAnimationFrame';

import CalendarHeader from './CalendarHeader';
import WeekItem from './WeekItem';
import MonthItem from './MonthItem';

import './style.scss';

const styleTransform = getTransform();

class Calendar extends Component {
    state = {
        type: 0,
        weekType: {},
        monthType: {}
    }

    posState = {
        startX: 0,
        targetSourceX: -document.body.clientWidth,
        targetCurrentX: -document.body.clientWidth,
        deviceWidth: document.body.clientWidth
    }

    toggleCalendar = () => {
        const { curMonth, curDate } = this.props;
        const { type } = this.state;

        if (type == 0) {
            this.setState({ type: 1 })
            this.setMessageType(curMonth, 1);
        } else {
            this.setState({ type: 0 })
            this.setMessageType(curDate, 0);
        }
    }

    setMessageType = (cur, type) => {
        const stateType = !type ? 'weekType' : 'monthType';
        const curThree = !type ? c.getThreeWeekString(cur) : c.getThreeMonthString(cur);
        let tag = true;
        let temp = {};

        curThree.forEach(item => {
            if (typeof this.state[stateType][item] == 'undefined') {
                tag = false;
                return tag;
            }
        })

        if (!tag) {
            // 因为请求到的数据并非每一天都有数据，因此先将日期全部设置为空值
            curThree.forEach(item => {
                temp[item] = []
            })
            http.get(API.getMessageType(cur, type)).then(resp => {
                const newItems = {};
                each(resp.items, (data, date) => {
                    if (date >= '2017-02-27') {
                        newItems[date] = data;
                    }
                });
                this.setState({
                    [stateType]: Object.assign(temp, this.state[stateType], newItems)
                })
            })
        }
    }

    componentDidMount() {
        const { curDate, curMonth } = this.props;
        this.state.type == 0 ? this.setMessageType(curDate, 0) : this.setMessageType(curMonth, 1);
    }

    touchstart = (e) => {
        if (this.hasStart) {
            return;
        }
        e.preventDefault();
        this.hasStart = 1;
        const startX = e.changedTouches[0].pageX
        this.posState.startX = startX
    }

    touchmove = (e) => {
        if (!this.hasStart) {
            return;
        }
        e.preventDefault();
        const currentX = e.changedTouches[0].pageX
        const disX = currentX - this.posState.startX
        const targetCurrentX = this.posState.targetSourceX + disX
        this.posState.targetCurrentX = targetCurrentX;

        this.scrollContainer.style[styleTransform] = `translate(${targetCurrentX}px, 0)`;
    }

    touchend = (e) => {
        if (!this.hasStart) {
            return;
        }
        e.preventDefault();
        const disX = e.changedTouches[0].pageX - this.posState.startX
        const deviceWidth = this.posState.deviceWidth
        /**
         * tag == true   next
         * tag == false  pre
         */
        const moveEnd = (tag) => {
            const type = this.state.type;
            const { curDate, curMonth, setDate } = this.props;
            let target, dateTag, getMonth;

            if (tag) {
                target = -2 * deviceWidth
                dateTag = true
                getMonth = c.getNextMonth
            } else {
                target = 0
                dateTag = false
                getMonth = c.getPreMonth
            }

            this.moveTo(target, () => {
                this.hasStart = 0;
                this.posState.targetSourceX = -deviceWidth;
                this.posState.targetCurrentX = -deviceWidth;
                this.scrollContainer.style[styleTransform] = `translate(${-deviceWidth}px, 0)`;
                const newCur = !type ? c.getCurDate(curDate, dateTag) : getMonth(curMonth);
                if (!type) {
                    setDate({
                        currentD: newCur,
                        currentM: { year: newCur.year, month: newCur.month }
                    })
                    // this.setState({ weekInfo: c.get3WeekInfo(newCur) });
                    this.setMessageType(newCur, 0);
                } else {
                    setDate({
                        currentD: { ...newCur, date: this.props.curDate.date },
                        currentM: newCur
                    })
                    // this.setState({ monthInfo: c.get3MonthInfo(newCur) });
                    this.setMessageType(newCur, 1);
                }
            })
        }
        if (disX == 0) {
            this.hasStart = 0;
        }
        if (disX < -50) { moveEnd(true) } else if (disX > 50) { moveEnd(false) } else {
            this.moveTo(-deviceWidth, () => {
                this.hasStart = 0;
            })
        }
    }

    moveTo = (target, callback) => {
        const duration = 400
        const easein = (t, b, c, d) => {
            return c * (t /= d) * t + b
        }
        let stime = +new Date();
        const ani = () => {
            const offset = Math.min(duration, +new Date() - stime)
            const s = easein(offset, 0, 1, duration)
            const targetCurrentX = this.posState.targetCurrentX
            const res = (target - targetCurrentX) * s + targetCurrentX
            this.posState.targetCurrentX = res;
            this.scrollContainer.style[styleTransform] = `translate(` + res.toFixed(2) + `px, 0)`;

            if (offset == duration) {
                callback && callback();
            } else {
                this.timer = requestAnimationFrame(ani);
            }
        }

        cancelAnimationFrame(this.timer);
        ani();
    }

    refCallback = (id, elem) => {
        if (id == 'scrollContainer') {
            if (elem) {
                this.scrollContainer = elem;
                elem.addEventListener('touchstart', this.touchstart, false);
                window.addEventListener('touchmove', this.touchmove, false);
                window.addEventListener('touchend', this.touchend, false);
                window.addEventListener('touchcancel', this.touchend, false);
            } else {
                this.scrollContainer.removeEventListener('touchstart', this.touchstart, false);
                window.removeEventListener('touchmove', this.touchmove, false);
                window.removeEventListener('touchend', this.touchend, false);
                window.removeEventListener('touchcancel', this.touchend, false);
                this.scrollContainer = null;
            }
        }
    }

    render() {
        const { year, month } = this.props.curMonth;
        const { curDate, curMonth } = this.props;
        const { type, weekType, monthType } = this.state;
        // let info = type == 0 ? weekInfo : monthInfo;
        let info = type == 0 ? c.get3WeekInfo(curDate) : c.get3MonthInfo(curMonth);
        let _info = []
        let style = {
            width: document.body.clientWidth
        }
        let mainstyle = {
            width: document.body.clientWidth * 3,
            [styleTransform]: `translateX(${this.posState.targetCurrentX}px)`
        }

        each(info, item => { _info.push(item) })

        return (
            <div className="calendar-wrap">
                <div className="calendar-title">
                    <div className="cur-month">{year}年{month}月（北京时间）</div>
                    <div className="switch" onClick={this.toggleCalendar}></div>
                </div>
                <CalendarHeader />
                <div className="calendar">
                    <div className="calendar-main" ref={this.refCallback.bind(this, 'scrollContainer')} style={mainstyle}>
                        {_info.map((item, i) => {
                            return (
                                <div className="date-item" style={style} key={i}>
                                    {!type ? <WeekItem {...this.props} weekType={weekType} weekItemInfo={item} /> : <MonthItem {...this.props} monthType={monthType} monthItemInfo={item} />}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar
