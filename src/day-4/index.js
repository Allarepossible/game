const fs = require('fs');
const TIMETABLE = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = (timetable) => timetable.toString().split('\n').filter(i => i).sort();

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

const howLongSleep = schedule => {
    let time = 0;

    for (const [, value] of Object.entries(schedule)) {
        time += value.reduce((ac,m,i) => i % 2 === 0 ? ac - m : ac + +m, 0);
    }

    return time;
};

const findMostLazyGuard = guardsSleptTime => {
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

const findMostLazyMinute = schedule => {
    let minutes = {};
    let mostLazyMin = 0;
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
            mostLazyMin = key;
        }
    }

    return mostLazyMin;
};

const findMultiply = params => {
    const sortedTimes = prepare(params);
    const guards = convertToGuards(sortedTimes);
    const guardsSleptTime = {};

    for (const [key, value] of Object.entries(guards)) {
        guardsSleptTime[key] = howLongSleep(value);
    }

    const mostLazyGuard = findMostLazyGuard(guardsSleptTime);
    const mostLazyMinute = findMostLazyMinute(guards[mostLazyGuard]);

    const multiply = mostLazyGuard * mostLazyMinute;

    console.log(`ID of the guard multiplied by the minute: ${multiply}.\n`);

    return multiply;
};


module.exports = {
    findMultiply: findMultiply.bind(this, TIMETABLE),
};
