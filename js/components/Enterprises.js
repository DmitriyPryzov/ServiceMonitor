import newElement from "../helpers/element.js";

export default class Enterprise {
    constructor(data, state = {}) {
        this.root = document.createElement("li");
        this.root.classList.add("add-client-sublist__item");

        const {title, id, token, edited} = this.initData(data, state);

        this.refs = {};

        this.state = {
            edited: edited,
            title: title,
            id: id,
            token: token,
        };

        this.build();
        this.update();
        this.onAction();
    }

    initData(data, state = {}) {
        const defaults = {title: "", id: 0, token: null, edited: false};

        if (!data && data !== "") return defaults;

        if (typeof data == "string") {
            return {...defaults, title: data, ...state};
        }
        if (typeof data == "object" && data !== null) {
            return {
                title: data.Name || data.Name === "" ? data.Name : "Помилка",
                id: data.ID || 0,
                token: data.Token || null,
                edited: false,
                ...state
            }
        }

        return defaults;
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.update();
    }

    get() {
        return this.root;
    }

    focus() {
        const input = this.refs.input;   
        input.focus();
        
        const length = input.value.length;
        input.setSelectionRange(length, length);
    }

    onAction() {
        this.root.addEventListener("click", (e) => {
            const target = e.target;

            if (target.closest(".edit")) {
                this.setState({edited: true});
                this.focus();
            }

            if (target.closest(".remove")) {
               this.event("remove");

                this.root.remove();
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
            if (this.refs.input.value) {
                this.setState({edited: false});
                this.refs.input.blur();
                this.event("editName");
            } else {
                this.event("remove");
                this.root.remove();
            }
        });


    }

    event(mode) {
        if (typeof mode !== "string") return;

        const { title, id } = this.state;

        this.root.dispatchEvent(new CustomEvent(mode, {
                    bubbles: true, 
                    detail: { id, title }
                }));
    }

    update() {
        const {edited} = this.state;

        this.refs.input.classList.toggle("edited", edited);
    }

    build() {
        const input = newElement("input", `sublist__name`, {value: this.state.title});

        this.root.append(input,                                                             
                         newElement("div", "add-client-events", [
                                    newElement("a", "edit", [
                                        newElement("img", { src: "./assets/img/icons/edit_sim.svg", alt: "edit" })
                                    ]),
                                    newElement("a", "remove", [
                                        newElement("img", { src: "./assets/img/icons/delete.svg", alt: "delete" })
                                    ])
                                ])
                        ); 

        this.root.dataset.id = this.state.id;
        this.root.dataset.token = this.state.token;

        this.refs.input = input;
    }
}