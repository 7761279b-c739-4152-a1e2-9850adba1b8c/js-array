const currentImage = document.getElementById('currentImage');
const assignedImages = document.getElementById('assignedImages');

const email = document.getElementById('email');
const submit = document.getElementById('submit');
const form = document.getElementsByTagName('form')[0];

const email_regex = new RegExp(String.raw`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`);

randomindex = 0;
function newCurrentImage() {
    // get size dynamically?
    randomindex += 1;
    currentImage.src = `https://picsum.photos/256?random=${randomindex}`;
    currentImage.i = randomindex;
}

function invalidEmail() {
    if (email_regex.test(email.value)) {
        email.className = 'valid'
        email.setCustomValidity("");
        return true;
    } else {
        email.className = 'invalid'
        if (email.value == '') {
            email.setCustomValidity("Email address is required");
        } else {
            email.setCustomValidity("Invalid email address");
        }
        return false;
    }
}

document.getElementById('submit').addEventListener('click', () => {
    if (invalidEmail()) {
        // display error message
    }
});
document.getElementById('email').addEventListener('focusout', () => {
    invalidEmail();
});
form.addEventListener('submit', (event) =>  {
    event.preventDefault();
    assignCurrentImage(email.value);
});


function assignCurrentImage(email) {
}


newCurrentImage();