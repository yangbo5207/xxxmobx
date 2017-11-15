import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
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

@inject(stores => ({
    currentD: stores.dates.currentD,
    currentM: stores.dates.currentM,
    setCurrentD: stores.dates.setCurrentD,
    setSelectD: stores.dates.setSelectD,
    setCurrentM: stores.dates.setCurrentM,
    type: stores.calendar.type,
    weekType: stores.calendar.weekType,
    monthType: stores.calendar.monthType,
    switchType: stores.calendar.switchType,
    getMessageType: stores.calendar.getMessageType
}))
@observer
class Calendar extends Component {
    posState = {
        startX: 0,
        targetSourceX: -document.body.clientWidth,
        targetCurrentX: -document.body.clientWidth,
        deviceWidth: document.body.clientWidth
    }

    componentDidMount() {
        const { currentD, currentM, type, getMessageType } = this.props;
        type ? getMessageType(currentM, true) : getMessageType(currentD, false);
    }

    toggleCalendar = () => {
        const { currentD, currentM, type, switchType, getMessageType } = this.props;

        if (!type) {
            getMessageType(currentM, true);
        } else {
            getMessageType(currentD, false);
        }

        switchType();
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
            const { type, currentD, currentM, setCurrentD, setCurrentM, getMessageType } = this.props;
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
                const newCur = !type ? c.getCurDate(currentD, dateTag) : getMonth(currentM);
                if (!type) {
                    setCurrentD(newCur);
                    setCurrentM({ year: newCur.year, month: newCur.month })
                    getMessageType(newCur, false);
                } else {
                    setCurrentD({ ...newCur, date: currentD.date });
                    setCurrentM(newCur);
                    getMessageType(newCur, true);
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
        const { year, month } = this.props.currentM;
        const { currentD, currentM, type, weekType, monthType } = this.props;

        let info = type == 0 ? c.get3WeekInfo(currentD) : c.get3MonthInfo(currentM);
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
                        {_info.map((item, i) => (
                            <div className="date-item" style={style} key={i}>
                                {!type ? <WeekItem weekItemInfo={item} /> : <MonthItem monthItemInfo={item} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar
