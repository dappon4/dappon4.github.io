document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.height = '60px';
        } else {
            header.style.boxShadow = 'none';
            header.style.height = '70px';
        }
    });
    
    // Initialize AOS (Animate on Scroll) if you decide to add it later
    // if (typeof AOS !== 'undefined') {
    //     AOS.init({
    //         duration: 800,
    //         easing: 'ease-in-out',
    //         once: true
    //     });
    // }

    // Debug message to confirm script is running
    console.log('Script loaded and running');

    // Side navigation functionality - improved scrolling
    const sideNav = document.querySelector('.side-nav');
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    const sections = document.querySelectorAll('section');
    const heroSection = document.getElementById('hero');
    
    // Debug check for elements
    console.log('Side nav exists:', sideNav !== null);
    console.log('Hero section exists:', heroSection !== null);
    console.log('Sections:', sections.length);
    
    // Show side nav only after scrolling past hero section - direct approach
    function toggleSideNav() {
        if (!sideNav || !heroSection) return;
        
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        // Direct approach - if we're past hero section
        if (window.scrollY > heroBottom - 300) {
            sideNav.style.display = 'block';
        } else {
            sideNav.style.display = 'none';
        }
    }
    
    // Highlight active section in side nav
    function highlightNavItem() {
        if (!sideNavItems.length) return;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 300 && 
                window.scrollY < sectionTop + sectionHeight - 300) {
                currentSection = section.id;
            }
        });
        
        sideNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    // Improved smooth scroll to section when clicking nav item or label
    sideNavItems.forEach(item => {
        // Make both dot and label clickable
        const navDot = item.querySelector('.side-nav-dot');
        const navLabel = item.querySelector('.side-nav-label');
        
        // Function to handle clicking on any part of the nav item
        const handleNavClick = function(event) {
            // Always prevent default and stop propagation
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            const sectionId = item.getAttribute('data-section');
            console.log('Click on section:', sectionId);
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                console.log('Found target section:', targetSection.id);
                
                // Calculate position with offset
                const offset = 80; // Offset from the top
                const targetPosition = targetSection.offsetTop - offset;
                console.log('Scrolling to position:', targetPosition);
                
                // Scroll smoothly
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active class manually
                sideNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                item.classList.add('active');
            } else {
                console.error('Target section not found:', sectionId);
            }
        };
        
        // Add click event to entire item
        item.addEventListener('click', handleNavClick);
        
        // Also add click events directly to child elements to be sure
        if (navDot) {
            navDot.addEventListener('click', function(event) {
                event.stopPropagation(); // Stop event from bubbling up
                handleNavClick(event);
            });
        }
        
        if (navLabel) {
            navLabel.addEventListener('click', function(event) {
                event.stopPropagation(); // Stop event from bubbling up
                handleNavClick(event);
            });
        }
    });
    
    // Initial calls
    toggleSideNav();
    highlightNavItem();
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        toggleSideNav();
        highlightNavItem();
    });
    
    // Log section IDs for debugging
    console.log('Section IDs:');
    sections.forEach(section => {
        console.log(section.id, section.offsetTop);
    });
});
