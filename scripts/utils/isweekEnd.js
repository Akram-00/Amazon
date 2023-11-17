
//isWeekEnd()
function isSatSun(day) {
    day = day.format('dddd')
    return day === "Saturday" || day === "Sunday";
}

export default isSatSun;