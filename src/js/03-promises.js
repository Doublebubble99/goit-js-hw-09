import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const button = document.querySelector('button');
const formObj = {
  delay: document.querySelector("input[name = 'delay']"),
  step: document.querySelector("input[name = 'step']"),
  amount: document.querySelector("input[name = 'amount']"),
};

const { delay, step, amount } = formObj;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({
        position,
        delay,
      });
      // Fulfill
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}
form.addEventListener('submit', evt => {
  evt.preventDefault();
  let position = 1;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  setTimeout(() => {
    const amountValue = amount.value;
    createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    const interval = setInterval(() => {
      delayValue += stepValue;
      position += 1;
      createPromise(position, delayValue)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      if (position >= amountValue) {
        clearInterval(interval);
      }
    }, stepValue);
  }, delayValue);
});
