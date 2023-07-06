function getNextImage() {
    // Get button and remove it if it exists
    if (document.getElementById("next-image") != null) {
        document.getElementById("next-image").remove();
    }

    // Get another image from local folder for labeling-image
    var image = document.getElementById("labeling-image");

    // 
    image.src = "/home/julia/Documents/h_coarse_loc/data/3DSSG/3RScan/" + Math.floor(Math.random() * 10) + ".gif";

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

    fetch('http://127.0.0.1:5000/annotateme', {
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
    var options = ["Done! Next GIF please!", "That was easy! Next GIF please!", "I'm on a roll! Next"];

    // Get the next image
    getNextImage();
}

