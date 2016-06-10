const countdown = require('countdown');

const pad2 = n => (n < 10 ? '0' : '') + n;

const startDate = new Date('2016-11-09T16:00:00+00:00');
const diff = countdown(startDate);

const months = pad2(diff.months).split('');
const days   = pad2(diff.days).split('');
const hours  = pad2(diff.hours).split('');

console.log(diff);

const $countdownMonthsOne = document.querySelector('.a-countdown__months--one');
const $countdownMonthsTwo = document.querySelector('.a-countdown__months--two');
const $countdownDaysOne = document.querySelector('.a-countdown__days--one');
const $countdownDaysTwo = document.querySelector('.a-countdown__days--two');
const $countdownHoursOne = document.querySelector('.a-countdown__hours--one');
const $countdownHoursTwo = document.querySelector('.a-countdown__hours--two');

$countdownMonthsOne.innerHTML = months[0];
$countdownMonthsTwo.innerHTML = months[1];
$countdownDaysOne.innerHTML = days[0];
$countdownDaysTwo.innerHTML = days[1];
$countdownHoursOne.innerHTML = hours[0];
$countdownHoursTwo.innerHTML = hours[1];
