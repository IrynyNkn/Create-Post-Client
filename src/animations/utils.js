export const saveMessageToLocalStorage = (mes) => {
    let today = new Date()
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    let dateTime = date + ' ' + time

    localStorage.setItem(dateTime, mes)
}
