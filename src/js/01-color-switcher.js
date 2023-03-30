function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
refs.stop.disabled = true;
const randomColor = getRandomHexColor();
refs.start.addEventListener('click', () => {
  refs.start.disabled = true;
  refs.stop.disabled = false;
  const interval = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  refs.stop.addEventListener('click', () => {
    refs.start.disabled = false;
    clearInterval(interval);
    refs.stop.disabled = true;
  });
});
