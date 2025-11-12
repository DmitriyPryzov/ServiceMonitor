import Element from "../element.js";

export default function MenuItem(parent, clientList) {
    if (!Array.isArray(clientList)) return console.log("Аргумент не є масивом");

    const items = [];

    for (let item of clientList) {

        const isAcc = item.Objects.length !== 0 ? true : false;
        const subItems = [];

        const li = new Element({tag: "li", classes: `menu-list__item ${isAcc ? "acc" : ""}`})
            .child({name: "name", classes: `menu-list__name ${isAcc ? "acc-name" : "single"}`, text: item.Name})
            .child({name: "sublist", classes: "menu-sublist acc-sublist"});

        const sublistContent = new Element({classes: "acc-sublist-content"});

        if (isAcc) {
            item.Objects.forEach(subItem => {
                subItems.push( new Element({classes: "menu-sublist__item", text: subItem.Name, attributes: {"data-id": subItem.ID}}).get() );
            });

            sublistContent.get().append(...subItems);
        }


        li.get("sublist").append(sublistContent.get());

        items.push(li.get());
    }

    parent.append(...items);

    return items;
}