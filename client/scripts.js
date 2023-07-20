// var fs = require("fs");
// module.exports = {
// 	cert: fs.readFileSync(__dirname + "../host.crt"),
// 	key: fs.readFileSync(__dirname + "../host.key"),
// 	passphrase: "12345"
// };

function getNextImage() {
    // // Get button and remove it if it exists
    // if (document.getElementById("next-image") != null) {
    //     document.getElementById("next-image").remove();
    // }

    // Change the name of "next-image" button to "Skip this GIF"
    var button = document.getElementById("next-image");
    button.innerHTML = "Skip this GIF";

    // Fetch a new image from the server using get_image
    fetch('https://129.132.245.9:5000/getimage', {
        method: 'GET'
    })
    .then(response => response.blob())
    .then(blob => {
        // Create a local URL for the image
        var imageUrl = URL.createObjectURL(blob);
        var image = document.getElementById("labeling-image");
        // Rotate the image 90 degrees clockwise before displaying
        image.style.transform = "rotate(90deg)";
        // Make gif fit in the div
        image.style.maxWidth = "100%";
        image.src = imageUrl;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function sendData() {
    // Get the text from the textarea annotation
    var text = document.getElementById("annotation").value;

    // Get the image name
    var image_src = document.getElementById("labeling-image").src;

    // Create a data object to send as JSON
    var data = { description: text,
                 image_src: image_src };

    console.log(data)

    fetch('https://129.132.245.9:5000/handledata', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // data object to send as JSON
    })
        .then(response => {
        // Handle the response from the server (if needed)
            console.log(response)
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Clear the textarea
    document.getElementById("annotation").value = "";

    // Change button contents randomly based on a list of options
    var options = ["Done! Next GIF please!", 
                   "That was easy! Next GIF please!", 
                   "I'm on a roll! Next", 
                   "Submit! You're making it too easy for me.",
                   "I'm a pro! Next GIF please!",
                   "Again! Next GIF please!",
                   "Next GIF please!",
                   "Give me a harder GIF!",
                   "Next GIF please!",
                   "Submit! MORE!",
                   "Submit! Next GIF please!",
                   "I'm going to be done in no time! Next GIF please!",
                   "I'm a labeling machine! Next GIF please!",
                   "I'm a labeling god! Next GIF please!",
                   "I can't get enonugh! Next GIF please!",
                   "You're making it too easy for me! Next GIF please!",
                   "I'm the captioning master! Next GIF please!",
                   "I'm the lord of labeling! Next GIF please!",
                   "That was fun! Next GIF please!",
                   "MOREEEEEEEE!"];
    var button = document.getElementById("submit-button");
    button.innerHTML = options[Math.floor(Math.random() * options.length)];
 
    // Get the next image
    getNextImage();
}

