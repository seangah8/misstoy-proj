
export const utilService = {
    
    getRandomFromArray,
    makeId,
}

function getRandomFromArray(arr){
    if (arr && arr.length)
        return arr[Math.floor(Math.random() * arr.length)]
    else return null
}

function makeId(length = 5){
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}