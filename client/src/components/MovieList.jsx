import React,{useState} from 'react'
import {graphql,Query} from "react-apollo";
import { getMoviesQuery,getMovieQuery } from '../queries/queries';

import {Modal} from "antd";

const MovieList =(props)=>{
    const {data}=props;
    const [activeId, setactiveId] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (id) => {
       setactiveId(id);
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    if(data.loading){
        return <div>loading....</div>

    }
    return (
        <div className="container" data-state="Movie App">
            
             <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Query query={getMovieQuery} variables={{id:activeId}}>
                {({loading,error,data})=>{
                   if(loading)
                   return <div>loading...</div>
                   if(error)
                   return <div>{error}</div>
                  return      <div>
                      <p>{data.movie.title}</p>
                      <p>{data.movie.description}</p>
                      <p>{data.movie.year}</p>
                      <p>{data.movie.director.name}</p>
                      <ul className="director-list">
                         
                          {
                            data.movie.director.movies.map(movie=> <li> 
                                <div className="bg"></div>
                                <div className="title">{movie.title}</div></li>)
                        }
                       
                      </ul>
                        
                      </div>
                    
                    
                    

                  

                }}
                </Query>
            </Modal>
             <div class="device" data-view="list">
             <ul class="layer" data-layer="list">
               <Query query={getMoviesQuery}>
                   {
                       ({loading,error,data})=>{
                           if(loading){
                               return <div>Loading...</div>
                           }
                           if(error)
                           return <div>Error.</div>
                           return data.movies.map(movie=>{return ( <li className="content" onClick={()=>showModal(movie.id)} key={movie.id}>
                            <div class="bg"></div>
                           <div class="avatar"></div>
                           <div class="title">{movie.title}</div>
                           <p>{movie.description}</p>
                           </li>
                          )})
                       }
                   }
               </Query>
           </ul>
             </div>
          
       
        </div>
    )
}
export default graphql(getMoviesQuery)(MovieList);
