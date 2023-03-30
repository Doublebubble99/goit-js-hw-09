import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const dataValues = {
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};
const { day, hour, minute, second } = dataValues;
const date = new Date();
convertMs(date.getTime());
button.setAttribute('disabled', 'true');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  prevArrow: '⬅️',
  nextArrow: '➡️',
  onClose(selectedDates) {
    const startTime = Date.now();
    if (selectedDates[0] < startTime) {
      button.setAttribute('disabled', 'true');
      alert('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
      button.addEventListener('click', () => {
        button.setAttribute('disabled', 'true');
        setInterval(() => {
          const deltaTime = Date.now();
          let currentTimeLeft = selectedDates[0] - deltaTime;
          day.textContent = convertMs(currentTimeLeft).days;
          hour.textContent = convertMs(currentTimeLeft).hours;
          minute.textContent = convertMs(currentTimeLeft).minutes;
          second.textContent = convertMs(currentTimeLeft).seconds;
        }, 1000);
      });
    }
    console.log(selectedDates[0]);
  },
};
flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
