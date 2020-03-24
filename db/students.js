import tableMaker from './tableMaker';

let students = tableMaker`
 ID | name          | classStanding | majors        | minors         | tutorTypes
----+---------------+---------------+---------------+----------------+------------
  1 | Jaime Gensler | 4             | [ ENG, PHIL ] | [ CW ]         | [ C, W ]
  2 | Grace Krueger | 3             | [ THAR    ]   | [ SPAN, LING ] | [ W ]
`;

export default students;
