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
                    <h4>Start Here</h4>
                    <ul>
                        <li><a href="${pathPrefix}books.html">Books</a></li>
                        <li><a href="${pathPrefix}structural-case-review.html">Case Review</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Learn More</h4>
                    <ul>
                        <li><a href="${pathPrefix}method.html">How It Works</a></li>
                        <li><a href="${pathPrefix}about.html">About</a></li>
                        <li><a href="https://stevenrudolph.substack.com" target="_blank" rel="noopener">Articles</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Practitioners</h4>
                    <ul>
                        <li><a href="${pathPrefix}use-professionally.html">Use Professionally</a></li>
                        <li><a href="${pathPrefix}licensing.html">Licensing</a></li>
                        <li><a href="${pathPrefix}using-ai-practitioners.html">AI in Practice</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="${pathPrefix}terms.html">Terms of Service</a></li>
                        <li><a href="${pathPrefix}privacy.html">Privacy Policy</a></li>
                        <li><a href="${pathPrefix}accessibility.html">Accessibility</a></li>
                        <li><a href="${pathPrefix}ai-policy.html">AI Policy</a></li>
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

    document.body.insertAdjacentHTML('beforeend', footerHTML);
});
