
let lastSelectedMenuItem = null;
let lastOpenAcc = null;

export default function selectMenuItem(id) {
    const menuList = document.querySelector(".menu-list");
    const selItem = menuList.querySelector(`[data-item][data-id='${id}']`);
    const parent = selItem.closest(".acc");

    if (!selItem) throw new Error("Не вдалось знайти вибраного клієнта в меню");

    if (lastSelectedMenuItem && lastSelectedMenuItem !== selItem) {
        lastSelectedMenuItem.classList.remove("select");
    }

    if (lastOpenAcc && lastOpenAcc !== parent) {
        lastOpenAcc.classList.remove("open");
    }

    selItem.classList.add("select");

    if (parent) {
        parent.classList.add("open");
        lastOpenAcc = parent;
    }

    lastSelectedMenuItem = selItem;

    const event = new CustomEvent("update-workspace", {
        detail: { 
            name: selItem.textContent 
        },
        bubbles: true
    });

    document.dispatchEvent(event);
};