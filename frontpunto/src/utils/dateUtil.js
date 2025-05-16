
const toEpoch = (date, isEnd = false) => {
    const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,0,0
    );

    if(isEnd) {
        newDate.setHours(23, 59,59, 999);
    }
    return Math.floor(newDate.getTime() / 1000);
}



export {
    toEpoch
}