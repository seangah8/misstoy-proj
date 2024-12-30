import { useNavigate } from 'react-router-dom'

export function ToyExtra({ toy }){

    const navigate = useNavigate()

    return(
        <article className="toy-extra" 
            onClick={()=>{navigate(`/toys/${toy.id}`)}}>
            <img src={toy.imageLink}/>     
            <p>{toy.name}</p> 
             
        </article>
    )
}