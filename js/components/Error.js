import Element from "../element.js";

export default function errorBlock(title, body = "ERROR!", callback = null) {

    const errorBlock = new Element({classes: "error"}).get();

    errorBlock.innerHTML = `
            <div class="error-icon-block">
                <div class="error__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
            </div>

            <div class="error-text-block">
                <h3 class="error__title">${title}</h3>
                <div class="error__desc">${body}</div>
                <button class="error__btn">Спробувати знову</button>
            </div>
    `;

    if (callback) {
        errorBlock.querySelector(".error__btn").addEventListener("click", callback);
    }

    return errorBlock;
}