export default function showPage(id) {
  if (!id) return console.error("Відсутній аргумент ID при виклику відкриття вікна");
  
  const page = document.querySelector(`[data-id='${id}']`);

  if (!page) return console.error("Не знайдено сторінку");

  page.classList.add("show-page");
  page.classList.add("fade-up");
}