import Element from "../element.js";

export default class Enterprise {
    constructor ({Name, Token}, callback) {
        this.name = Name;
        this.token = Token;

        this.callback = callback;

        this.mainElem;

        this.nameElement;

        this.#render();
    }

    get() {
        return this.mainElem;
    }

    onAction(e) {
        const target = e.target;

        if (target.closest(".edit")) {
            this.onEdit();
        }

        if (target.closest(".remove")) {
            this.remove();
        }
    }

    remove() {
        this.callback(this.mainElem);
    }

    onEdit() {
        this.nameElement.classList.add("edited");
        this.nameElement.focus();

        this.outFocus = this.onOutFocus.bind(this);

        this.nameElement.addEventListener("blur",  this.outFocus);
    }

    onOutFocus() {
        this.nameElement.removeEventListener("blur", this.outFocus);
        delete this.outFocus;
        
        if (this.nameElement.value == "") {
            this.mainElem.remove();
        }
        this.nameElement.classList.remove("edited");
    }

    #render() {
        const subItem = new Element({classes: "add-client-sublist__item", attributes: {"data-token": this.token}})
                                .child({name: "name", tag: "input", classes: "sublist__name", text: this.name});
        
        subItem.get().insertAdjacentHTML("beforeend", 
            `
                <div class="add-client-events">
                    <a class="edit"><img src="./assets/img/icons/edit_sim.svg" alt="edit"></a>
                    <a class="remove"><img src="./assets/img/icons/delete.svg" alt="delete"></a>
                </div>
            `);

            subItem.get("name").addEventListener("keydown", (e) => {
                if (e.code == "Enter") {
                    this.nameElement.classList.remove("edited");
                    this.nameElement.blur();
                }
            });

            subItem.get().addEventListener("click", this.onAction.bind(this));

        this.mainElem = subItem.get();
        this.nameElement = subItem.get("name");
        
        return subItem.get();
    }
}