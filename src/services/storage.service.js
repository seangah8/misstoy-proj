import { utilService } from "./util.service.js"


export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    doseDataExists,
    save
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity.id = utilService.makeId()
    return query(entityType).then(entities => {
        entities.unshift(newEntity)
        save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === updatedEntity.id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity.id} in: ${entityType}`)
        const entityToUpdate = {...entities[idx], ...updatedEntity}
        entities.splice(idx, 1, entityToUpdate)
        save(entityType, entities)
        return entityToUpdate
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity.id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        save(entityType, entities)
    })
}

async function doseDataExists(entityType){
    const database = await localStorage.getItem(entityType)
    if(!database)
        return false
    else return true
}


function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
