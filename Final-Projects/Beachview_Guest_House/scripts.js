document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle (applies to all pages)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close the menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Toggle dropdown on click for mobile (applies to all pages)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        if (dropdownLink && dropdownContent) {
            dropdownLink.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownContent.classList.toggle('active');
            });

            const childLinks = dropdownContent.querySelectorAll('a');
            childLinks.forEach(childLink => {
                childLink.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            });
        }
    });

    // Parallax effect (for index.html)
    if (document.querySelector('.parallax-bg')) {
        window.addEventListener('scroll', function() {
            const parallax = document.querySelector('.parallax-bg');
            let scrollPosition = window.pageYOffset;
            parallax.style.transform = 'translateY(' + (scrollPosition * 0.5) + 'px)';
        });
    }

    // Featured Images Slideshow (for gallery.html)
    if (document.querySelector('.slideshow-wrapper')) {
        let slideIndex = 0;
        showSlides();

        function showSlides() {
            const slides = document.getElementsByClassName('slide');
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            slides[slideIndex - 1].style.display = 'block';
            setTimeout(showSlides, 3000); // Change image every 3 seconds
        }
    }

    // Gallery modal functionality (for gallery.html)
    if (document.querySelector('.gallery-item') || document.querySelector('.scroll-item')) {
        window.openFullView = function(element) {
            const modal = document.getElementById('fullViewModal');
            const modalImg = document.getElementById('fullViewImage');
            const captionText = document.getElementById('imageCaption');

            modal.style.display = 'block';
            modalImg.src = element.querySelector('img').src;
            // Use the h3 from .gallery-overlay for gallery items, or span for scroll items
            const caption = element.querySelector('.gallery-overlay h3') || element.querySelector('span');
            captionText.innerHTML = caption ? caption.innerHTML : '';
        };

        window.closeFullView = function() {
            document.getElementById('fullViewModal').style.display = 'none';
        };
    }

    // Search functionality (for prices.html)
    if (document.getElementById('searchInput') && document.getElementById('searchResults')) {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        const pages = [
            { title: 'Home', url: 'index.html', description: 'Welcome to Beachview Guest House' },
            { title: 'Glasgow room', url: 'Glasgowroom.html', description: 'Two comfortable single beds' },
            { title: 'Edinburgh room', url: 'Edinburghroom.html', description: 'One luxurious double bed' },
            { title: 'Aberdeen room', url: 'Aberdeenroom.html', description: 'Flexible family arrangement ' },
            { title: 'Dundeeroom', url: 'Dundeeroom.html', description: 'One cozy single bed' },
            { title: 'Facilities', url: 'facilities.html', description: 'Our guest house facilities and amenities' },
            { title: 'Local Area', url: 'local-area.html', description: 'Discover Dornoch and surrounding areas' },
            { title: 'Prices', url: 'prices.html', description: 'Room rates and special offers' },
            { title: 'Contact', url: 'contact.html', description: 'Get in touch with us' }
        ];

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }

            const results = pages.filter(page => 
                page.title.toLowerCase().includes(query) ||
                page.description.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                const html = results.map(result => `
                    <div class="search-result-item">
                        <a href="${result.url}">${result.title}</a>
                        <p>${result.description}</p>
                    </div>
                `).join('');
                searchResults.innerHTML = html;
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
                searchResults.classList.add('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    }
});