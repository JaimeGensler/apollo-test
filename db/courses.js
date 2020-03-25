const tableReader = require('./tableReader');

const courses = tableReader`
 id | title                      | subject | number | professor
----+----------------------------+---------+--------+-----------
  1 | Literary Analysis          | ENG     | 150    | Segrest
  2 | British Writers II         | ENG     | 240    | Spurgin
  3 | African American Writers   | ENG     | 250    | Hoffmann
  4 | American Writers           | ENG     | 260    | McGlynn
  5 | Shakespeare                | ENG     | 425    | Bond
//
  6 | Intro to Philosophy        | PHIL    | 100    | Ryckman
  7 | Symbolic Logic             | PHIL    | 150    | Armstrong
  8 | Descartes, Locke, Leibniz  | PHIL    | 210    | Armstrong
  9 | Existentialism             | PHIL    | 275    | Albrecht
 10 | Relativism                 | PHIL    | 600    | Phelan
//
 11 | Elementary Statistics      | MATH    | 107    | Chakraborty
 12 | Calculus                   | MATH    | 140    | Pourciau
 13 | Machine Learning           | MATH    | 208    | Chakraborty
 14 | Linear Algebra             | MATH    | 410    | Parks
 15 | Number Theory              | MATH    | 600    | Rana
//
 16 | Intro to Political Science | GOVT    | 110    | Hixon
 17 | Identity Politics          | GOVT    | 226    | Balsekar
 18 | Founding the Just Regime   | GOVT    | 315    | Wulf
 19 | International Law          | GOVT    | 365    | Brozek
 20 | Authoritarianism           | GOVT    | 600    | Balsekar
`;

module.exports = courses;
