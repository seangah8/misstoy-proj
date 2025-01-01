import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { toyService } from '../services/toy.service.js'
import { ToyExtra } from '../cmp/ToyExtra.jsx'


export function ToyDetails(){

    const user = useSelector(storeState =>
         storeState.userModule.loggedInUser)

    const navigate = useNavigate()
    const params = useParams()
    const [toy, setToy] = useState()

    useEffect(()=>{
        loadToy()
    },[params.toyId])

    async function loadToy(){
        const toy = await toyService.get(params.toyId)
        setToy(toy)
    }

    function onBack(){
        navigate('/toys')
    }

    if(!toy) return <h2>Loading...</h2>

    return(
        <section className="toy-details">
            <button onClick={onBack}>Back</button>
            <p>{`Toy: ${toy.name}`}</p>
            <p>{`Labels: ${toy.labels}`}</p>
            <img src={toy.imageLink}/>
            <p>{`Price: ${toy.price}`}</p>
            <p>{`is in stock?: ${toy.inStock}`}</p>
            {
                (user.username === 'admin') ? <button>
                    <Link to={`/toys/edit/${toy.id}`}>Edit</Link>
                </button>
                : ''
            }
            

            <section className='extra-toys'>
            {
                toy.extraToys.map(extra=>
                    <ToyExtra key={extra.id} toy={extra}/>)
            }
            </section>
        </section>
    )
}