let button = document.getElementById('btn')

window.onscroll = function () {
    if (document.documentElement.scrollTop > 700) {
        button.style.display = 'block'
    } else {
        button.style.display = 'none'
    }
}
button.addEventListener('click', () => {
    document.documentElement.scrollTop = 0
})
// ---------------------------
let button2 = document.getElementById('btn2')
button2.addEventListener('click', () => {

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let message = document.getElementById('mess').value.trim();
    let text = document.getElementById('text')

    text.style.display = 'none'
    let hasErroe = false

    if (!name && !email && !message) {
        text.style.display = 'block'
        text.innerHTML = 'please complete the form'
        hasErroe = true
    }
    if (!name) {
        text.style.display = 'block'
        text.innerHTML = 'please enter your name'
        hasErroe = true
    }
    // ============
    if (email === '') {
        text.style.display = 'block'
        text.innerHTML = 'please enter your email address'
        hasErroe = true
    } else if (!email.includes('@') || !email.includes('.com')) {
        text.style.display = 'block'
        text.innerHTML = '" Email must contain "@" and ".com'
        hasErroe = true
    }
    // ===========
    if (!email.includes('@')) {
        text.style.display = 'block'
        text.innerHTML = '"@" Email must contain'
        hasErroe = true
    } else if (!email.includes('.com')) {
        text.style.display = 'block'
        text.innerHTML = '".com" Email must contain'
        hasErroe = true
    }
    // ============
    if (!message){
        text.style.display = 'block'
        text.innerHTML = 'Message must contain'
        hasErroe = true
    }
    if (message.length > 20) {
        text.style.display = 'block'
        text.innerHTML = 'Message must be at least 20 characters'
    }

    if (hasErroe) {
        return
    }
        alert('Form submitted successfully!');
        text.style.display = 'none';
})