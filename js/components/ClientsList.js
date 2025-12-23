import Client from "./Client.js";

export default class ClientList {
    constructor (clientList) {
        this.root = document.querySelector(clientList);

        this.state = {
            clients: []
        };

        this.onAction();
    }

    setState(state) {
        this.state = {...this.state, ...state};
    }

    onAction() {
        this.root.addEventListener("remove-client", (e) => {
            const { id } = e.detail;

            this.setState({clients: this.state.clients.filter(item => item.ID !== id)});
            console.log(this.state.clients);
            
        });

        this.root.addEventListener("change-client", (e) => {
            const { id, title, objects } = e.detail;

            const newObj = this.state.clients.map(client => {
                if (client.ID === id) {
                    return {ID: id, Name: title, Objects: objects};
                } else {
                    return client;
                }
            });

            this.setState({clients: newObj});

            console.log(this.state.clients);
            
        });
    }

    addClients(data) {
        const arrClients = Array.isArray(data) ? data : [data];
        
        const fragment = document.createDocumentFragment();
        const newArrClients = [];

        arrClients.forEach(item => {
            const defaults = {ID: crypto.randomUUID(), Name: "", Objects: []};
            let newObj = {};

            if (typeof item === "string") {
                newObj = {...defaults, ...{ Name: item }};
            }

            if (typeof item === "object") {
                newObj = {...defaults, ...item};
            }
            newArrClients.push(newObj);
            fragment.append(new Client(newObj).get());
        });

        this.setState({clients: [...this.state.clients, ...newArrClients]});
        console.log(this.state.clients);

        return this.root.append(fragment);
    }

    getData() {
        return this.state.clients;
    }
} 