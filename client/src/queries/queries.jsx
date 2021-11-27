import {gql} from "apollo-boost";
export const getDirectorsQuery=gql`
{
    directors{
        id,name
    }
}`


export const getMoviesQuery=gql`
{
movies{title,id,description}
}`
export const getMovieQuery=gql`
query($id:String){
    movie(id:$id){
        id,
        title,
        description,
        director{
            name
        }
    }
}`
export const newMovieMutation=gql`
mutation($title:String!,$description:String,$year:Int!,$directorId:String!){
    addMovie(title:$title, description:$description, year:$year, directorId:$directorId){
        title,
        id
    }
}
`