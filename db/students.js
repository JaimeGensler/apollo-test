const tableReader = require('./tableReader');

const students = tableReader`
 id | name              | classStanding | majors         | minors         | tutorTypes
----+-------------------+---------------+----------------+----------------+------------
  1 | Vape Juice Jaime  | 4             | [ ENG, PHIL ]  | [ CW ]         | [ C, W ]
  2 | Vape Juice Jordan | 1             | [ CMSC ]       | [ BEIN, DUMB ] | [ C ]
  3 | Vape Juice Josh   | 2             | [ MATH ]       | [ BEIN, LAME ] | [ C ]
  4 | Grape Juice Grace | 3             | [ THAR ]       | [ SPAN, LING ] | [ C ]
  5 | Ryan Gosling      | 4             | [ THAR, GOVT ] | [ MUTH ]       | [ ]
  6 | John Krasinski    | 2             | [ PSYC ]       | [ ]            | [ ]
`;

module.exports = students;
