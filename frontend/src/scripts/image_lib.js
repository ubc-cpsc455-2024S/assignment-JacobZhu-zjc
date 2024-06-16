// Given an image url, returns a Promise that fulfills with the average colour of the image
async function getBackgroundColour(imageURL) {
    let image = new Image();
    image.src = imageURL;
    image.crossOrigin = "Anonymous";

    // Wrapping the async call to image.onload in a Promise
    return new Promise((resolve, reject) => {
        // Waiting for the image to load from the external website(s) before attempting to calculate the average colour
        image.onload = async function () {
            let avgColour = getAverageColour(image);
            if (avgColour) {
                resolve(avgColour);
            } else {
                reject(avgColour);
            }
        };
    });
}

// Helper function to calculate the average colour of an image, given the corresponding HTML element
// With references from https://www.geeksforgeeks.org/how-to-find-an-average-color-of-an-image-using-javascript/
function getAverageColour(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
    let r = 0;
    let g = 0;
    let b = 0;

    const size = data.length;
    for (let i = 0; i < size; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = Math.floor(r * 4 / size);
    g = Math.floor(g * 4 / size);
    b = Math.floor(b * 4 / size);

    return {"r": r, "g": g, "b": b};
}

// Dynamically setting the colour of text, given the background colour, so that visibility is maintained
// Theshold value of 186 obtained from https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
function getTextColour(avgColour) {
    if (avgColour.r * 0.299 + avgColour.g * 0.587 + avgColour.b * 0.114 > 186) {
        return "black";
    } else {
        return "white";
    }
}

export {getBackgroundColour, getTextColour}