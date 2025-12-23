
export default function findInClientsArray(str, clients) {
    if (!Array.isArray(clients) || !clients.length) return [];

    let res = [];

    for (let item of clients) {
        const name = item?.Name ? item.Name : "";

        if (!name) return;

        if (name.toLowerCase().includes(str.toLowerCase())) {
            res.push(item);
        } else {
            const objects = item?.Objects ? item.Objects : null;

            if (objects) {
                const findRes = findInClientsArray(str, objects);
    
                res = res.concat(findRes);
            }
        }
    }

    return res;
}

