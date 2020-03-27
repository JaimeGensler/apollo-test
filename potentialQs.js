const { gql } = require('apollo-server');

const typeDefs = gql`
    query {
        #info needed for request page
        student(id: 1) {
            name
            courses {
                title
                id
            }
        }

        #info needed for blacklisting
        studentByName(name: "Vape") {
            id
            name
            classStanding
        }

        #info needed for "my requests"
        requestsMadeByStudent(studentID: 1) {
            description
            tutorType
            status
            tutor {
                #I should only ever get tutor info if the status is assigned
                name
                classStanding #should this be here
                majors #should this be here
            }
            course {
                title
                subject
                number
                professor
            }
        }

        #info needed for "my assignments"
        requestsAssignedToStudent(studentID: 2) {
            description
            tutorType
            status
            course {
                title
                subject
                number
                professor
            }
            tutee {
                name
                classStanding
            }
        }
    }
`;
