function insertMarkdown(textarea, prefix, suffix) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = textarea.value.substring(start, end);
    const newText = prefix + selected + suffix;

    textarea.setRangeText(newText, start, end, 'end');
    textarea.focus();

    const event = new Event('input', { bubbles: true });
    textarea.dispatchEvent(event);

    const hiddenInput = textarea.nextElementSibling;
    if (hiddenInput && hiddenInput.tagName === 'INPUT') {
        hiddenInput.value = textarea.value;
        hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

function createToolbar(textarea) {
    const toolbar = document.createElement('div');
    toolbar.id = 'steemit-toolbar';

    const buttons = [
        { label: "Bold", prefix: "**", suffix: "**", tooltip: "Bold (Ctrl+B)" },
        { label: "Italic", prefix: "_", suffix: "_", tooltip: "Italic (Ctrl+I)" },
        { label: "Strikethrough", prefix: "~~", suffix: "~~", tooltip: "Strikethrough (Alt+S)" },
        { label: "Link", prefix: "[", suffix: "](url)", tooltip: "Insert Link (Ctrl+L)" },
        { label: "Image", prefix: "![", suffix: "](url)", tooltip: "Insert Image (Ctrl+I)" },
        { label: "Code", prefix: "", suffix: "", tooltip: "Inline Code (Ctrl+K)" },
        { label: "Code Block", prefix: "\n", suffix: "\n", tooltip: "Code Block (Ctrl+Shift+C)" },
        { label: "Header 1", prefix: "# ", suffix: "", tooltip: "Header 1 (Ctrl+1)" },
        { label: "Header 2", prefix: "## ", suffix: "", tooltip: "Header 2 (Ctrl+2)" },
        { label: "Header 3", prefix: "### ", suffix: "", tooltip: "Header 3 (Ctrl+3)" },
        { label: "Ordered List", prefix: "1. ", suffix: "", tooltip: "Ordered List (Ctrl+Shift+O)" },
        { label: "Unordered List", prefix: "- ", suffix: "", tooltip: "Unordered List (Ctrl+Shift+U)" },
        { label: "Quote", prefix: "> ", suffix: "", tooltip: "Quote (Ctrl+Q)" }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.innerText = btn.label;
        button.setAttribute('data-tooltip', btn.tooltip);  // Tooltip ekle
        button.addEventListener('click', () => {
            console.log(btn.label);
            insertMarkdown(textarea, btn.prefix, btn.suffix);
        });
        toolbar.appendChild(button);
    });

    textarea.parentNode.insertBefore(toolbar, textarea);
}

const observer = new MutationObserver(() => {
    const textarea = document.querySelector('textarea[name="body"]');
    if (textarea && !document.getElementById('steemit-toolbar')) {
        createToolbar(textarea);

        if (!textarea.nextElementSibling || textarea.nextElementSibling.tagName !== 'INPUT') {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            textarea.parentNode.insertBefore(hiddenInput, textarea.nextSibling);
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
    const textarea = document.querySelector('textarea[name="body"]');
    if (textarea && !document.getElementById('steemit-toolbar')) {
        createToolbar(textarea);

        if (!textarea.nextElementSibling || textarea.nextElementSibling.tagName !== 'INPUT') {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            textarea.parentNode.insertBefore(hiddenInput, textarea.nextSibling);
        }
    }
});