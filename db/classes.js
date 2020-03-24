import tableMaker from './tableMaker';

let classes = tableMaker`
 ID | title                  | subject | number 
----+------------------------+---------+--------
  1 | Symbolic Logic         | PHIL    | 150
  2 | Intro to Lit. Analysis | ENG     | 120
  3 | Calculus II            | MATH    | 140
`;

export default classes;
