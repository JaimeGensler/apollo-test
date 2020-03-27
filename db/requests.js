const tableReader = require('./tableReader');

const requests = tableReader`
 id | tuteeID | tutorID | courseID | tutorType | description            | status  
----+---------+---------+----------+-----------+------------------------+---------
  1 | 1       | 3       | 15       | CONTENT   | what are numbers       | PENDING
  2 | 1       | 2       | 13       | CONTENT   | how DO machines learn? | ASSIGNED
  3 | 5       | 6       | 20       | WRITING   | authoritarianism bad   | COMPLETED
`;

module.exports = requests;
