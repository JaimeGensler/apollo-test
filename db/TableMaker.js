function tableMaker(strings) {
    const [heading, body] = strings[0].split(/^[-+]+$/m);
    const keys = heading.trim().split(/[ |]+/);
    const rows = body.trim().split('\n');

    return rows.map(row => {
        const vals = row.trim().split(/ *\| */);

        return keys.reduce((acc, key, i) => {
            let val = vals[i];
            if (/^\d+$/.test(val)) {
                //only digit chars
                val = parseFloat(val);
            } else if (/\[.*\]/.test(val)) {
                //includes []
                val = val
                    .replace(/\[|\]/g, '')
                    .trim()
                    .split(/, ?/);
            }

            return { ...acc, [key]: val };
        }, {});
    });
}

export default tableMaker;

let students = tableMaker`
 ID | name          | classStanding | majors        | minors         | tutorTypes
----+---------------+---------------+---------------+----------------+------------
  1 | Jaime Gensler | 4             | [ ENG, PHIL ] | [ CW ]         | [ C, W ]
  2 | Grace Krueger | 3             | [ THAR    ]   | [ SPAN, LING ] | [ W ]
`;
let classes = tableMaker`
 ID | title                  | subject | number 
----+------------------------+---------+--------
  1 | Symbolic Logic         | PHIL    | 150
  2 | Intro to Lit. Analysis | ENG     | 120
  3 | Calculus II            | MATH    | 140
`;

// console.log(students);
console.log(classes);
