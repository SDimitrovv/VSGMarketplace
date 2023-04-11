export const NotFound = () => {
    document.querySelector("header").style.display = "none";
    const main = document.querySelector('main')
    main.id = "errorPage";
    main.innerHTML = `
    <h2>Error 404...</h2>
        <p>This page doesn't exist</p>
        <a href="/">Click here to go back to the homepage</a>
    `;
}

export default NotFound;