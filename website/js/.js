const currentImage = document.getElementById('currentImage');
const assignedImages = document.getElementById('assignedImages');

const email = document.getElementById('email');
const submit = document.getElementById('submit');
const form = document.getElementById('newForm');

const select = document.getElementById('selectEmail');

const email_regex = new RegExp(String.raw`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`);
const url = "https://picsum.photos/512?random="

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

submit.addEventListener('click', () => {
    if (!validEmail()) {
        // display error message?
    }
});
email.addEventListener('focusout', () => {
    validEmail();
});
form.addEventListener('submit', (event) =>  {
    event.preventDefault();
    assignCurrentImage(email.value);
});

class EmailGrid {
    constructor(email, firstImage) {
        this.email = email;
        this.images = [];
        const selectOption = document.createElement('option');
        selectOption.value = this.email;
        selectOption.textContent = this.email;
        select.append(selectOption);
        this.element = document.createElement('div');
        this.element.classList.add('box');
        this.element.innerHTML = `<h3>Images for: <code>${email}</code>.</h3>
            <div class="img-grid"></div>`;
        if (firstImage) {
            this.addImage(firstImage);
        }
    }
    addImage(image) {
        this.images.unshift(image);
        const grid = this.element.getElementsByClassName('img-grid')[0];
        grid.innerHTML = `<img src=${url}${image} alt />` + grid.innerHTML;
    }
}

const emailGrids = [];
let selectedEmail = '';

function getEmailObject(email) {
    for (eg of emailGrids) {
        if (eg.email == email) {
            return eg;
        }
    }
    return null;
}

function assignCurrentImage(email) {
    let emailAssign = getEmailObject(email);
    if (emailAssign == null) {
        emailAssign = new EmailGrid(email, randomindex);
        emailGrids.unshift(emailAssign)
        if (selectedEmail != '' || emailGrids.length == 1) {
            setActiveEmail(email);
        } else {
            // need to update all-display to include new email
            setAllEmail();
        }
    } else {
        emailAssign.addImage(randomindex);
        emailGrids.splice(emailGrids.indexOf(emailAssign), 1);
        emailGrids.unshift(emailAssign);
        if (selectedEmail != '') {
            setActiveEmail(email);
        }
    }
    newCurrentImage();
}

function setActiveEmail(email) {
    if (email == selectedEmail) {return;}
    selectedEmail = email;
    select.value = email;
    if (email == '') {return setAllEmail();}
    const eg = getEmailObject(email);

    assignedImages.innerHTML = '';
    assignedImages.appendChild(eg.element);
}
function setAllEmail() {
    assignedImages.innerHTML = '';
    for (eg of emailGrids) {
        assignedImages.appendChild(eg.element);
    }

}

select.addEventListener('change', () => {
    setActiveEmail(select.value);
})

select.innerHTML = '<option value="">all</option>';
newCurrentImage();

// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test2');
// assignCurrentImage('test2');