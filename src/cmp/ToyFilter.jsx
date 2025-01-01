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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { name } = filterByToEdit
    return (
        <form className="toy-filter">
            <label htmlFor="name">Name: </label>
            <input value={name} name="name" id="name" onChange={handleChange} />
        </form>
    )
}   