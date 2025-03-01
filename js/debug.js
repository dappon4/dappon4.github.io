/**
 * Debugging helper for the side navigation
 */
(function() {
    // Run this immediately
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Debug script loaded');
        
        // Check for the side navigation
        const sideNav = document.querySelector('.side-nav');
        if (sideNav) {
            console.log('Side nav found in DOM');
            console.log('Current display style:', window.getComputedStyle(sideNav).display);
            console.log('Current visibility:', window.getComputedStyle(sideNav).visibility);
            console.log('Current opacity:', window.getComputedStyle(sideNav).opacity);
            console.log('Current z-index:', window.getComputedStyle(sideNav).zIndex);
            
            // Test visibility by forcing it
            setTimeout(() => {
                sideNav.style.display = 'block';
                sideNav.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Add red tint to make it obvious
                console.log('Forced side nav visibility');
            }, 2000);
        } else {
            console.error('Side nav not found in DOM');
        }
        
        // Log all sections
        const sections = document.querySelectorAll('section');
        console.log('Sections found:', sections.length);
        sections.forEach((section, index) => {
            console.log(`Section ${index}: id=${section.id}, offsetTop=${section.offsetTop}, height=${section.offsetHeight}`);
        });
    });
})();
