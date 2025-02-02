import { useNavigate } from 'react-router-dom'

export function ToyPreView({ toy }){

    const navigate = useNavigate()

    return(
        <article className="toy-preview" 
            onClick={()=>{navigate(`/toys/${toy.id}`)}}>
            <p>{toy.name}</p>   
            <img src={toy.imageLink}/>
            <p>{`${toy.price}$`}</p>  
             
        </article>
    )
}