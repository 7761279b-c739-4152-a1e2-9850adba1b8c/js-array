const currentImage = document.getElementById('currentImage');
const assignedImages = document.getElementById('assignedImages');
const assignedWrapper = document.getElementById('assignedWrapper');

const email = document.getElementById('email');
const submit = document.getElementById('submit');
const assignForm = document.getElementById('assignForm');

const imageForm = document.getElementById('imageForm');
const nextbutton = document.getElementById('reroll');
const prevbutton = document.getElementById('previous');
prevbutton.style.opacity = "0";

const select = document.getElementById('selectEmail');

const email_regex = new RegExp(String.raw`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`);
const url = "https://picsum.photos/512?random="

randomindex = 0;
maxrandomindex = 0;
function newCurrentImage() {
    // get size dynamically?
    randomindex += 1;
    currentImage.src = url + randomindex;
    if (maxrandomindex <= randomindex) {
        maxrandomindex = randomindex;
        nextbutton.textContent = "Choose new image";
    }
    if (maxrandomindex > 1) {
        // first reroll after initial image
        prevbutton.style.opacity = "";
    }
}
function previousImage() {
    randomindex -= 1;
    currentImage.src = url + randomindex;
    nextbutton.textContent = "Next image";
}

function validEmail() {
    if (email_regex.test(email.value)) {
        email.className = 'valid'
        email.setCustomValidity("");
        return true;
    } else {
        email.className = 'invalid';
        if (email.value == '') {
            email.setCustomValidity("Please enter an email address");
        } else {
            email.setCustomValidity("Invalid email address");
        }
        return false;
    }
}
function formatEmail(email_value) {
    // email domains are case insensitive, so always use lower case. However, we cannot assume the host uses a case-insensitive local part.
    const email_parts = email_value.split('@');
    email_parts[email_parts.length - 1] = email_parts[email_parts.length - 1].toLowerCase();
    return email_parts.join('@');
}
function validSubmit() {
    // check the submission isn't a duplicate
    const emailAssign = getEmailObject(formatEmail(email.value));
    console.log(emailAssign);
    if (emailAssign == null || !emailAssign.contains(randomindex)) {
        return true;
    }
    console.log('invalid');
    email.className = 'invalid';
    email.setCustomValidity("Image is already assigned to that email");
    return false;
}

submit.addEventListener('click', () => {
    if (!validEmail() || !validSubmit()) {
        // display error message?
    }
});
email.addEventListener('focusout', () => {
    validEmail();
});
assignForm.addEventListener('submit', (event) =>  {
    event.preventDefault();
    assignCurrentImage(formatEmail(email.value));
});

imageForm.addEventListener('submit', (event) =>  {
    event.preventDefault();
    if (event.submitter.value == 'new') {
        newCurrentImage();
    } else if (randomindex > 1) {
        previousImage();
    }
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
        this.element.innerHTML = `<h3>Images for: <code>${this.email}</code>.</h3>
            <div class="img-grid"></div>`;
        if (firstImage) {
            this.addImage(firstImage);
        }
    }
    addImage(image) {
        if (this.images.includes(image)) {return;}
        this.images.unshift(image);
        const grid = this.element.getElementsByClassName('img-grid')[0];
        grid.innerHTML = `<img src=${url}${image} alt />` + grid.innerHTML;
    }
    contains(image) {
        return this.images.includes(image);
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
        assignedWrapper.style.display = "block";
    } else {
        emailAssign.addImage(randomindex);
        emailGrids.splice(emailGrids.indexOf(emailAssign), 1);
        emailGrids.unshift(emailAssign);
        if (selectedEmail != '') {
            setActiveEmail(email);
        }
    }
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

select.innerHTML = '<option value="">All Emails</option>';
newCurrentImage();

// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test1');
// assignCurrentImage('test2');
// assignCurrentImage('test2');