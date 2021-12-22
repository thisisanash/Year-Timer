const monthsName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const weekdaysName = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
];

zeroNeed = (num) => {
    if (num < 10) {
        num = `0${num}`;
    }
    // else {no need to add 0}
    return num;
}

let formatHours = (num) => {
    if (num > 12) {
        num = num - 12;
        zeroNeed(num);
    }
    return num;
}


//
let timerValues = document.querySelectorAll(".timer div h2");
let dashBoard = document.querySelectorAll(".dashBoard");


// let cur = Current

let curDate = new Date();
let curMonth = curDate.getMonth();
let curYear = curDate.getFullYear();



// Navbar today date and time
function getTime() {

    let today = document.querySelector(".current-date");
    let todayTime = document.querySelector(".current-time");

    today.textContent = `${curDate.getDate()} ${monthsName[curDate.getMonth()]}, ${weekdaysName[curDate.getDay()]}`;

    let now = new Date();
    let nowTime = now.getHours();

    if (nowTime > 12) {
        nowTime = nowTime - 12;
        todayTime.textContent = zeroNeed(nowTime) + " : " + zeroNeed(now.getMinutes()) + " PM"
    }
    else {
        todayTime.textContent = zeroNeed(nowTime) + " : " + zeroNeed(now.getMinutes()) + " AM"
    }
}
setInterval(getTime, 1000);
getTime();




//New Year Time
let newYear = new Date(curYear, 11, 31, 23, 59, 0000);
let newYearTime = newYear.getTime();


function timeRemain() {

    let now = new Date();
    now.setMonth(11);

    now = now.getTime();

    let remainTime = newYearTime - now;

    //values in miliseconds 1s = 1000ms
    const oneMilisecond = 1000;
    const oneMinute = 60 * oneMilisecond;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;

    //calculate values
    let days = Math.floor(remainTime / oneDay);
    let hours = Math.floor((remainTime % oneDay) / oneHour);
    let minutes = Math.floor((remainTime % oneHour) / oneMinute);
    let seconds = Math.floor((remainTime % oneMinute) / oneMilisecond);

    //calculate Months seprately
    let curM = new Date();
    curM = curM.getMonth();

    let months = curM - newYear.getMonth();

    //Store all Values
    let values = [months, days, hours, minutes, seconds];


    timerValues.forEach(function (timerValue, index) {
        timerValue.textContent = zeroNeed(values[index]);
    })


    if (remainTime < 0) {
        clearInterval(countdown);
        dashBoard.innerHTML = `Happy New Year`;
      }

}

let countdown = setInterval(timeRemain, 1000);
timeRemain();