import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"

export function ToyFilter({ onSetFilterBy }) {
    
    const [filterByToEdit, setFilterByToEdit] 
        = useState(toyService.getDefaultFilter)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        if (field === 'labels') { 
            let toyLabels = [...filterByToEdit.labels]
            if (value && !isLabelChecked(target.id)) {
                toyLabels.push(target.id)
            } else if (!value && isLabelChecked(target.id)) {
                toyLabels = toyLabels.filter(lab => lab !== target.id)
            }
            value = toyLabels
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function isLabelChecked(label){
        return filterByToEdit.labels.some(lab=>lab===label)
    }

    const { name, labels, inStock, orderBy } = filterByToEdit

    return (
        <form className="toy-filter">

            <label htmlFor="name">Name: </label>
            <input 
                value={name} 
                type="txt" 
                name="name" 
                id="name" 
                onChange={handleChange} />

            <label>Labels: </label>
            {
                    
                toyService.getLabels().map(label=>
                    <div key={label}>
                        <label htmlFor={`${label}`}>{label}</label>
                        <input 
                            onChange={handleChange} 
                            type='checkbox' 
                            name="labels"
                            checked={isLabelChecked(label)} 
                            id={`${label}`} />
                    </div>
                )
            }

            <label htmlFor="in-stock">in stock: </label>
            <input 
                type='checkbox' 
                name="inStock" 
                id="in-stock" 
                checked={inStock}
                onChange={handleChange}/>


            <label htmlFor="order-by">Order By: </label>
            <select id="order-by" value={orderBy} name="orderBy" onChange={handleChange}>
                <option value={'created'}>Created</option>
                <option value={'name'}>Name</option>
                <option value={'price'}>Price</option>
            </select>


        </form>
    )
}   