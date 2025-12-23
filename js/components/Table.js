const SERVICE_STATUS_MAP = {
    "Running": "active",
    "Automatic": "active",
    "Automatic (Delayed Start)": "active",
    
    "Start Pending": "auto",
    "Stop Pending": "auto",
    "Pause Pending": "auto",
    "Continue Pending": "auto",
    "Manual": "auto",
    
    "Stopped": "disabled",
    "Paused": "disabled",
    "Disabled": "disabled"
};

export default function TableInit(arrServices) {

    const table = document.createElement("table");
            table.classList.add("main-table");

    const tableHead = `
        <thead class="main-table-head">
            <tr>
                <th scope="col" class="main-table-head__item">
                    Назва служби
                </th>
                <th scope="col" class="main-table-head__item">
                    Версія
                </th>
                <th scope="col" class="main-table-head__item">
                    Стан
                </th>
                <th scope="col" class="main-table-head__item">
                    Тип запуску
                </th>
            </tr>
        </thead>
    `;

    let tableItems = "";

    arrServices.forEach(item => {

        const startupType = SERVICE_STATUS_MAP[item.StartupType]; 
        const status = SERVICE_STATUS_MAP[item.Status]; 

        tableItems += `
            <tr class="main-table-service">
                <td class="main-table-service__item name">${item.Name}</td>
                <td class="main-table-service__item">${item.Version}</td>
                <td class="main-table-service__item">
                    <span class="state ${status}">${item.Status}</span>
                </td>
                <td class="main-table-service__item">
                    <span class="state ${startupType}">${item.StartupType}</span>
                </td>
            </tr>
        `;
    });

    const tableBody = `<tbody>${tableItems}</tbody>`;

    table.insertAdjacentHTML("afterbegin", tableHead + tableBody);

    return table;
}