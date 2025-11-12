import Element from "../element.js";

import Enterprise from "./Enterptise.js";

export default class Client {
    constructor({Name, Objects}, callback) {
        this.name = Name;
        this.objects = Objects || [];

        this.callback = callback;

        this.mainElem;

        this.elements = {};

        this.removeEnterprise = this.removeEnterprise.bind(this);

        this.#render();
    }

    get() {
        return this.mainElem;
    }


    onAction(e) {
        const target = e.target;

        if (target.closest(".edit-group")) {
            this.onEdit();
        }

        if (target.closest(".remove-group")) {
            this.remove();
        }

        if (target.closest(".add-enterprise")) {
            const enterprise = this.addEnterprise({Name: ""});

            this.openAccordion();
            this.elements.sublistContent.insertAdjacentElement("afterbegin", enterprise.get());
            enterprise.onEdit();
        }

        if (target.classList.contains("add-client-wrap")) {
            this.mainElem.classList.toggle("open");
        }
    }

    openAccordion() {
        this.mainElem.classList.add("acc", "open");
    }

    onEdit() {
        this.elements.name.classList.add("edited");
        this.elements.name.focus();

        this.outFocus = this.onOutFocus.bind(this);

        this.elements.name.addEventListener("blur",  this.outFocus);
    }

    onOutFocus() {
        this.elements.name.removeEventListener("blur", this.outFocus);
        delete this.outFocus;
        
        if (this.elements.name.value == "") {
            this.elements.name.value = this.name;
        }
        this.elements.name.classList.remove("edited");
        console.log(this.callback);
        
        this.callback({editName: "asdasd"});
    }

    addEnterprise(data) {
        return new Enterprise(data, this.removeEnterprise);
    }

    remove() {
        this.mainElem.remove();
    }

    removeEnterprise(enterprise) {  
        if (this.elements.sublistContent.childNodes.length == 1) {            
            this.mainElem.classList.remove("acc", "open");
        }
        enterprise.remove();
    }
    
    #render() {        
        const isAcc = this.objects.length > 0 ? "acc" : "";

        const li = new Element({tag: "li", classes: `add-client__item ${isAcc}`})
                            .child({name: "block", classes: "block"})
                            .child({name: "sublist", classes: "add-client-sublist acc-sublist"});    
        
        const nameWrap = new Element({classes: "add-client-wrap acc-name"});
        const name = new Element({tag: "input", classes: "add-client__name", text: this.name});
        const events = new Element({classes: "add-client-events"});
                events.get().insertAdjacentHTML("beforeend", `
                        <a class="add-enterprise"><img src="./assets/img/icons/add.svg" alt="add"></a>
                        <a class="edit-group"><img src="./assets/img/icons/edit_sim.svg" alt="edit-group"></a>
                        <a class="remove-group"><img src="./assets/img/icons/delete.svg" alt="delete"></a>`);

            nameWrap.get().append(name.get());
            li.get("block").append(nameWrap.get(), events.get());

        name.get().addEventListener("keydown", (e) => {
            if (e.code == "Enter") {
                this.elements.name.classList.remove("edited");
                this.elements.name.blur();
            }
        });

        const sublistContent = new Element({classes: "acc-sublist-content"});
        li.get("sublist").append(sublistContent.get());

        if (this.objects.length > 0) {
            const fragment = document.createDocumentFragment();
            
            fragment.append(...this.objects.map(item => this.addEnterprise(item).get()));
            
            sublistContent.get().append(fragment);
        }

        this.mainElem = li.get();

        this.elements.parent = li.get();
        this.elements.block = li.get("block");
        this.elements.name = name.get();
        this.elements.sublistContent = sublistContent.get();

        li.get().addEventListener("click", this.onAction.bind(this));
        
        return li.get();
    }
}