import { useSelector } from "react-redux"

import { useEffect } from "react"
import { loadToys } from '../store/actions/toy.actions.js'

export function Home(){

    const toys = useSelector(storeState =>
         storeState.toyModule.toys)


    useEffect(()=>{
        loadToys()
    },[])

    if(!toys) return <h2>Loading..</h2>

    console.log(toys)

    return(
        <section className="home">
            <h4>{`there are ${toys.length} toys in store`}</h4>         
        </section>
    )
}