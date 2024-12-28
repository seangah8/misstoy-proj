import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptytoy,
    getDefaultFilter,
    getFilterFromSearchParams,
}

const TOY_KEY = 'toysDB'

_makeStartingToys()

async function query(filter={}){
    const toysList = await storageService.query(TOY_KEY) 
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
     createdAt= Date.now(), inStock=false) {
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

async function _makeStartingToys(amount = 3){
    if(!(await query())){

        const newToys = []
        for(let i=0; i<amount; i++){
            const newToy = {
                id: utilService.makeId(),
                name: _randomToysNames(),
                price: parseInt(Math.random() * 30),
                labels: _getRandomLabels(parseInt
                    (1 + Math.floor(Math.random()*4))), // 4 labels max
                createdAt: Date.now(),
                inStock: (Math.random() > 0.2) ? true : false,
            }

            newToys.push(newToy)
        }
        newToys.forEach(save)
    }
}

function _randomToysNames(){
    const toysNames = ['Lego', 'Doll', 'Toy Car',
         'Water Gun', 'Board Game', 'Puzzel']

    return utilService.getRandomFromArray(toysNames)
}  

function _getRandomLabels(amount = 3){
    const labels = ['On wheels', 'Box game', 'Art', 'Baby',
        'Doll', 'Puzzle','Outdoor', 'Battery Powered']
   
    const labelsAmount = amount
    const toyLabels = []
    for(let i=0; i<labelsAmount; i++){
        toyLabels.push(labels.pop
            (utilService.getRandomFromArray(labels)))
    }
    return toyLabels
}
