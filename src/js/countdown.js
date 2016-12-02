const countdown = require('countdown');

const pad2 = n => (n < 10 ? '0' : '') + n;

const startDate = new Date('2016-12-09T16:00:00+00:00');
const diff = countdown(startDate);

const months = pad2(diff.months);
const days   = pad2(diff.days);
let   hours  = pad2(diff.hours);

if (diff.minutes >= 30) {
    hours = pad2(parseInt(hours, 10) + 1);
}

const $countdownMonths = document.querySelector('.a-countdown__months');
const $countdownDays   = document.querySelector('.a-countdown__days');
const $countdownHours  = document.querySelector('.a-countdown__hours');

if ($countdownMonths) {
    $countdownMonths.innerHTML = months;
    $countdownDays.innerHTML   = days;
    $countdownHours.innerHTML  = hours;
}
