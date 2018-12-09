const fs = require('fs');
const NODES = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');

const prepare = nodes => nodes.split(' ').map(i => Number(i));

const findRootNodeValue = nodes => {
    const RESULT = {
        node: prepare(nodes),
        metas: [],
    };

    const findCorrectOrders = (r, num) => {
        if (r.node[num] > 0) {
            findCorrectOrders(r, num + 2)
        } else {
            r.node[num - 2] -= 1;
            r.metas = [...r.metas, ...r.node.slice(num + 2, 2 + num + r.node[num + 1])];
            r.node.splice(num, 2 + r.node[num + 1]);

            if (r.node.length > 0) {
                findCorrectOrders(r, 0)
            }
        }

        return r;
    };
    const {metas} = findCorrectOrders(RESULT, 0);
    const rootValue = metas.reduce((sum, i) => sum + i, 0);

    console.log(`The value of the root node: ${rootValue}.\n`);

    return rootValue;
};


module.exports = {
    findRootNodeValue: findRootNodeValue.bind(this, NODES),
};


