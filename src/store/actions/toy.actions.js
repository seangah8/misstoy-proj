import { toyService } from '../../services/toy.service.js'
import { store } from "../store.js"
import { ADD_TOY, EDIT_TOY, REMOVE_TOY, SET_FILTER, SET_TOYS } from "../reducer/toy.reducer.js"
import { showSuccessMsg } from '../../services/event.bus.service.js'


export async function loadToys() {
    try {
        const filterBy = store.getState().toyModule.filterBy
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Having issues with loading toys:', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        showSuccessMsg('Toy Removed!')
    } catch (err) {
        console.log('Having issues removing toy:', err)
        throw err
    }
}

export async function saveToy(id, toyToSave) {
    try {
        const type = id ? EDIT_TOY : ADD_TOY
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
        showSuccessMsg(id? 'Toy Edited!': 'Toy Added!')
        
    } catch (err) {
        console.log('Having issues saving ty:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}