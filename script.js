// Select DOM elements
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const result = document.getElementById('result');

// Debounce function to limit how often the run function is called
function debounce(func, delay) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// Function to run the code
function run() {
    // Save code to localStorage
    localStorage.setItem('html_code', htmlCode.value);
    localStorage.setItem('css_code', cssCode.value);
    localStorage.setItem('js_code', jsCode.value);

    // Update the iframe content
    const iframeContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode.value}</style>
        </head>
        <body>
            ${htmlCode.value}
            <script>${jsCode.value}</script>
        </body>
        </html>
    `;

    result.srcdoc = iframeContent;
}

// Debounced run function
const debouncedRun = debounce(run, 300);

// Event listeners for code changes
htmlCode.addEventListener('input', debouncedRun);
cssCode.addEventListener('input', debouncedRun);
jsCode.addEventListener('input', debouncedRun);

// Function to load saved code from localStorage
function loadSavedCode() {
    htmlCode.value = localStorage.getItem('html_code') || '';
    cssCode.value = localStorage.getItem('css_code') || '';
    jsCode.value = localStorage.getItem('js_code') || '';
    run(); // Run the code initially to display any saved content
}

// Load saved code when the page loads
window.addEventListener('load', loadSavedCode);

// Add auto-resize functionality to textareas
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

[htmlCode, cssCode, jsCode].forEach(textarea => {
    textarea.addEventListener('input', () => autoResize(textarea));
    // Initial call to set the correct height
    autoResize(textarea);
});

// Add basic error handling
window.addEventListener('error', function(e) {
    console.error('Runtime error:', e.message);
    // You could display this error in the UI if desired
});