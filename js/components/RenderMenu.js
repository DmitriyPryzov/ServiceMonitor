
export default function renderMenuItems(items) {

    if (!Array.isArray(items)) throw new Error("Передано невірний аргумент для побудови меню");
    
    return items.map(item => {

        const isAcc = item?.Objects && Array.isArray(item.Objects) && item.Objects.length > 0;
        const isClass = isAcc ? "acc" : "";
        const isItem = isAcc ? "" : "data-item";
        const id = item?.ID || "0";
        const name = item?.Name;

        return `
            <li class="menu-list__item  ${isClass}">
                <div class="menu-list__name acc-name" data-id=${id} ${isItem}>${name}</div>
                <div class="menu-sublist acc-sublist">
                    <div class="acc-sublist-content">
                        ${renderSubItems(item.Objects)}
                    </div>
                </div>
            </li>
        `
    }).join("");
}

function renderSubItems(items) {

    if (!items || !Array.isArray(items)) return "";

   return items.map(item => {

    if (!item?.Name || !item?.ID) return;

    const name = item.Name;
    const id = item.ID;

        return `
            <div class="menu-sublist__item" data-id="${id}" data-item>${name}</div>
        `;
   }).join("");
}