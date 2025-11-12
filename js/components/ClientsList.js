import Client from "./Client.js";

export default class ClientList {
    constructor (clientList) {
        this.list = document.querySelector(clientList);

        this.structure = [];

        this.getEdited = this.getEdited.bind(this);
    }

    addClient(data) {
        if (!Array.isArray(data)) return this.list.append(new Client(data, this.getEdited).get());
        
        const fragment = document.createDocumentFragment();
        data.forEach(item => {
            fragment.append(new Client(item, this.getEdited).get());
        });

        return this.list.append(fragment);
    }


    getEdited(editedObj) {
        this.structure.push(editedObj);

        console.log(this.structure);
    }

} 