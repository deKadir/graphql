import React, { useState } from 'react'

import { Query,Mutation } from 'react-apollo';
import { getDirectorsQuery,getMovieQuery, getMoviesQuery,newMovieMutation } from '../queries/queries';

const state={
    title:"",
    description:"",
    year:0,
    directorId:'',
}

export default function NewMovieForm() {
    const [movie,setMovie] = useState(state);
const onChange=(event)=>{
    setMovie({...movie,[event.target.name]:event.target.value})
    console.log(movie);

}
    return (
        <Mutation mutation={newMovieMutation}>
            {
                (addMovie,{loading,error})=>{
                    return <div className="container" data-state="Movie App">
                        <div className="device" data-view="list">
                    <form onSubmit={e=>{
                        e.preventDefault();
                      
                        addMovie({
                            variables:{
                                ...movie,
                                year:(parseInt(movie.year))
                            },
                            refetchQueries:[
                                {
                                    query:getMoviesQuery
                                }
                            ]
                          


                        });
                        
                    }
                   }> 
                        <div>
                            <label htmlFor="">Title</label>
                            <input type="text" name="title" placeHolder="Title" onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <textarea name="description" placeHolder="Description" onChange={onChange}/>
                        </div>
                        <div>
                            <label htmlFor="">Year</label>
                            <input type="text" name="year" placeHolder="year" onChange={onChange} />
                        </div>
                        <div>
                            <label htmlFor="">Director</label>
                            <select name="directorId" onChange={onChange}>
                            <option value="" disabled={true}>Select director</option>
                            <Query query={getDirectorsQuery}>
                           {
                               ({loading,error,data})=>{
                                   if(loading){
                                       return <option disabled={true}>Loading...</option>
                                   }
                                   if(error)
                                   return <option disabled={true}>Error...</option>
                                   return data.directors.map(director=> <option name="directorId" value={director.id} onChange={onChange} key={director.id}>{director.name}</option>)
                               }
                           }
                       </Query>
                            </select>
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                       
                    </form>
                    </div>
                    {
                        error&&<div>{error}</div>   
                    }
                    {
                          loading&&<div>loading...</div>
                    }
                </div>
                }
            }
        </Mutation>
    )
}
