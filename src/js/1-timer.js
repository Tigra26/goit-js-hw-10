import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateTimePickerInput: document.querySelector('#datetime-picker'),
  dataStartBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let intervalId = null;

refs.dataStartBtn.disabled = true;

flatpickr(refs.dateTimePickerInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  closeOnSelect: true,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      refs.dataStartBtn.disabled = false;
    } else {
      refs.dataStartBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
});
 

function start() {
  refs.dataStartBtn.disabled = true;
  refs.dateTimePickerInput.disabled = true;

  intervalId = setInterval(() => {
    const diff = selectedDate - Date.now();

    if (diff <= 0) {
      stop();
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    refs.days.textContent = addLeadingZero(days);
    refs.days.style.color = '#4e75ff';
    refs.hours.textContent = addLeadingZero(hours);
    refs.hours.style.color = '#4e75ff';
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.minutes.style.color = '#4e75ff';
    refs.seconds.textContent = addLeadingZero(seconds);
    refs.seconds.style.color = '#4e75ff';
  }, 1000);
}

function stop() {
  clearInterval(intervalId);

  refs.dateTimePickerInput.disabled = false;
  refs.dataStartBtn.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.dataStartBtn.addEventListener('click', start);

