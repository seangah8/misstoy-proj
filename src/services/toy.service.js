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
    getLabels,
}

const TOY_KEY = 'toysDB'
await _makeStartingToys()

async function query(filter={}){
    
    let toys = await storageService.query(TOY_KEY) 

    if (filter.name) {
        const regExp = new RegExp(filter.name, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
    }

    if (filter.inStock) {
        toys = toys.filter(toy => toy.inStock)
    }

    if (filter.labels?.length) {
        toys = toys.filter(toy => 
            filter.labels.some(label => 
                toy.labels.some(toyLabel => toyLabel === label)
            )
        )
    }

    if (filter.orderBy !== 'created') {
        if (filter.orderBy === 'price') {
            toys.sort((t1, t2) => t1.price - t2.price)
        }
        if (filter.orderBy === 'name') {
            toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
        }
    }
    
    return toys
}

async function get(toyId) {
    const toy = await storageService.get(TOY_KEY, toyId);
    const extraToys = await _setNextToys(toy);
    return { ...toy, extraToys };
}
function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy.id) return storageService.put(TOY_KEY, toy)
    else {
        toy.createdAt = Date.now()
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptytoy(name='', price = 0, labels=[],
    createdAt= Date.now(), inStock=false, imageLink='./default_img.jpg') {
    return { name, price, labels, createdAt, inStock, imageLink }
}

//needs to get edit
function getDefaultFilter() {
    return { name: '', labels: [],
         inStock: false, orderBy: 'created' }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getLabels(){
    return ['On wheels', 'Box game', 'Art', 'Baby',
        'Doll', 'Puzzle','Outdoor', 'Battery Powered']
}

function _setNextToys(toy, howManyNext = 10) {
    return storageService.query(TOY_KEY).then((toys) => {
        let toyIdx = toys.findIndex((currtoy) => currtoy.id === toy.id)
        let steps = Math.min(toys.length-1, howManyNext)
        const extraToys = []

        while(steps > 0){
            toyIdx++
            if(toyIdx >= toys.length) toyIdx=0
            extraToys.push(toys[toyIdx]) 
            steps--
        }
        return extraToys
    })
}

async function _makeStartingToys(amount = 5){
    const isThereToyData = 
        await storageService.doseDataExists(TOY_KEY)
    if(!isThereToyData){
        const newToys = []
        for(let i=0; i<amount; i++){
            const newToy = {
                id: utilService.makeId(),
                name: _randomToysNames(),
                imageLink: './default_img.jpg',
                price: (4.99 + parseInt(Math.random() * 25)).toFixed(2),
                labels: _getRandomLabels(parseInt
                    (1 + Math.floor(Math.random()*4))), // 4 labels max
                createdAt: Date.now(),
                inStock: (Math.random() > 0.2) ? true : false,
            }
            newToys.push(newToy)
        }
        await storageService.save(TOY_KEY ,newToys)
    }
}

function _randomToysNames(){
    const toysNames = ['Lego', 'Doll', 'Toy Car',
         'Water Gun', 'Board Game', 'Puzzel']

    return utilService.getRandomFromArray(toysNames)
}  

function _getRandomLabels(amount = 3){
    const labels = getLabels()
    const labelsAmount = amount
    const toyLabels = []
    for(let i=0; i<labelsAmount; i++){
        toyLabels.push(labels.pop
            (utilService.getRandomFromArray(labels)))
    }
    return toyLabels
}

