/**
 * Additional navigation fixes
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Nav fix loaded');
    
    // Force direct click handlers on each navigation item
    document.querySelectorAll('.side-nav-item').forEach(item => {
        // Remove existing listeners (optional)
        const clone = item.cloneNode(true);
        item.parentNode.replaceChild(clone, item);
        
        // Add fresh click handler
        clone.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Debug info
                console.log(`Navigating to ${sectionId} at ${section.offsetTop}`);
                
                // Basic scroll
                window.scrollTo({
                    top: section.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // Highlight active
                document.querySelectorAll('.side-nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
        
        // Make sure label is clickable too
        const label = clone.querySelector('.side-nav-label');
        if (label) {
            label.style.cursor = 'pointer';
        }
    });
    
    // Alternative approach using href attributes for native behavior
    const sideNavWrapper = document.querySelector('.side-nav');
    if (sideNavWrapper) {
        const navHTML = sideNavWrapper.innerHTML;
        sideNavWrapper.innerHTML = navHTML.replace(/data-section="([^"]+)"/g, 'data-section="$1" onclick="document.getElementById(\'$1\').scrollIntoView({behavior: \'smooth\', block: \'start\'}); return false;"');
    }
});
