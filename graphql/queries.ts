import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
    query MyQuery($topic:String!){
        getSubredditListByTopic (topic:$topic){
            id
            topic
            created_at
        }
    }
`

export const GET_SUBREDDITS_WITH_LIMIT = gql`
    query MyQuery($limit:Int!){
        getSubredditListLimit (limit:$limit){
            id
            topic
            created_at
        }
    }
`