import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'
import { ToyExtra } from '../cmp/ToyExtra.jsx'


export function ToyDetails(){

    const params = useParams()
    const [toy, setToy] = useState()

    useEffect(()=>{
        loadToy()
    },[params.toyId])

    async function loadToy(){
        const toy = await toyService.get(params.toyId)
        setToy(toy)
    }

    if(!toy) return <h2>Loading...</h2>

    console.log(toy)

    return(
        <section className="toy-details">
            <p>{`Toy: ${toy.name}`}</p>
            <p>{`Labels: ${toy.labels}`}</p>
            <img src={toy.imageLink}/>
            <p>{`Price: ${toy.price}`}</p>
            <p>{`is in stock?: ${toy.inStock}`}</p>

            <section className='extra-toys'>
            {
                toy.extraToys.map(extra=>
                    <ToyExtra key={extra.id} toy={extra}/>)
            }
            </section>
        </section>
    )
}