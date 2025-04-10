const currentImage = document.getElementById('currentImage');
const assignedImages = document.getElementById('assignedImages');

const email = document.getElementById('email');
const submit = document.getElementById('submit');
const form = document.getElementsByTagName('form')[0];

const email_regex = new RegExp(String.raw`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`);
const url = "https://picsum.photos/256?random="

randomindex = 0;
function newCurrentImage() {
    // get size dynamically?
    randomindex += 1;
    currentImage.src = url + randomindex;
}

function validEmail() {
    if (email_regex.test(email.value)) {
        email.className = 'valid'
        email.setCustomValidity("");
        return true;
    } else {
        email.className = 'invalid'
        if (email.value == '') {
            email.setCustomValidity("Please enter an email address");
        } else {
            email.setCustomValidity("Invalid email address");
        }
        return false;
    }
}

document.getElementById('submit').addEventListener('click', () => {
    if (validEmail()) {
        // display error message
    }
});
document.getElementById('email').addEventListener('focusout', () => {
    validEmail();
});
form.addEventListener('submit', (event) =>  {
    event.preventDefault();
    assignCurrentImage(email.value);
});


function getAssignElement(email) {
    for (box of assignedImages.children) {
        const emails = box.getElementsByClassName('email');
        if (emails.length == 0) {continue;}
        if (emails[0].textContent == email) {
            assignedImages.prepend(box);
            return box;
        }
    }
    return null;
}

function assignCurrentImage(email) {
    let emailAssign = getAssignElement(email);
    if (emailAssign == null) {
        emailAssign = document.createElement('div');
        emailAssign.classList.add('box');
        assignedImages.prepend(emailAssign);
    }
    let grids = emailAssign.getElementsByClassName('img-grid');
    if (grids.length == 0) {
        emailAssign.innerHTML = `<h2 class="email">${email}</h2>
            <div class="img-grid">
            </div>`;
        grids = emailAssign.getElementsByClassName('img-grid');
    }
    const grid = grids[0];
    grid.innerHTML += `<img src=${url}${randomindex} alt />`;
    newCurrentImage();
}


newCurrentImage();

assignCurrentImage('test1');
assignCurrentImage('test1');
assignCurrentImage('test1');
assignCurrentImage('test1');
assignCurrentImage('test2');
assignCurrentImage('test2');