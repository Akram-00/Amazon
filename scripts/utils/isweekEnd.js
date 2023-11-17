
//isWeekEnd()
function isSatSun(day) {
    day = day.format('dddd')
    if (day === "Saturday" || day === "Sunday") {
        return day;
    }
}

export default isSatSun;