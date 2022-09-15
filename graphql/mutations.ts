import { gql } from "@apollo/client";

export const ADD_POST = gql`
mutation MyMutation(
    $image: String!
    $body: String!
    $subreddit_id: ID!
    $title: String!
    $username: String!
){
    insertPost(
      body:$body
      image:$image
      subreddit_id:$subreddit_id
      title:$title
      username:$username
    ){
      body
      id
      image
      subreddit_id
      title
      username
      created_at
    }
}
`