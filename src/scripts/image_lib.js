// TODO: move the setBackgroundColour call to an onload method, and store the average colour somehow
// Showing the list of team members in a given container div, given the div id
function showTeamMembers(id) {
    const team = JSON.parse(sessionStorage.getItem("team"))["team members"];
    const container = document.getElementById(id);

    // Short-circuiting if you press "Show" multiple times in a row
    if (container.innerHTML !== "") {
        return;
    }

    let toAdd = "";
    if (team.length === 0) { 
        toAdd += "<p>No members in team!</p>"
    } else {
        for (const member of team) {
            // let r = member.avgColour.r, g = member.avgColour.g, b = member.avgColour.b;
            toAdd += '<div class="team_card">';
            toAdd += member.name + "<br><br>";
            toAdd += member.description + "<br><br>";
            toAdd += "Age: " + member.age + "<br><br>";
            toAdd += "<img src=" + member.image + ">";
            toAdd += "</div>";
            setBackgroundColour(member.image);
        }
    }

    container.innerHTML = toAdd;
}

// Hiding the list of team members in a given container div, given the div id
function hideTeamMembers(id) {
    const container = document.getElementById(id);
    container.innerHTML = "";
}

// Given an image url, sets the avgColour field of the corresponding member object in sessionStorage
function setBackgroundColour(imageURL) {
    let image = new Image();
    image.src = imageURL;
    image.crossOrigin = "Anonymous";

    let avgColour;
    let textColour;

    // Waiting for the image to load from the external website(s) before attempting to calculate the average colour
    image.onload = function () {
        avgColour = getAverageColour(image);
        textColour = getTextColour(avgColour.r, avgColour.g, avgColour.b);

        const outerDivElement = document.querySelector('img[src="' + imageURL + '"]').closest("div");
        outerDivElement.setAttribute("style", 'background-color: rgb(' + avgColour.r + ','
            + avgColour.g + ',' + avgColour.b + '); color: ' + textColour + ';');
    };
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
function getTextColour(r, g, b) {
    if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
        return "black";
    } else {
        return "white";
    }
}
