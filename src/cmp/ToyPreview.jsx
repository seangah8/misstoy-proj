import { useNavigate } from 'react-router-dom'

export function ToyPreView({ toy }){

    const navigate = useNavigate()

    return(
        <article className="toy-preview" 
            onClick={()=>{navigate(`/toys/${toy.id}`)}}>
            <p>{toy.name}</p>   
            {
                toy.image? <img src={toy.image}/> 
                : <img src='./default_img.jpg'/>
            }  
            <p>{`${toy.price}$`}</p>  
             
        </article>
    )
}