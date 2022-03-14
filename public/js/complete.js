

window.addEventListener('load', () => {
    console.log("hehehh");

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            console.log("changed");

            const id = e.target.id.split('-')[1];

            const url = '/tasks/' + id + '/complete';

            fetch(url, {
                method: 'POST'
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.error(error);
            })
        })
    })
})

