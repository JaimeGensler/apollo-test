const students = require('./db/students');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Student {
        ID: Int
        name: String
        classStanding: Int
        majors: [String]
        minors: [String]
        tutorTypes: [String]
    }

    type Query {
        students: [Student]
    }
`;

const resolvers = {
    Query: {
        students: () => students,
    },
};

//

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
