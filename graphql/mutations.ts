import { gql } from "@apollo/client";

export const ADD_CV = gql`
mutation MyMutation(
    $account_id: ID!
    $sample: Int!
    $color: String!
    $description: String!

){
    insertCv(
      account_id:$account_id
      sample:$sample
      color:$color
      description:$description
    ){
      sample
      description
      color
      id
      account_id
      created_at
    }
}
`
export const ADD_ACCOUNT= gql`
mutation MyMutation(
    $image: String!
    $login: String!
    $email: String!
){
    insertAccount(
      image:$image
      login:$login
      email:$email
    ){
    image
    login
    email
    id
    created_at 
    }
}
`

export const ADD_USER= gql`
mutation MyMutation(
    $cv_id: ID!
    $name:String!
    $surname:String!
    $image:String!
    $phone:String!
    $city:String!
    $email:String!
    $postalcode:String!
    $address:String!
){
    insertUser(
    cv_id:$cv_id
    name:$name
    surname:$surname
    image:$image
    phone:$phone
    city:$city
    email:$email
    postalcode:$postalcode
    address:$address
    ){
    city
    email
    created_at
    cv_id
    image
    name
    phone
    postalcode
    address
    surname
    }
}
`

export const ADD_PROFILE_DESCRIPTION = gql`
mutation MyMutation(
    $description: String!
    $cv_id: ID!
){
  insertProfile(
    description:$description
    cv_id: $cv_id
  ){
      created_at
      cv_id
      description
    }
}
`

export const ADD_EDUCATION = gql`
mutation MyMutation(
    $startdate: DateTime!
    $city: String!
    $enddate: DateTime!
    $description: String!
    $school: String!
    $cv_id: ID!
    $degree: String!
){
    insertEducation(
      startdate:$startdate
      city:$city
      enddate:$enddate
      description:$description
      school:$school
      cv_id:$cv_id
      degree:$degree
    ){
      startdate
      city
      enddate
      description
      school
      cv_id
      degree
      created_at
    }
}
`

export const ADD_EXPERIENCE = gql`
mutation MyMutation(
    $startdate: DateTime!
    $city: String!
    $enddate: DateTime!
    $description: String!
    $employer: String!
    $cv_id: ID!
    $position: String!
){
  insertExperience(
      startdate:$startdate
      city:$city
      enddate:$enddate
      description:$description
      employer:$employer
      cv_id:$cv_id
      position:$position
    ){
      startdate
      city
      enddate
      description
      employer
      cv_id
      position
      created_at
    }
}
`


export const ADD_SKILL = gql`
mutation MyMutation(
    $level: String!
    $habit: String!
    $cv_id: ID!
){
  insertSkills(
    level:$level
    habit:$habit
    cv_id:$cv_id
    ){
      level
      habit
      cv_id
      created_at
    }
}
`


export const ADD_LANGUAGE = gql`
mutation MyMutation(
    $level: String!
    $language: String!
    $cv_id: ID!
){
  insertLanguages(
    level:$level
    language:$language
    cv_id:$cv_id
    ){
      level
      language
      cv_id
      created_at
    }
}
`



export const DELETE_CV_BY_ID = gql`
mutation MyMutation($cv_id:ID!){ 
   deleteUserByCvId(cv_id:$cv_id){
    city
    email
    created_at
    cv_id
    image
    name
    phone
    postalcode
    address
    surname
   },
   deleteSkillsByCvId(cv_id:$cv_id){
    created_at
    cv_id
    habit
    level
   },
   deleteLanguagesByCvId(cv_id:$cv_id){
    created_at
    cv_id
    language
    level
   }
   deleteExperienceByCvId(cv_id:$cv_id){
      startdate
      city
      enddate
      description
      employer
      cv_id
      position
      created_at
   }
   deleteEducationByCvId(cv_id:$cv_id){
    startdate
      city
      enddate
      description
      school
      cv_id
      degree
      created_at
   }
   deleteCv(id:$cv_id){
      sample
      description
      color
      id
      account_id
      created_at
   }
}
`

export const DELETE_SKILLS_BY_ID = gql`
mutation MyMutation($cv_id:ID!){ 
  deleteSkillsByCvId(cv_id:$cv_id){
    created_at
    cv_id
    habit
    level
   }
}
`



