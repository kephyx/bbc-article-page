// BBC News Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Update timestamp to show proper format
    const timestamp = document.querySelector('.timestamp');
    if (timestamp) {
        const date = new Date(timestamp.getAttribute('datetime'));
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        timestamp.textContent = date.toLocaleDateString('en-GB', options);
    }
    
    // Breaking news ticker animation
    const breakingText = document.querySelector('.breaking-text');
    if (breakingText) {
        let position = 0;
        const speed = 0.5;
        const width = breakingText.offsetWidth;
        const containerWidth = breakingText.parentElement.offsetWidth;
        
        if (width > containerWidth) {
            setInterval(() => {
                position -= speed;
                if (position < -width) {
                    position = containerWidth;
                }
                breakingText.style.transform = `translateX(${position}px)`;
            }, 20);
        }
    }
    
    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('facebook') ? 'Facebook' :
                            this.classList.contains('twitter') ? 'Twitter' :
                            this.classList.contains('email') ? 'Email' : 'other';
            
            console.log(`Share on ${platform} clicked`);
            
            // In a real implementation, this would open share dialogs
            if (platform === 'Facebook') {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
            } else if (platform === 'Twitter') {
                window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(document.title), '_blank');
            } else if (platform === 'Email') {
                window.location.href = 'mailto:?subject=' + encodeURIComponent(document.title) + '&body=' + encodeURIComponent(window.location.href);
            }
        });
    });
    
    // Video play button functionality
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mediaItem = this.closest('.media-item');
            const title = mediaItem.querySelector('h4') || mediaItem.querySelector('h5');
            
            console.log('Video play clicked:', title ? title.textContent : 'Unknown video');
            
            // In a real implementation, this would play the video
            alert('Video would play: ' + (title ? title.textContent : 'BBC Video'));
        });
    });
    
    // Sticky navigation on scroll
    const newsNav = document.querySelector('.news-nav');
    const newsNavTop = newsNav ? newsNav.offsetTop : 0;
    
    function handleScroll() {
        if (newsNav && window.scrollY > newsNavTop) {
            newsNav.classList.add('sticky');
            document.body.style.paddingTop = newsNav.offsetHeight + 'px';
        } else if (newsNav) {
            newsNav.classList.remove('sticky');
            document.body.style.paddingTop = 0;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    const topNav = document.querySelector('.top-nav');
    if (topNav && window.innerWidth < 768) {
        topNav.parentNode.insertBefore(mobileNavToggle, topNav);
        topNav.classList.add('mobile-hidden');
        
        mobileNavToggle.addEventListener('click', function() {
            topNav.classList.toggle('mobile-hidden');
            this.innerHTML = topNav.classList.contains('mobile-hidden') ? 
                '<i class="fas fa-bars"></i>' : 
                '<i class="fas fa-times"></i>';
        });
    }
    
    // Add responsive styles for mobile navigation
    if (window.innerWidth < 768) {
        const style = document.createElement('style');
        style.textContent = `
            .mobile-nav-toggle {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                display: block;
                padding: 8px;
            }
            
            .mobile-hidden {
                display: none !important;
            }
            
            .sticky {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 1000;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);
    }
});

