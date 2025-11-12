let accessibilitySettings = {
    fontSize: 'normal',
    highContrast: false
};

document.addEventListener('DOMContentLoaded', function() {
    loadAccessibilitySettings();
    setupAccessibilityButtons();
    setupKeyboardNavigation();
});

function loadAccessibilitySettings() {
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
        accessibilitySettings = JSON.parse(savedSettings);
        applyAccessibilitySettings();
    }
}

function saveAccessibilitySettings() {
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
}

function applyAccessibilitySettings() {
    const html = document.documentElement;
    const body = document.body;
    
    html.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
    const fontClasses = {
        'small': 'text-sm',
        'normal': 'text-base',
        'large': 'text-lg',
        'xlarge': 'text-xl'
    };
    html.classList.add(fontClasses[accessibilitySettings.fontSize]);
    
    if (accessibilitySettings.highContrast) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }
}

function setupAccessibilityButtons() {
    const buttons = [
        { selector: '#increase-font', handler: increaseFontSize },
        { selector: '#decrease-font', handler: decreaseFontSize },
        { selector: '#high-contrast', handler: toggleHighContrast },
        { selector: '#reset-settings', handler: resetSettings }
    ];
    
    buttons.forEach(({ selector, handler }) => {
        document.querySelectorAll(selector).forEach(btn => {
            btn.addEventListener('click', handler);
        });
    });
}

function increaseFontSize() {
    const sizes = ['normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(accessibilitySettings.fontSize);
    
    if (currentIndex < sizes.length - 1) {
        accessibilitySettings.fontSize = sizes[currentIndex + 1];
        applyAccessibilitySettings();
        saveAccessibilitySettings();
    }
}

function decreaseFontSize() {
    const sizes = ['small', 'normal', 'large', 'xlarge'];
    const currentIndex = sizes.indexOf(accessibilitySettings.fontSize);
    
    if (currentIndex > 0) {
        accessibilitySettings.fontSize = sizes[currentIndex - 1];
        applyAccessibilitySettings();
        saveAccessibilitySettings();
    }
}

function toggleHighContrast() {
    accessibilitySettings.highContrast = !accessibilitySettings.highContrast;
    applyAccessibilitySettings();
    saveAccessibilitySettings();
}

function resetSettings() {
    accessibilitySettings = {
        fontSize: 'normal',
        highContrast: false
    };
    applyAccessibilitySettings();
    saveAccessibilitySettings();
}