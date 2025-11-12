export default class ServiceMonitor {
    constructor() {

    }

    async getAllClient() {
        const res = await fetch("http://localhost:5209/Service/GetAllEnterprises");

        return res.json();
    }
}