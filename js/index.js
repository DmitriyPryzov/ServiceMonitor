import clientFind from "./clientFind.js";
import showPage from "./showPage.js";

import ClientsList from "./components/ClientsList.js";
import FindItem from "./components/FindItem.js";
import MenuItem from "./components/MenuItem.js";

import selectMenuItem from "./selectMenuItem.js";

import Enterprises from "./exampleList.js";

import ServiceMonitor from "./services/ServiceMonitor.js";

import exampleList from "./exampleList.js";

const heroInput = document.querySelector(".hero__input");
const resultFindList = document.querySelector(".result");
const menuFindList = document.querySelector(".menu-list");

const addClientBtn = document.querySelector(".add-client-page");

const addInput = document.querySelector("#add-input");
const newClientBtn = document.querySelector("#add-btn");


// const res = await new ServiceMonitor().getAllClient();
const res = exampleList;




const clients = new ClientsList(".add-client-list");
        clients.addClient(Enterprises);


MenuItem(menuFindList, Enterprises);


const resultItems = FindItem(resultFindList, getAllClients());


addClientBtn.addEventListener("click", () => showPage("add-client"));

document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(".back-btn")) {
        const page = target.closest(".page");

        page.classList.add("hide-page");
        page.classList.remove("fade-up");

        setTimeout(() => {
            page.classList.remove("show-page");
            page.classList.remove("hide-page");
        }, 1000);
    }

    if (target.closest(".menu-list__name")) {
        const acc = target.closest(".menu-list__item");

        acc.classList.toggle("open");
    }

    if (target.classList.contains("menu-sublist__item")) {
        selectMenuItem(target.dataset.id);
        
    }
});

heroInput.focus();
heroInput.addEventListener("input", () => {
    clientFind(heroInput, resultItems);
});


newClientBtn.addEventListener("click", () => {    
    if (!addInput.value) return;

    clients.addClient({Name: addInput.value.trim()});
    addInput.value = "";
});

function getAllClients() {
    const allClients = [];

    Enterprises.forEach(item => allClients.push(...item.Objects));

    return allClients;
}