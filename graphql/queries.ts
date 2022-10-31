import { gql } from "@apollo/client";



export const GET_ACCOUNT_BY_EMAIL = gql`
    query MyQuery($email:String!){
    getAccountByEmail(email:$email) {
        created_at
        id
        login
        email
        image
    },
}
`
export const GET_FULL_CVS_BY_ACCOUNT_BY_EMAIL = gql`
    query MyQuery($email:String!){
        getCvsByAccountEmail(email:$email) {
        created_at
        id
        account_id
        sample
        color
        description
        },
        getEducationByAccountEmail(email:$email){
            city 
            created_at
            cv_id
            degree
            description
            enddate
            id
            school
            startdate
        },
        getExperienceByAccountEmail(email:$email){
            city 
            created_at
            cv_id
            employer
            description
            enddate
            id
            position
            startdate
        },
        getLanguagesByAccountEmail(email:$email){
            language
            level
            created_at
            cv_id
        },
        getSkillsByAccountEmail(email:$email){
            habit
            level
            created_at
            cv_id
        },
        getUserInfoByAccountEmail(email:$email){
            name
            surname
            phone
            postalcode
            address
            image
            cv_id
            created_at
            email
            city

        }
        
}
`

export const GET_FULL_CVS_BY_ACCOUNT_ID = gql`
    query MyQuery($id:ID!){
    getCvUsingAccount_id(id: $id) {
        created_at
        id
        sample
        color
        description
        account_id
    },
    getEducationUsingCv_id(id: $id) {
        city
        created_at
        cv_id
        degree
        description
        enddate
        id
        school
        startdate
    },
    getExperienceUsingCv_id(id: $id) {
    city
    created_at
    cv_id
    description
    employer
    enddate
    id
    position
    startdate
    },
    getLanguagesUsingCv_id(id: $id) {
    created_at
    cv_id
    id
    language
    level
    },
    getSkillsUsingCv_id(id: $id) {
    created_at
    cv_id
    habit
    id
    level
    },
    getUserInfoUsingCv_id(id: $id) {
    city
    
    created_at
    cv_id
    id
    image
    name
    phone
    postalcode
    address
    surname
    email
    },
}
`


export const GET_FULL_CV_BY_ID = gql`
    query MyQuery($id:ID!){
    getCv(id: $id) {
        created_at
        id
        sample
        color
        description
        account_id
    },
    getEducationUsingCv_id(id: $id) {
        city
        created_at
        cv_id
        degree
        description
        enddate
        id
        school
        startdate
    },
    getExperienceUsingCv_id(id: $id) {
    city
    created_at
    cv_id
    description
    employer
    enddate
    id
    position
    startdate
    },
    getLanguagesUsingCv_id(id: $id) {
    created_at
    cv_id
    id
    language
    level
    },
    getSkillsUsingCv_id(id: $id) {
    created_at
    cv_id
    habit
    id
    level
    },
    getUserUsingCv_id(id: $id) {
    city
    
    created_at
    cv_id
    id
    image
    name
    phone
    postalcode
    address
    surname
    email
    },
}
`

export const GET_CV_BY_ID = gql`
    query MyQuery($id:ID!){
    getCv(id: $id) {
        created_at
        id
        sample
        color
        description
        account_id
    },
}
`
export const GET_EDUCATION_BY_CV_ID = gql`
    query MyQuery($id:ID!){
    getEducationUsingCv_id(id: $id) {
        city
        created_at
        cv_id
        degree
        description
        enddate
        id
        school
        startdate
    },
}
`
export const GET_EXPERIENCE_BY_CV_ID = gql`
    query MyQuery($id:ID!){
getExperienceUsingCv_id(id: $id) {
    city
    created_at
    cv_id
    description
    employer
    enddate
    id
    position
    startdate
},
}
`
export const GET_LANGUAGES_BY_CV_ID = gql`
    query MyQuery($id:ID!){
getLanguagesUsingCv_id(id: $id) {
    created_at
    cv_id
    id
    language
    level
},
}
`



export const GET_SKILLS_BY_CV_ID = gql`
    query MyQuery($id:ID!){
getSkillsUsingCv_id(id: $id) {
    created_at
    cv_id
    habit
    id
    level
},
}
`

export const GET_USER_BY_CV_ID = gql`
    query MyQuery($id:ID!){
getUserUsingCv_id(id: $id) {
    city
    created_at
    cv_id
    id
    image
    name
    phone
    postalcode
    address
    surname
    email
},
}
`


export const GET_CV = gql`
    query MyQuery($num: Int!){
        getCvList (limit: $num){
            id
            created_at
            sample
            color
            description

            userinfoList {
                name
                surname
                image
                phone
                city
                email
                postalcode
                address
            }

            experienceList {
                position
                city
                employer
                startdate
                enddate
                description
            }

            educationList {
                degree
                city
                school
                startdate
                enddate
                description
            }

            skillsList {
                habit
                level
            }

            languagesList {
                language
                level
            }
        }
    }
`


export const GET_FULL_CVS_BY_EMAIL = gql`
    query MyQuery($email:String!){
        getCvsByAccountEmail(email:$email) {
            id
            created_at
            sample
            color
            description
            account_id

            userinfoList {
                name
                surname
                image
                phone
                city
                email
                postalcode
                address
            }

            experienceList {
                position
                city
                employer
                startdate
                enddate
                description
            }

            educationList {
                degree
                city
                school
                startdate
                enddate
                description
            }

            skillsList {
                habit
                level
            }

            languagesList {
                language
                level
            }
        }
    }
`
