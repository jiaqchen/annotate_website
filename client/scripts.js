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
        method: 'POST', // or 'PUT'
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
}

