
let intervalId = 0;

export const intervalTest = () => {

    console.log(intervalId)
    if (!intervalId) {
        intervalId = setInterval(() => {
            console.log('test')
        }, 1000)
    }
    console.log(intervalId)

    return intervalId;
}

export const killInterval = () => {
    clearInterval(intervalId)
    console.log(intervalId)
}