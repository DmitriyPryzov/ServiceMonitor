import showPage from "../showPage.js";
import Element from "../element.js";
import selectMenuItem from "../selectMenuItem.js";

export default function FindItem(parent, clientList) {
    if (!Array.isArray(clientList)) return console.log("Аргумент не є масивом");

    const items = [];

    clientList.forEach(item => {

        const li = new Element({tag: "li", classes: "result__item hide", attributes: {"data-id": item.ID}})
                    .child({tag: "span", classes: "result__text", text: item.Name})
                    .child({classes: "result__arrow"});

        li.get().addEventListener("click", (e) => {
            if (e.target.closest(".result__item")) {
                showPage("services");
                selectMenuItem(item.ID);
            }
        });

        items.push(li.get());
    });

    parent.append(...items);

    return items;
}