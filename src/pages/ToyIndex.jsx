import { useSelector } from "react-redux"

import { useEffect } from "react"
import { loadToys } from '../store/toy/toy.actions.js'

export function ToyIndex(){

    const toys = useSelector(storeState =>
         storeState.toyModule.toys)


    useEffect(()=>{
        loadToys()
    },[])

    if(!toys) return <h2>Loading..</h2>

    // console.log(toys)

    return(
        <section className="toy-index">
            <ul>
                { 
                    toys.map(toy => <li key={toy.id}>
                            <p>{toy.name}</p>
                        </li>
                    )
                }
            </ul>          
        </section>
    )
}