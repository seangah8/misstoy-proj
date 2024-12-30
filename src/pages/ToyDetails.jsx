
import { useParams } from 'react-router-dom'


export function ToyDetails(){

    const params = useParams()

    return(
        <section className="toy-details">
            <p>{params.toyId}</p>
        </section>
    )
}