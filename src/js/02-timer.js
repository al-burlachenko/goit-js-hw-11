// import '../css/common.scss';
import Swal from 'sweetalert2';

const refs = {
  dateInput: document.getElementById('date-selector'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
let isActive;
let timerInterval = null;

const timer = {
  start() {
    const date = new Date(refs.dateInput.value);
    if (isActive === true) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(timerCountdown.bind(timer), 1000);

    function timerCountdown() {
      isActive = true;

      const deltaDate = this.convertMs(date.getTime() - Date.now());
      refs.daysValue.textContent = deltaDate.days;
      refs.hoursValue.textContent = deltaDate.hours;
      refs.minutesValue.textContent = deltaDate.minutes;
      refs.secondsValue.textContent = deltaDate.seconds;

      // console.log(convertMs.call(timer));

      if (date.getTime() <= Date.now()) {
        Swal.fire('Таймер досчитал');
      }
    }
  },

  checkValidDate() {
    refs.startBtn.disabled = true;
    const date = new Date(refs.dateInput.value);

    if (Date.now() > date.getTime()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please choose a date in the future',
        icon: 'error',
        confirmButtonText: 'Ohh(',
      });
      return;
    }
    refs.startBtn.disabled = '';
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

refs.startBtn.addEventListener('click', timer.start);
refs.dateInput.addEventListener('input', timer.checkValidDate);
