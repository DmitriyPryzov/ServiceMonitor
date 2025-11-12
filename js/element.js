export default class Element {
    constructor(options) {
        this.mainEl = this.create(options);
        this.elements = {};
    }

    create({name = "", tag = "div", classes = "", text = "", attributes = {}, onClick, onInput} = {}) {

        const el = document.createElement(tag);
            if (classes) el.className = classes;
                el.textContent = text;
                if (tag == "input") {
                    el.value = text;
                }
        
        const attributesList = Object.keys(attributes);

        if (attributesList) {
            attributesList.forEach(attr => {
                el.setAttribute(attr, attributes[attr]);
            });
        }

        if (onClick) {
            el.addEventListener("click", onClick);
        }

        if (onInput) {
            el.addEventListener("input", onInput);
        }

        if (name) {
            this.elements[name] = el;
        }

        return el;
    }

    child({name = "", tag = "div", classes = "", text = "", attributes = {}, onInput, onClick} = {}) {

        this.mainEl.append(this.create({name, tag, classes, text, onClick, onInput, attributes }));

        return this;
    }

    get(name = "") {

        if (name) {
            return this.elements[name] || this.mainEl;
        }

        return this.mainEl;
    }
}