export default function clientFind(input, resItem) {
    const query = input.value.trim().toLowerCase();

    resItem.forEach(item => {
      const title = item.textContent.toLowerCase();

      if (query == "") { item.classList.add("hide"); return};

      if (title.indexOf(query) !== -1) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
}