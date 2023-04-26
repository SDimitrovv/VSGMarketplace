export const NotFound = () => {
    const main = document.querySelector('main') as HTMLElement;
    main.id = "errorPage";
    main.innerHTML = `
    <div>
    <h2>Error 404...</h2>
    </br>
    <p>This page doesn't exist</p>
    </div>
    `;
}

export default NotFound;