import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


import { toyService } from '../services/toy.service.js'
import { saveToy } from '../store/actions/toy.actions.js'

export function ToyEdit(){

    const navigate = useNavigate()
    const params = useParams()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptytoy)

    useEffect(()=>{
        if(params.toyId) loadToy()
    },[])

    async function loadToy(){
        const toy = await toyService.get(params.toyId)
        setToyToEdit(toy)
    }

    function onBack() {
        navigate(`/toys/${params.toyId}`)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }

        if (field === 'labels') { 
            let toyLabels = [...toyToEdit.labels]
            if (value && !isToyOwnLable(target.id)) {
                toyLabels.push(target.id)
            } else if (!value && isToyOwnLable(target.id)) {
                toyLabels = toyLabels.filter(lab => lab !== target.id) // Assign the filtered array back
            }
            value = toyLabels
        }
        

        setToyToEdit(prevToy => 
            ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(event){
        event.preventDefault()
        saveToy(toyToEdit)
    }

    function isToyOwnLable(lable){
        return toyToEdit.labels.some(lab => lab === lable)
    }

    if(!toyToEdit) return <h2>Loading...</h2>

    console.log(toyToEdit)

    const { imageLink, inStock, name, price } = toyToEdit

    return(
        <section className="toy-edit">
            <button onClick={onBack}>Back</button>
            <form onSubmit={onSaveToy}>

                <label htmlFor="name">Toy:</label>
                <input 
                    onChange={handleChange} 
                    value={name} 
                    type="text" 
                    name="name" 
                    id="name" />

                <label htmlFor="labels">Labels:</label>

                {
                    
                    toyService.getLabels().map(label=>
                        <div key={label}>
                            <label htmlFor={`${label}`}>{label}</label>
                            <input 
                                onChange={handleChange} 
                                type='checkbox' 
                                name="labels"
                                checked={isToyOwnLable(label)} 
                                id={`${label}`} />
                        </div>
                    )
                }

                <label htmlFor="price">Price:</label>
                <input 
                    onChange={handleChange} 
                    value={price} 
                    type="number" 
                    name="price" 
                    id="price" />

                <label htmlFor="in-stock">in stock:</label>
                <input 
                    onChange={handleChange} 
                    checked={inStock} 
                    type="checkbox" 
                    name="inStock" 
                    id="in-stock" />

                <button>Submit Changes</button>
                
            </form>
        </section>
    )
}