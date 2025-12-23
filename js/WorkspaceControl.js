import ServiceMonitor from "./services/ServiceMonitor.js";
import TableInit from "./components/Table.js";
import loader from "./components/Loader.js";
import errorBlock from "./components/Error.js";

export default class WorkspaceControl {
    constructor(parent, ip, clientName) {
        this.parent = parent;
        this.ip = ip;
        this.clientName = clientName;
        this.clientTitle = "";
        
        this.loader = loader();
        this.errorBlock = errorBlock;

        this.state = {
            dataServices: {},
            loading: false,
            error: false,
            errorText: {}
        };

        this.serviceMonitor = new ServiceMonitor();
    }

    setState(state) {
        this.state = {...this.state, ...state};
        this.render();
    }

    getDataServices() {
        return this.serviceMonitor.getServices();
    }

    appendWorkspace(element) {
        this.parent.replaceChildren(element);
    }

    updateHeader() {
        const ipList = this.state.dataServices?.IP_List?.join(", ") || "";
        
        if (this.ip) this.ip.textContent = ipList;
        if (this.clientName) this.clientName.innerText = this.clientTitle;
    }

    async updateWorkspace(clientTitle = "") {

        if (clientTitle) {
            this.clientTitle = clientTitle;
        }

        this.setState({loading: true});

        try {
            const services = await this.getDataServices();

            this.setState({loading: false, dataServices: services});
        } catch (err) {
            this.setState({error: true, 
                            loading: false, 
                            errorText: {title: "Помилка отримання даних", desc: err}});
        }
    }

    render() {
        if (this.state.loading) {
            this.appendWorkspace(this.loader);
            return;
        }

        if (this.state.error) {
            this.appendWorkspace(this.errorBlock(this.state.errorText.title, this.state.errorText.desc, this.updateWorkspace.bind(this)));
            return;
        }

        const services = this.state.dataServices.Services;

        if (!services || services.length === 0) {
            this.appendWorkspace(this.errorBlock("Не знайдено жодної служби", "Служба ServiceMonitor не повернула жодного результату", this.updateWorkspace.bind(this)));
            return;
        }

        const table = TableInit(this.state.dataServices.Services);
            this.appendWorkspace(table);
            this.updateHeader();
    }
}