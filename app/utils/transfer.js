import each from 'lodash/each';

/**
 * @Desc 将传入的数据转换为一个大的数组，每一项为一个json包含一条财报的所有信息
 */
export const translate = data => {
    let result = [];

    if(!data.length) {
        return result;
    }

    each(data, (item, i) => {
        if(item.type > 4) {
            return;
        }
        let content;
        try {
            content = JSON.parse(item.content);
        } catch (e) {
            content = [];
        }

        each(content, (sub, k) => {
            if(item.type == 4) {
                sub.market = item.market;
                item.market == 'US' && (sub.market = 'US2');
                sub.type = item.type;
                result.push(sub)
            } else {
                !!sub && sub.split('\n').forEach(cell => {
                    let o = {
                        market: item.market,
                        type: item.type,
                        text: cell,
                        subType: '',
                        html: ''
                    }
                    switch(item.type) {
                        case 1:
                            item.market == 'US' && (o.subType = ['usPre', 'usClose'][k]);
                            item.market == 'HK' && (o.subType = 'hk');
                            item.market == 'SH' && (o.subType = 'sh');
                            break;
                        case 2:
                            o.subType = ['declaration', 'exDividend', 'record', 'payment'][k];
                            break;
                        case 3:
                            item.market == 'US' && (o.subType = 'appearOn');
                            item.market == 'HK' && (o.subType = 'appearOn');
                            item.market == 'SH' && (o.subType = ['appearOn', 'stockPurchase', 'publish', 'payin'][k]);
                            break;
                        default:
                            break;
                    }
                    let temp = cell.split('，');
                    let symbol = '';
                    temp[0].replace(/[^$@#]*\(([A-Za-z0-9.]+)\)/gi, (match, g) => {
                        symbol = g;
                    })
                    temp[0] = `<a href="https://laohu8.com/S/${symbol}">$${temp[0]}$</a>`;
                    o.html = temp.join('，');
                    result.push(o);
                })
            }
        })
    })
    return result;
}

/**
 * @Desc 传入获取到的数据格式，处理成为页面展示需要的格式，即[[], [], [], []]
 */

export const getNavigation = data => {
    const markets = ['US', 'US2', 'HK', 'SH', 'EUROPE', 'ASIA'];
    let nav = [[], [], [], []];
    let arr = [];
    let _arr = [];

    if(!data.length) {
        return nav;
    }

    arr = translate(data);

    // 排序
    markets.forEach(market => {
        arr.forEach(item => {
            if (item.market == market) {
                _arr.push(item);
            }
        })
    })

    _arr.forEach(item => {
        switch (item.type) {
            case 1:
                if(nav[0].length >= 4) {
                    return;
                }
                nav[0].push(item);
                break;
            case 2:
                if(nav[1].length >= 4) {
                    return;
                }
                nav[1].push(item);
                break;
            case 3:
                if (nav[2].length >= 4) {
                    return;
                }
                nav[2].push(item);
                break;
            case 4:
                if (nav[3].length >= 4) {
                    return;
                }
                nav[3].push(item);
                break;
             default:
         }
     })

     return nav;
}
