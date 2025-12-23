export default function newElement(tag="div", ...args) {
    const element = document.createElement(tag);

    const typeArguments = {
        string: (data) => {
            const clearData = data.split(" ").filter(item => item.trim());

            if (clearData.length) {
                element.classList.add(...clearData);
            }
        },
        object: (data) => {
            if (Array.isArray(data)) {
                element.append(...data);
            } else if (data !== null) {
                for (let item in data) {
                    element.setAttribute(item, data[item]);
                }
            }
        },
    };

    args.forEach(arg => {
        const type = typeof arg;

        if (typeArguments[type] && arg !== null) {
            typeArguments[type](arg)
        }
    });

    return element;
}