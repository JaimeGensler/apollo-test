const { ApolloServer, gql } = require('apollo-server');

const courses = require('./db/courses');
const students = require('./db/students');
const requests = require('./db/requests');
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
    type Request {
        id: Int
        tutor: Student
        tutee: Student
        course: Course
        description: String
        tutorType: String
        status: String
    }

    type Query {
        students: [Student]
        courses: [Course]
        requests: [Request]
    }
`;

const resolvers = {
    Query: {
        students: () => students,
        courses: () => courses,
        requests: () => requests,
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
    Request: {
        tutor(parent) {
            return students.find(student => student.id === parent.tutorID);
        },
        tutee(parent) {
            return students.find(student => student.id === parent.tuteeID);
        },
        course(parent) {
            return courses.find(course => course.id === parent.courseID);
        },
    },
};

//

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
