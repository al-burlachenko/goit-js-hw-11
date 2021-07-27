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

refs.startBtn.addEventListener('click', getInputTime);
refs.dateInput.addEventListener('input', checkValidDate);

refs.startBtn.disabled = true;

function checkValidDate() {
  refs.startBtn.disabled = true;

  const currentTime = Date.now();
  const date = new Date(refs.dateInput.value);

  if (currentTime > date.getTime()) {
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future',
      icon: 'error',
      confirmButtonText: 'Ladn(',
    });
    return;
  }
  refs.startBtn.disabled = '';
}

function getInputTime() {
  // надо пофиксить NaN при пустом значении
  const date = new Date(refs.dateInput.value);
  const date1 = new Date('Jule 27, 2021 11:08:55');
  const timedValue = convertMs(Date.now() - date1.getTime());
  console.log(timedValue);
  //console.log(convertMs(date.getTime()-currentTime).seconds);

  // refs.daysValue.textContent = deltaDate.days;
  // refs.hoursValue.textContent = deltaDate.hours;
  // refs.minutesValue.textContent = deltaDate.minutes;
  // refs.secondsValue.textContent = deltaDate.seconds;

  const interval = setInterval(() => {
    //console.log(currentTime);
    let deltaDate = convertMs(date1.getTime() - Date.now());

    // let deltaDate = convertMs(date.getTime() - Date.now());
    refs.daysValue.textContent = deltaDate.days;
    refs.hoursValue.textContent = deltaDate.hours;
    refs.minutesValue.textContent = deltaDate.minutes;
    refs.secondsValue.textContent = deltaDate.seconds;

    if (date1.getTime() <= Date.now()) {
      // Swal.fire(`Таймер: ${convertMs(date.getTime() - currentTime)}`)

      Swal.fire(
        `Таймер: ${
          timedValue.days +
          ':' +
          timedValue.hours +
          ':' +
          timedValue.hours +
          ':' +
          timedValue.seconds
        }`,
      );
      clearInterval(interval);
    }

    console.log(date1.getTime());
    console.log(Date.now());
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
