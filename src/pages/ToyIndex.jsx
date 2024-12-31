import { useSelector } from "react-redux"

import { useEffect } from "react"
import { loadToys, removeToy } from '../store/actions/toy.actions.js'

import { ToyList } from "../cmp/ToyList.jsx"

export function ToyIndex(){

    const toys = useSelector(storeState =>
         storeState.toyModule.toys)


    useEffect(()=>{
        loadToys()
    },[])

    function onRemoveToy(toyId){
        removeToy(toyId)
    }

    if(!toys) return <h2>Loading..</h2>

    return(
        <section className="toy-index">
            <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
        </section>
    )
}