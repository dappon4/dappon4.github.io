/**
 * Debug script for navigation labels
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if active class is being applied
    const checkActiveLabels = () => {
        const activeItem = document.querySelector('.side-nav-item.active');
        if (activeItem) {
            const label = activeItem.querySelector('.side-nav-label');
            console.log('Active section:', activeItem.getAttribute('data-section'));
            console.log('Label font size:', window.getComputedStyle(label).fontSize);
            console.log('Label color:', window.getComputedStyle(label).color);
        } else {
            console.log('No active navigation item found');
        }
    };

    // Force the active class and styles for testing
    const forceActiveStyles = () => {
        const items = document.querySelectorAll('.side-nav-item');
        const currentPath = window.location.hash.slice(1) || 'hero';
        
        items.forEach(item => {
            const section = item.getAttribute('data-section');
            if (section === currentPath) {
                item.classList.add('active');
                const label = item.querySelector('.side-nav-label');
                if (label) {
                    // Force inline styles for testing
                    label.style.fontSize = '14px';
                    label.style.color = 'var(--primary-color)';
                    label.style.fontWeight = '500';
                }
            }
        });
    };

    // Check active state on scroll
    window.addEventListener('scroll', function() {
        setTimeout(checkActiveLabels, 100);
    });

    // Initial check
    setTimeout(checkActiveLabels, 500);
    
    // Force active styles after a delay
    setTimeout(forceActiveStyles, 1000);
});
