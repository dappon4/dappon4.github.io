document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Navigation menu toggle for mobile - Add null checks
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Only add event listeners if elements exist
    if (hamburger && navLinks) {
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
    }
    
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
    
    // Header scroll effect - Add null check
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.height = '60px';
            } else {
                header.style.boxShadow = 'none';
                header.style.height = '70px';
            }
        });
    }

    // Debug message to confirm script is running
    console.log('Script loaded and running');

    // Project search functionality - improved version
    const projectSearch = document.getElementById('projectSearch');
    const projectsGrid = document.getElementById('projectsGrid');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Check if elements exist and log for debugging
    console.log('Project search element exists:', projectSearch !== null);
    console.log('Projects grid exists:', projectsGrid !== null);
    console.log('Project cards found:', projectCards.length);
    
    // Search function - fixed version
    function filterProjects(searchTerm) {
        // Convert search term to lowercase and trim whitespace
        searchTerm = searchTerm.toLowerCase().trim();
        console.log('Filtering projects for:', searchTerm);
        
        let resultsFound = false;
        
        // Remove any existing "no results" message
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }
        
        // Loop through all project cards
        projectCards.forEach(card => {
            // Get card content
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDescription = card.querySelector('p:not(.project-meta)').textContent.toLowerCase();
            const cardTags = card.getAttribute('data-tags') || '';
            
            // If search term is empty, show all cards
            if (searchTerm === '') {
                card.style.display = 'flex';
                resultsFound = true;
                return;
            }
            
            // Check if search term is in title, description, or tags
            if (
                cardTitle.includes(searchTerm) || 
                cardDescription.includes(searchTerm) || 
                cardTags.includes(searchTerm)
            ) {
                card.style.display = 'flex';
                resultsFound = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show "no results" message if no projects match
        if (!resultsFound && searchTerm !== '') {
            const noResultsElement = document.createElement('div');
            noResultsElement.className = 'no-results';
            noResultsElement.textContent = `No projects found matching "${searchTerm}"`;
            projectsGrid.appendChild(noResultsElement);
        }
    }
    
    // Initialize search functionality once DOM is fully loaded
    if (projectSearch && projectsGrid) {
        console.log('Setting up search event listeners');
        
        // Add debounce to search for better performance
        let searchTimeout;
        projectSearch.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterProjects(this.value);
            }, 300);
        });
        
        // Make tags clickable to filter
        document.querySelectorAll('.project-tag').forEach(tag => {
            tag.addEventListener('click', function() {
                const tagText = this.textContent.toLowerCase();
                projectSearch.value = tagText;
                filterProjects(tagText);
                
                // Scroll search into view if needed
                projectSearch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Show clear button when a tag is clicked
                const clearButton = document.querySelector('.search-clear-btn');
                if (clearButton) {
                    clearButton.style.display = 'block';
                }
            });
        });
        
        // Add clear search button functionality
        const searchContainer = document.querySelector('.project-search-container');
        if (searchContainer) {
            const clearButton = document.createElement('button');
            clearButton.className = 'search-clear-btn';
            clearButton.innerHTML = '&times;';
            clearButton.style.display = 'none';
            clearButton.title = 'Clear search';
            
            // Add the clear button to the container
            searchContainer.appendChild(clearButton);
            
            // Ensure proper positioning by removing any inline styles that could interfere
            clearButton.removeAttribute('style');
            clearButton.style.display = 'none';
            
            // Show/hide clear button based on input content
            projectSearch.addEventListener('input', function() {
                clearButton.style.display = this.value ? 'block' : 'none';
            });
            
            // Clear search on button click
            clearButton.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent form submission
                projectSearch.value = '';
                filterProjects('');
                this.style.display = 'none';
                projectSearch.focus();
            });
            
            // Init clear button visibility
            clearButton.style.display = projectSearch.value ? 'block' : 'none';
        }
        
        // Run search once on page load to initialize
        setTimeout(() => {
            filterProjects('');
        }, 500);
    }

    // Side navigation functionality - improved scrolling
    const sideNav = document.querySelector('.side-nav');
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    const sections = document.querySelectorAll('section');
    const heroSection = document.getElementById('hero');
    
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
    
    // Highlight active section in side nav - improved version
    function highlightNavItem() {
        if (!sideNavItems.length) return;
        
        let currentSection = '';
        let closestSection = null;
        let closestDistance = Infinity;
        
        // Find the section closest to the viewport center
        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            const distance = Math.abs(viewportMiddle - sectionMiddle);
            
            // If this section is closer to the middle than previous ones
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
                currentSection = section.id;
            }
        });
        
        // Apply active class and ensure styles
        sideNavItems.forEach(item => {
            // First, remove active class from all
            item.classList.remove('active');
            
            // Reset all labels and dots to default state
            const label = item.querySelector('.side-nav-label');
            const dot = item.querySelector('.side-nav-dot');
            
            if (label) {
                label.style.fontSize = '12px';
                label.style.fontWeight = 'normal';
                label.style.color = 'var(--light-text)';
            }
            
            if (dot) {
                dot.style.transform = 'scale(1)';
                dot.style.backgroundColor = 'var(--primary-color)';
            }
            
            // Then add active style to the appropriate item
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
                
                if (label) {
                    label.style.fontSize = '14px';
                    label.style.fontWeight = '500';
                    label.style.color = 'var(--primary-color)';
                }
                
                if (dot) {
                    dot.style.backgroundColor = 'var(--secondary-color)';
                    dot.style.transform = 'scale(1.3)';
                }
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
            const targetSection = document.getElementById(sectionId);
            
            if (targetSection) {
                // Calculate position with offset
                const offset = 80; // Offset from the top
                const targetPosition = targetSection.offsetTop - offset;
                
                // Scroll smoothly
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active class and styles manually
                sideNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    
                    // Reset styles for all items
                    const itemLabel = navItem.querySelector('.side-nav-label');
                    const itemDot = navItem.querySelector('.side-nav-dot');
                    
                    if (itemLabel) {
                        itemLabel.style.fontSize = '12px';
                        itemLabel.style.fontWeight = 'normal';
                        itemLabel.style.color = 'var(--light-text)';
                    }
                    
                    if (itemDot) {
                        itemDot.style.transform = 'scale(1)';
                        itemDot.style.backgroundColor = 'var(--primary-color)';
                    }
                });
                
                // Add active class and styles to clicked item
                item.classList.add('active');
                
                const activeLabel = item.querySelector('.side-nav-label');
                const activeDot = item.querySelector('.side-nav-dot');
                
                if (activeLabel) {
                    activeLabel.style.fontSize = '14px';
                    activeLabel.style.fontWeight = '500';
                    activeLabel.style.color = 'var(--primary-color)';
                }
                
                if (activeDot) {
                    activeDot.style.backgroundColor = 'var(--secondary-color)';
                    activeDot.style.transform = 'scale(1.3)';
                }
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
    if (sideNav && heroSection) {
        toggleSideNav();
        highlightNavItem();
        
        // Add scroll event listener
        window.addEventListener('scroll', function() {
            toggleSideNav();
            highlightNavItem();
        });
    }
});
