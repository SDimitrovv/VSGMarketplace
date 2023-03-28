export function navStyling() {
    document.querySelectorAll('.navButton').forEach(n => {
        let pathname = document.URL.split('/')[4];

        if (pathname.includes('-')) {
            pathname = pathname.replace('-', ' ');
        }

        if (pathname.includes(n.textContent.trim())) {
            n.className += ' active';
            n.querySelector('path').style.fill = '#F0F0F0';
        }
    });
}