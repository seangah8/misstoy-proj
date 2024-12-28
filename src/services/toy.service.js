import { storageService } from './storage.service.js'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptytoy,
    getDefaultFilter,
    getFilterFromSearchParams,
}

TOY_KEY = 'toysDB'

async function query(filter={}){
    const toysList = await storageService.query() 
    return toysList
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) return storageService.put(TOY_KEY, toy)
    else {
        toy.createdAt = Date.now()
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptytoy(name='', price = 0, labels=[],
     createdAt=new Date(), inStock=false) {
    return { name, price, labels, createdAt, inStock }
}

//needs to get edit
function getDefaultFilter() {
    return { }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currtoy) => currtoy._id === toy._id)
        const nexttoy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevtoy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nexttoyId = nexttoy._id
        toy.prevtoyId = prevtoy._id
        return toy
    })
}

