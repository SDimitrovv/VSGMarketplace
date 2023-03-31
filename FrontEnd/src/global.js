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

export function addButtons() {
    document.querySelectorAll('.buttons button').forEach(b => {
        b.addEventListener('click', e => {
            e.preventDefault();
            let container = document.querySelector('.container');

            if (!container) {
                container = document.querySelector('.removeContainer');
            }
            container?.remove();
        })
    })
}

document.querySelectorAll('.closeModal')?.forEach(b =>
    b.addEventListener('click', e => {
        e.preventDefault();
        let overlay = document.querySelector('#overlay');
        if (!overlay) {
            overlay = document.querySelector('#addItemOverlay');
            const overlay2 = document.querySelector('#addItemOverlay2');
            overlay2.style.display = 'none';
        }

        overlay.style.display = 'none';
    })
)