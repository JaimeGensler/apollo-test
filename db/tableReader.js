const tableReader = table => {
    const [heading, body] = table[0].split(/^[-+]+$/m);
    const keys = heading.trim().split(/[ |]+/);
    const rows = body.trim().split('\n');

    return rows
        .filter(row => !/^\/\//.test(row.trim()))
        .map(row => {
            const vals = row.trim().split(/ *\| */);

            return keys.reduce((acc, key, i) => {
                const raw = vals[i];
                let val;

                if (/^\d+$/.test(raw)) {
                    val = parseFloat(raw);
                } else if (/\[.*\]/.test(raw)) {
                    val = raw
                        .replace(/\[|\]/g, '')
                        .trim()
                        .split(/, ?/)
                        .filter(e => e !== '');
                } else {
                    val = raw;
                }

                return { ...acc, [key]: val };
            }, {});
        });
};

module.exports = tableReader;
