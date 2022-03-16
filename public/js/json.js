function jsonFormat() {
    if (window.location.href.includes('?')) {
        window.location.search += '&json=true';
    } else {
        window.location.search += '?json=true';
    }
}