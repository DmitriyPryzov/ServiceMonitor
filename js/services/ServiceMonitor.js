import exampleServices from "../exampleServices.js";
import exampleList from "../exampleList.js";

export default class ServiceMonitor {
    constructor() {

    }

    async getAllClients() {
        // const res = await fetch("http://localhost:5209/Service/GetAllEnterprises");

        // return await res.json();

        const res = await new Promise((resolve, reject) => {
                    const result = exampleList;
                    resolve(result);
        });
        return res;
    }

    async getServices() {
        const res = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    const result = exampleServices[0];
                    resolve(result);
                }, 1000);
        });
        return res;
    }
}