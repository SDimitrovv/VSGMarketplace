export const header = `
    <a id='logo' href="/" spa>
    <img src="../../images/marketplace-mini-logo.png" alt="Marketplace-logo">
</a>
<span id="pageTitle">Marketplace</span>
<div id="profileGreet">
    <span>Hi, User </span>
    <img src="../../images/profile-image.png" alt="Profile-picture">
</div>
<a id="hamburger">
    <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M24.25 10.25H1.75C1.06 10.25 0.5 9.69 0.5 9C0.5 8.31 1.06 7.75 1.75 7.75H24.25C24.94 7.75 25.5 8.31 25.5 9C25.5 9.69 24.94 10.25 24.25 10.25ZM24.25 2.75H1.75C1.06 2.75 0.5 2.19 0.5 1.5C0.5 0.81 1.06 0.25 1.75 0.25H24.25C24.94 0.25 25.5 0.81 25.5 1.5C25.5 2.19 24.94 2.75 24.25 2.75ZM24.25 17.75H1.75C1.06 17.75 0.5 17.19 0.5 16.5C0.5 15.81 1.06 15.25 1.75 15.25H24.25C24.94 15.25 25.5 15.81 25.5 16.5C25.5 17.19 24.94 17.75 24.25 17.75Z"
            fill="#ED1C25" />
    </svg>
</a>
    `;

document.querySelector('header').innerHTML = header;