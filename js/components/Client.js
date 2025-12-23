import Enterprise from "./Enterprises.js";

import newElement from "../helpers/element.js";


export default class Client {
    constructor(data) {
        this.root = document.createElement("li");
        this.root.classList.add("add-client__item");

        const {title, objects, acc, id} = this.initData(data);

        this.refs = {};

        this.state = {
            acc: acc,
            open: false,
            title: title,
            id: id,
            edited: false,
            objects: objects
        };

        this.build();
        this.update();
        this.onAction();
    }

    initData(data) {
        const defaults = {title: "", id: 0, objects: [], acc: false};

        if (!data) return defaults;

        if (typeof data == "string") {
            return {...defaults, title: data};
        }
        if (typeof data == "object" && data !== null) {
            return {
                title: data.Name || "Помилка",
                id: data.ID || 0,
                objects: data.Objects || [],
                acc: data.Objects.length ? true : false
            }
        }

        return defaults;
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.update();
    }

    onAction() {
        this.root.addEventListener("click", (e) => {
            const target = e.target;
            const input = this.refs.input;

            if (target.closest(".acc-name")) {
                this.setState({open: this.state.open ? false : true});
            }

            if (target.closest(".edit-group")) {
                this.setState({edited: true});
                input.focus();

                const length = input.value.length;

                input.setSelectionRange(length, length);
            }

            if (target.closest(".remove-group")) {
                this.event("remove-client");
                this.root.remove();
            }

            if (target.closest(".add-enterprise")) {

                const newObject = {ID: crypto.randomUUID(), Token: null, Name: "", EnterpriseID: this.state.id};

                const enterprise = new Enterprise(newObject, {edited: true});
                this.refs.sublist.append(enterprise.get());
                const newStateObjects = [...this.state.objects, newObject];

                this.setState(this.state.acc ? {open: true, objects: newStateObjects} : {open: true, acc: true, objects: newStateObjects});
                enterprise.focus();
            }
        });

        this.root.addEventListener("keydown", (e) => {
            if (e.code === "Enter") {
                this.setState({edited: false});
                this.refs.input.blur();
            }
        });

        this.root.addEventListener("input", (e) => {
            if (e.target == this.refs.input) {
                this.state.title = e.target.value; 
            }
        });

        this.refs.input.addEventListener("blur", () => {
            this.setState({edited: false});
            this.event("change-client");
            this.refs.input.blur();
        });

        this.root.addEventListener("remove", (e) => {
            const { id } = e.detail;

            const newObjects = this.state.objects.filter(item => item.ID !== id);
            this.setState({
                        objects: newObjects,
                        acc: newObjects.length,
                        open: newObjects.length
                    });

            this.event("change-client");
        });

        this.root.addEventListener("editName", (e) => {
            const { id, title } = e.detail;
            const changedObjects = this.state.objects.map(item => {
                    if (item.ID === id) {
                        item.Name = title;
                    }
                    return item;
                });
                this.setState({objects: changedObjects});  
            
            this.event("change-client");
        });
    }

    event(mode) {
        if (typeof mode !== "string") return;

        const { title, id, objects } = this.state;

        this.root.dispatchEvent(new CustomEvent(mode, {
                    bubbles: true, 
                    detail: { id, title, objects }
                }));
    }

    get() {
        return this.root;
    }

    update() {        
        const {edited, acc, open} = this.state;
        
        this.root.classList.toggle("acc", acc);
        this.root.classList.toggle("open", open);

        this.refs.input.classList.toggle("edited", edited);
    }

    renderChildren() {
       return this.state.objects.map(item => {
            return new Enterprise(item).get();
        });
    }

    build() {   
        const input = newElement("input", `add-client__name`, { value: this.state.title });
        const sublistContent = newElement("ul", "acc-sublist-content", [...this.renderChildren()]);

        this.root.append(newElement("div", "block", [
            newElement("div", "add-client-wrap acc-name", [input]),
            newElement("div", "add-client-events", [
                newElement("a", "add-enterprise", [
                    newElement("img", { src: "./assets/img/icons/add.svg", alt: "add" })
                ]),
                newElement("a", "edit-group", [
                    newElement("img", { src: "./assets/img/icons/edit_sim.svg", alt: "edit-group" })
                ]),
                newElement("a", "remove-group", [
                    newElement("img", { src: "./assets/img/icons/delete.svg", alt: "delete" })
                ])
            ])
        ]), newElement("div", "add-client-sublist acc-sublist", [sublistContent]));

        this.refs.input = input;
        this.refs.sublist = sublistContent; 
    }
}