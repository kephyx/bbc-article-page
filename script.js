// BBC News Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Share button functionality
    const shareButton = document.querySelector('.share-button');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                alert('Share functionality is not available on this browser. Please copy the URL manually.');
            }
        });
    }
    
    // Save button functionality
    const saveButton = document.querySelector('.save-button');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Toggle saved state
            this.classList.toggle('saved');
            
            if (this.classList.contains('saved')) {
                // Change icon to filled bookmark
                const iconElement = this.querySelector('i');
                if (iconElement) {
                    iconElement.classList.remove('far');
                    iconElement.classList.add('fas');
                }
                alert('Article saved to your reading list');
            } else {
                // Change icon back to outline bookmark
                const iconElement = this.querySelector('i');
                if (iconElement) {
                    iconElement.classList.remove('fas');
                    iconElement.classList.add('far');
                }
                alert('Article removed from your reading list');
            }
        });
    }
    
    // Mobile menu toggle
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            alert('Menu functionality would open a full navigation panel');
        });
    }
    
    // Add play functionality to video thumbnails
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const mediaItem = this.closest('.media-item');
            if (mediaItem) {
                const title = mediaItem.querySelector('h3').textContent;
                alert(`Playing: ${title}`);
            }
        });
    });
    
    // Handle responsive navigation
    function handleResponsiveNav() {
        const navContainers = document.querySelectorAll('.nav-container');
        navContainers.forEach(container => {
            // Check if navigation is scrollable
            if (container.scrollWidth > container.clientWidth) {
                container.style.paddingBottom = '4px'; // Add space for scrollbar
            } else {
                container.style.paddingBottom = '0';
            }
        });
    }
    
    // Run on load and resize
    handleResponsiveNav();
    window.addEventListener('resize', handleResponsiveNav);
    
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

