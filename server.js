const { ApolloServer, gql } = require('apollo-server');

const students = require('./db/students');
const courses = require('./db/courses');
const student_courses = require('./db/student_courses');

const typeDefs = gql`
    type Student {
        id: Int
        name: String
        classStanding: Int
        majors: [String]
        minors: [String]
        tutorTypes: [String]
        courses: [Course]
    }
    type Course {
        id: Int
        title: String
        subject: String
        number: Int
        professor: String
        students: [Student]
    }

    type Query {
        students: [Student]
        courses: [Course]
    }
`;

const resolvers = {
    Query: {
        students: () => students,
        courses: () => courses,
    },
    Student: {
        courses(parent) {
            // const temp = student_courses
            //     .filter(item => item.studentID === parent.id)
            //     .map(item => item.courseID);

            const courseIDs = student_courses.reduce((acc, val) => {
                if (val.studentID === parent.id) acc.push(val.courseID);
                return acc;
            }, []);

            return courses.filter(course => courseIDs.includes(course.id));
        },
    },
    Course: {
        students(parent) {
            const studentIDs = student_courses.reduce((acc, val) => {
                if (val.courseID === parent.id) acc.push(val.studentID);
                return acc;
            }, []);

            return students.filter(student => studentIDs.includes(student.id));
        },
    },
};

//

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
