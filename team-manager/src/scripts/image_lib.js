// Showing the list of team members in a given container div, given the div id
function showTeamMembers(id) {
    const team = JSON.parse(sessionStorage.getItem("team"))["team members"];
    const container = document.getElementById(id);

    // Default case if there are no members in a team
    let toAdd = "";
    if (team.length === 0) { 
        toAdd += "<p>No members in team!</p>"
        container.innerHTML = toAdd;
        return;
    }

    for (const member of team) {
        let r = member.avgColour.r, g = member.avgColour.g, b = member.avgColour.b;
        toAdd += '<div class="team_card" style="background-color: rgb(' + r + ',' + g + ',' + b + '); color: ' + getTextColour(member.avgColour) + ';">';
        toAdd += "<strong>" + member.name + "</strong><p>";
        toAdd += member.description + "</p><br>";
        toAdd += "Age: " + member.age + "<br><br>";
        if (member.image !== "") {
            toAdd += "<img src=" + member.image + ">";
        } else {
            toAdd += "<em>No image included</em>";
        }
        toAdd += "</div>";
    }

    container.innerHTML = toAdd;

    // Adding delete buttons to each card in the 'manage' screen
    if (id === "manage_display") {
        addDeleteButtons(id);
    }
}

// Hiding the list of team members in a given container div, given the div id
function hideTeamMembers(id) {
    const container = document.getElementById(id);
    container.innerHTML = "";
}

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

// Function to add delete buttons to each card in the given container div
function addDeleteButtons(id) {
    const container = document.getElementById(id);
    const teamCards = container.children;

    // Inserting the HTML for the button into each card
    for (let i = 0; i < teamCards.length; i++) {
        const buttonHTML = '<button class="delete_card_button" onclick="deleteCard(' + i + `, '` + id + `')" id="` + i + '">&#x2715</button>';
        teamCards[i].innerHTML = buttonHTML + teamCards[i].innerHTML;
    }
}

export {showTeamMembers, hideTeamMembers, getBackgroundColour, getTextColour}