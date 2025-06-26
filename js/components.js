// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Execute any scripts in the loaded component
        const scripts = document.getElementById(elementId).querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.textContent = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        });
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load header component if container exists
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        await loadComponent('header-container', '/components/header.html');
    }
    
    // Load footer component if container exists
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        await loadComponent('footer-container', '/components/footer.html');
    }
    
    // Initialize theme after components are loaded
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    }
    
    // Apply animations after components are loaded
    if (typeof animatePageLoad === 'function') {
        setTimeout(animatePageLoad, 300);
    }
});