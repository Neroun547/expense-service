import moment from "moment";

function parseDataForSvg(arr) {
    let sortedSpendingArr = arr.sort((a, b) => moment(a.date).isAfter(moment(b.date)));
    let totalSum = 0;

    for(let i = 0; i < sortedSpendingArr.length; i++) {
        totalSum += sortedSpendingArr[i].value;
    }

    let tmp = {};

    for (let i = 0; i < sortedSpendingArr.length; i++) {
        if (tmp[sortedSpendingArr[i].date]) {
            tmp[sortedSpendingArr[i].date] += sortedSpendingArr[i].value;
        } else {
            tmp[sortedSpendingArr[i].date] = sortedSpendingArr[i].value;
        }
    }
    sortedSpendingArr = [];

    for (let key in tmp) {
        sortedSpendingArr.push({ date: key, value: tmp[key] });
    }
    let dataForSvg = [];

    let countIntervalForSvgLine = 5;
    let intervalForSvgLine = 1200 / 5;

    if(sortedSpendingArr.length >= 5) {
        let countInterval = Math.floor(sortedSpendingArr.length / 5);

        if(countInterval === 0) {
            countInterval = 1;
        }
        let tmp = { dateStart: sortedSpendingArr[0].date, value: 0 };

        for(let i = 0; i < sortedSpendingArr.length; i++) {
            if(countInterval > 0) {
                tmp.value += sortedSpendingArr[i].value;
            }

            countInterval -= 1;

            if(countInterval === 0 && dataForSvg.length < 5) {
                countInterval = Math.floor(sortedSpendingArr.length / 5);

                if(countInterval === 0) {
                    countInterval = 1;
                }
                dataForSvg.push({ ...tmp });

                if(i + 1 < sortedSpendingArr.length) {
                    tmp = { dateStart: sortedSpendingArr[i + 1].date, value: 0 };
                }
            }
            if(dataForSvg.length === 5 && i + 1 < sortedSpendingArr.length) {
                dataForSvg[dataForSvg.length - 1].value += sortedSpendingArr[i + 1].value;
            }
        }
    } else if(sortedSpendingArr.length < 5) {
        countIntervalForSvgLine = sortedSpendingArr.length;
        intervalForSvgLine = 1200 / sortedSpendingArr.length;

        let tmp = {  };

        for(let i = 0; i < sortedSpendingArr.length; i++) {
            if(tmp[sortedSpendingArr[i].date]) {
                tmp[sortedSpendingArr[i].date] += sortedSpendingArr[i].value;
            } else {
                tmp[sortedSpendingArr[i].date] = sortedSpendingArr[i].value;
            }
        }
        for(let key in tmp) {
            dataForSvg.push({ dateStart: key, value: tmp[key] });
        }
    }
    let greaterValueInSpendingDataForSvg = 0;

    for(let i = 0; i < dataForSvg.length; i++) {
        if(dataForSvg[i].value > greaterValueInSpendingDataForSvg) {
            greaterValueInSpendingDataForSvg = dataForSvg[i].value;
        }
    }
    const maxValue = greaterValueInSpendingDataForSvg;

    dataForSvg = dataForSvg.map((el, index) => ({ ...el, valueInPercent: el.value / greaterValueInSpendingDataForSvg * 100, index: index }));

    return { countIntervalForSvgLine, intervalForSvgLine, dataForSvg, maxValue, totalSum };
}

export { parseDataForSvg };
