export default function clientFind(input, resItem) {
    const query = input.value.trim().toLowerCase();
    const res = [];

    resItem.forEach(item => {
      const title = item.textContent.toLowerCase();

      if (query == "") { item.classList.add("hide"); return};

      if (title.indexOf(query) !== -1) {
        item.classList.remove('hide');
        res.push(item);
      } else {
        item.classList.add('hide');
      }
    });

    const notFound = document.querySelector(".not-found");

    if (res.length > 0 || input.value == "") {
      notFound.classList.add('hide');
    } else if (res.length == 0 && input.value !== "") {
      notFound.classList.remove('hide');
    }
}