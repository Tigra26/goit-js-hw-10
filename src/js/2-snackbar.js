import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

function onFormElSubmit(e) {
  e.preventDefault();

  const delayValue = Number(formEl.elements.delay.value);
  console.log(delayValue);
  const stateValue = formEl.elements.state.value;
  console.log(stateValue);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });

  promise
    .then(delayValue => {
      return iziToast.success({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
    })
    .catch(delayValue => {
      return iziToast.error({
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
    });

  formEl.reset();
}

formEl.addEventListener('submit', onFormElSubmit);
