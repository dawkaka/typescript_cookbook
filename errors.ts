/**
 * because any type can be thrown and how javascript the only possible types for erros is any or unkown.
 * For this reason typescript only allows you to provide types for resolved value in promises and not types for rejections
 * English
 * 
 */

const somePromise = () => new Promise<number>((resolve, reject) => {
    if (((Math.random() + 1) * 10) % 2 === 0) {
        resolve(10)
    } else {
        reject("Oh no")
    }
})

somePromise().then(d => {

}).catch(e => {

})