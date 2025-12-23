import clientFind from "./clientFind.js";
import showPage from "./showPage.js";

import ClientsList from "./components/ClientsList.js";
import FindItem from "./components/FindItem.js";
import renderMenuItems from "./components/RenderMenu.js";
import WorkspaceControl from "./WorkspaceControl.js";

import selectMenuItem from "./selectMenuItem.js";

import Enterprises from "./exampleList.js";

import ServiceMonitor from "./services/ServiceMonitor.js";

import findInClientsArray from "./findOnMenu.js";

const heroInput = document.querySelector(".hero__input");
const resultFindList = document.querySelector(".result");
const menuFindList = document.querySelector(".menu-list");

const addClientBtn = document.querySelector(".add-client-page");

const addInput = document.querySelector("#add-input");
const newClientBtn = document.querySelector("#add-btn");

const workspaceBody = document.querySelector(".workspace-body");


const serviceMonitor = new ServiceMonitor();
const workspaceControl = new WorkspaceControl(workspaceBody, document.querySelector(".workspace__ip"), document.querySelector(".workspace__client"));

document.addEventListener("update-workspace", (e) => {

    const { name } = e.detail;

    workspaceControl.updateWorkspace(name);
});


const clients = new ClientsList(".add-client-list");
        clients.addClients(Enterprises);


menuFindList.insertAdjacentHTML("afterbegin", renderMenuItems(Enterprises));
menuFindList.addEventListener("click", (e) => {
    const target = e.target;

    const menuItem = target.closest("[data-item]");

    if (menuItem) {
        selectMenuItem(menuItem.dataset.id);   
    }

    if ( target.closest(".menu-list__name") && !target.closest("[data-item]") ) { 
        target.closest(".acc").classList.toggle("open");
    }
});

const allClients = await serviceMonitor.getAllClients();
const resultItems = FindItem(resultFindList, getAllClientsItems(allClients));


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
});

heroInput.focus();
heroInput.addEventListener("input", () => {
    clientFind(heroInput, resultItems);
});


newClientBtn.addEventListener("click", () => {    
    if (!addInput.value) return;

    clients.addClients(addInput.value.trim());
    addInput.value = "";
});

function getAllClientsItems(arr) {
    const allClients = [];

    arr.forEach(item => {
        if (!item?.Objects || !item?.Name) return;
        return item.Objects.length > 0 ? allClients.push(...item.Objects) : allClients.push(item);
    });
    
    return allClients;
}

const menuFindInput = document.querySelector(".menu__find");
menuFindInput.addEventListener("input", () => {
    menuFindList.innerHTML = renderMenuItems(findInClientsArray(menuFindInput.value, Enterprises));
});