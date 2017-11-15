import React, { Component } from 'react';

import { getPrefixDateString } from 'utils/calendar';
import { getNavigation } from 'utils/transfer';
import http from 'utils/http';
import API from 'utils/API';

// import { translate } from 'utils/transfer';

const d = new Date();
let _date = { year: d.getFullYear(), month: d.getMonth() + 1, date: d.getDate() }
let _month = { year: _date.year, month: _date.month }

/**
 * 将处理过后的数据缓存起来，格式大致为
 * {
 *     '2017-02-04': {...},
 *     '2017-02-04': {...}
 * }
 */
let cache = {}

function withWrapped(BasicComponent) {
    return class FacComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentD: _date,
                currentM: _month,
                selectD: _date,
                error: null,
                loading: true,
                currentData: [],
                navProcess: [[], [], [], []]
            }
        }

        process = (selectD, state) => {
            this.setState({ loading: true, error: null });

            const daystring = getPrefixDateString(selectD);
            if (typeof cache[daystring] != 'undefined' && !this.state.error) {
                return this.setState({
                    ...state,
                    loading: false,
                    currentData: cache[daystring],
                    navProcess: getNavigation(cache[daystring])
                })
            }

            return http.get(API.getDay(selectD), { lang: 'zh_CN' }).then(resp => {
                if (resp.ret != 0) {
                    return;
                }

                cache[daystring] = resp.items;
                this.setState({
                    ...state,
                    loading: false,
                    currentData: resp.items,
                    navProcess: getNavigation(resp.items)
                })
            })
            .catch(error => this.setState({
                ...state,
                error: error.message,
                currentData: [],
                navProcess: [[], [], [], []]
            }))
        }

        setDate = (options) => {
            const state = { ...this.state, ...options };
            if (options.selectD) {
                _date = options.selectD;
                _month = { year: _date.year, month: _date.month }
                state.currentD = _date;
                state.currentM = _month;
                this.process(_date, state);
            } else {
                this.setState(state);
            }
        }

        componentDidMount() {
            this.process(this.state.selectD);
        }

        render() {
            const { currentD, currentM, selectD, currentData, loading, error, navProcess } = this.state;

            return (
                <BasicComponent {...this.props}
                    currentD={currentD}
                    currentM={currentM}
                    selectD={selectD}
                    currentData={currentData}
                    navProcess={navProcess}
                    loading={loading}
                    error={error}
                    setDate={this.setDate}
                    process={this.process}
                />
            )
        }
    }
}

export default withWrapped;
