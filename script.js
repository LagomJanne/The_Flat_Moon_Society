
const postField = document.getElementById("posts");
const inputField = document.getElementById("text");
const userField = document.getElementById("user")
const server = "http://10.155.16.244:3000"


latestArrayLength = 0


function knap() {
    console.log("fortntie");
    document.getElementById("login").style.display = "none";
}


function getText() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", `${server}/text`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        if (array.length > latestArrayLength){
            for (i = latestArrayLength; i < array.length; i++) {
                messageField.innerHTML += `<h2>${array[i][1]}</h2>`;
                messageField.innerHTML += `<p>${array[i][0]}</p>`;
            }
            latestArrayLength = array.length
        } 
    }
    xmlhttp.send();
}


function UploadPost() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        message: inputField.value,
        user: userField.value
    }));
    inputField.value = ''
}

const interval = setInterval(function() {
    getText();
}, 1000);