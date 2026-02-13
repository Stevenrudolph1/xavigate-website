// Universal header for all pages
document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
    const currentPage = pathname.split('/').pop() || 'index.html';

    // Detect if we're in a subdirectory (like /books/)
    const pathPrefix = pathname.includes('/books/') ? '../' : '';

    const headerHTML = `
        <nav class="nav">
            <div class="nav-container">
                <div class="logo"><a href="${pathPrefix}index.html">Xavigate</a></div>
                <button class="nav-toggle" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links">
                    <li><a href="${pathPrefix}index.html" ${currentPage === 'index.html' ? 'class="active"' : ''}>Home</a></li>
                    <li><a href="${pathPrefix}how-it-works.html" ${currentPage === 'how-it-works.html' ? 'class="active"' : ''}>How It Works</a></li>
                    <li><a href="${pathPrefix}products.html" ${currentPage === 'products.html' ? 'class="active"' : ''}>Products</a></li>
                    <li><a href="${pathPrefix}training.html" ${currentPage === 'training.html' ? 'class="active"' : ''}>Tools</a></li>
                    <li><a href="${pathPrefix}pricing.html" ${currentPage === 'pricing.html' ? 'class="active"' : ''}>Pricing</a></li>
                    <li><a href="${pathPrefix}about.html" ${currentPage === 'about.html' ? 'class="active"' : ''}>About</a></li>
                </ul>
            </div>
        </nav>
    `;

    // Insert header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});
