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

        student(id: Int!): Student
        requestsAssignedToStudent(studentID: Int!): [Request]
        requestsMadeByStudent(studentID: Int!): [Request]
        studentByName(name: String!): [Student]
    }
`;

const resolvers = {
    Query: {
        students: () => students,
        student: (parent, args, context, info) => {
            return students.find(student => student.id === args.id);
        },
        studentByName: (parent, args, context, info) => {
            //intended use for blacklisting tutors
            //ideally want to limit amount of data accessible by anybody
            //probably return an error if the filter finds more than 3-5 people?
            //also this filtering system sucks rn
            return students.filter(student =>
                student.name.toLowerCase().includes(args.name.toLowerCase())
            );
        },

        courses: () => courses,

        requests: () => requests,
        requestsAssignedToStudent: (parent, args, context, info) => {
            return requests.filter(
                request => request.tutorID === args.studentID
            );
        },
        requestsMadeByStudent: (parent, args, context, info) => {
            return requests.filter(
                request => request.tuteeID === args.studentID
            );
        },
    },
    Student: {
        courses(parent) {
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
