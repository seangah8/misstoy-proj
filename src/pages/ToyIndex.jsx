import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'


import { useEffect, useRef } from "react"
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'

import { utilService } from "../services/util.service.js"
import { ToyList } from "../cmp/ToyList.jsx"
import { ToyFilter } from "../cmp/ToyFilter.jsx"

export function ToyIndex(){

    const user = useSelector(storeState =>
        storeState.userModule.loggedInUser)

    const toys = useSelector(storeState =>
         storeState.toyModule.toys)

    const filterBy = useSelector(storeState =>
         storeState.toyModule.filterBy)

    const onSetFilterByDebounce = useRef(
        utilService.debounce(onSetFilterBy)).current

    useEffect(()=>{
        loadToys()
    },[filterBy])

    function onRemoveToy(toyId){
        removeToy(toyId)
    }

    function onSetFilterBy(filterByToEdit){
        setFilterBy(filterByToEdit)
    }

    if(!toys) return <h2>Loading..</h2>


    return(
        <section className="toy-index">
            <ToyFilter onSetFilterBy={onSetFilterByDebounce}/>
            {
                (user?.username === 'admin') ? <button>
                    <Link to={`/toys/edit`}>Add Toy +</Link></button>
                    : ''
            }
            
            <ToyList toys={toys} onRemoveToy={onRemoveToy} 
                username={user?.username}/>
        </section>
    )
}