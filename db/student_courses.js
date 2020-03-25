const tableReader = require('./tableReader');

const student_courses = tableReader`
 studentID | courseID         
-----------+-----------------
 1         | 1
 1         | 7
 1         | 17
`;

module.exports = student_courses;
