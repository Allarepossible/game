const {compose, split, values, reduce, filter, mapObjIndexed} = require('ramda');
const fs = require('fs');
const TIMETABLE = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const convertToGuards = times => {
    let curId = '';
    let guards = {};
    for (let i = 0; i < times.length; i++) {

        let [, m, d, , min, text] = times[i].match(/\[1518-(\d+)-(\d+) (\d+):(\d+)] (.+)/);
        if (text.indexOf('#') > 0) {
            const [, id] = text.match(/Guard #(\d+) begins shift/);
            curId = id;
            guards[id] = guards[id] ? guards[id] : {};
        } else {
            guards[curId][`${m}-${d}`] = guards[curId][`${m}-${d}`] ? [...guards[curId][`${m}-${d}`], min] : [min];
        }
    }
    return guards;
};

const prepare = compose(filter(i => i), split('\n'));
const howLongSleep = compose(reduce((acc, value) => acc + value.reduce((ac,m,i) => i % 2 === 0 ? ac - m : ac + +m, 0), 0), values);

const findLaziestGuard = guardsSleptTime => {
    let maxTime = 0;
    let lazyGuard = '';

    for (const [key, value] of Object.entries(guardsSleptTime)) {
        if (value > maxTime) {
            maxTime = value;
            lazyGuard = key;
        }
    }

    return lazyGuard;
};

const findLaziestMinute = schedule => {
    let minutes = {};
    let laziestMinute = 0;
    let count = 0;

    for (const [, value] of Object.entries(schedule)) {
        for (let i = 0; i <= value.length/2; i+=2) {
            for (let j = Number(value[i]); j < Number(value[i+1]); j++) {
                minutes[j] = minutes[j] ? minutes[j] + 1 : 1;
            }
        }
    }

    for (const [key, value] of Object.entries(minutes)) {
        if (value > count) {
            count = value;
            laziestMinute = key;
        }
    }

    return {count, laziestMinute};
};

const findMultiply = params => {
    const guards = convertToGuards(prepare(params).sort());
    const guardsSleptTime = mapObjIndexed(value => howLongSleep(value), guards);

    const laziestGuard = findLaziestGuard(guardsSleptTime);
    const {laziestMinute} = findLaziestMinute(guards[laziestGuard]);

    return laziestGuard * laziestMinute;
};

const findLaziestMinuteAndGuard = guards => {
    let maxCount = 0;
    let laziestGuard = 0;
    let laziestMinuteOfAll = 0;

    for (const [key, value] of Object.entries(guards)) {
        const {count, laziestMinute} = findLaziestMinute(value);
        if (maxCount < count) {
            maxCount = count;
            laziestGuard = key;
            laziestMinuteOfAll = laziestMinute;
        }
    }

    return {laziestMinuteOfAll, laziestGuard};
};

const findSecondMultiply = params => {
    const guards = convertToGuards(prepare(params).sort());
    const {laziestMinuteOfAll, laziestGuard} = findLaziestMinuteAndGuard(guards);

    return laziestMinuteOfAll * laziestGuard;
};


module.exports = {
    findMultiply: findMultiply.bind(this, TIMETABLE),
    findSecondMultiply: findSecondMultiply.bind(this, TIMETABLE),
    findMultiplyForTest: findMultiply,
    findSecondMultiplyForTest: findSecondMultiply,
};
