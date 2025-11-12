export default function selectMenuItem(id) {
    const menuList = document.querySelector(".menu-list");

    const items = document.querySelectorAll(".menu-list__item");
    const subItems = document.querySelectorAll(".menu-sublist__item");

    const menuItem = menuList.querySelector(`[data-id="${id}"]`);
    const parent = menuItem.closest(".menu-list__item");


    items.forEach(item => item.classList.remove("open"));
    subItems.forEach(item => item.classList.remove("select"));

    parent.classList.add("open"); 
    menuItem.classList.add("select");   
};