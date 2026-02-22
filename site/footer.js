// Universal footer for all pages
document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;
    const inSubdir = pathname.includes('/books/') || pathname.includes('/training/');
    const pathPrefix = inSubdir ? '../' : '';

    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <h4>Products</h4>
                    <ul>
                        <li><a href="${pathPrefix}products.html#area-renergence">Renergence</a></li>
                        <li><a href="${pathPrefix}products.html#area-structure">Structure</a></li>
                        <li><a href="${pathPrefix}products.html#area-alignment">Alignment</a></li>
                        <li><a href="${pathPrefix}products.html#area-positioning">Positioning</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Learn</h4>
                    <ul>
                        <li><a href="${pathPrefix}how-it-works.html">How It Works</a></li>
                        <li><a href="${pathPrefix}frameworks.html">Frameworks</a></li>
                        <li><a href="${pathPrefix}tools.html">Tools</a></li>
                        <li><a href="${pathPrefix}using-ai.html">Using AI</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>For Practitioners</h4>
                    <ul>
                        <li><a href="${pathPrefix}licensing.html">Licensing</a></li>
                        <li><a href="${pathPrefix}training.html">Training</a></li>
                        <li><a href="${pathPrefix}using-ai-practitioners.html">AI in Practice</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Renergence</h4>
                    <ul>
                        <li><a href="${pathPrefix}about.html">About</a></li>
                        <li><a href="${pathPrefix}ai-policy.html">AI Policy</a></li>
                        <li><a href="${pathPrefix}terms.html">Terms of Service</a></li>
                        <li><a href="${pathPrefix}privacy.html">Privacy Policy</a></li>
                        <li><a href="${pathPrefix}accessibility.html">Accessibility</a></li>
                        <li><a href="${pathPrefix}articles.html">Articles</a></li>
                        <li><a href="${pathPrefix}contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Multiple Natures International. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;

    // Insert footer before the closing body tag (after last content)
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
