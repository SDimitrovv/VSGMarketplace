export function navStyling() {
    document.querySelectorAll('.navButton').forEach(n => {
        let currentPath = document.URL.split('/')[3];
        const allPaths = '#' + n.textContent.trim().toLowerCase();

        if (currentPath.includes('-')) {
            currentPath = currentPath.replace('-', ' ');
        }

        if (allPaths === currentPath) {
            n.className += ' active';
            n.querySelector('path').style.fill = '#F0F0F0';
        }
    });
}

export function addButtons() {
    document.querySelectorAll('.buttons button').forEach(b => {
        b.addEventListener('click', e => {
            e.preventDefault();
            e.target.parentElement.parentElement.remove();
        })
    })
}

export function closeModal() {
    document.querySelectorAll('.closeModal').forEach(b =>
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
}
