
export const utilService = {
    
    getRandomFromArray,
    makeId,
    debounce,
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

export function debounce(func, delay=500) {
    let timeoutId

    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
   
   
    }
}
