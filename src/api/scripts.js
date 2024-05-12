// Initial team initialization JSON - pictures taken from https://en.wikipedia.org/wiki/Wikipedia:Featured_pictures/Animals/Mammals
const initialTeam = `{
    "team members": [
        {
            "name": "Iberian Lynx",
            "description": "A member of one of the four extant species within the wild cat genus Lynx, endemic to the Iberian Peninsula in southwestern Europe.",
            "age": 20,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Lince_ib%C3%A9rico_%28Lynx_pardinus%29%2C_Almuradiel%2C_Ciudad_Real%2C_Espa%C3%B1a%2C_2021-12-19%2C_DD_07.jpg/1024px-Lince_ib%C3%A9rico_%28Lynx_pardinus%29%2C_Almuradiel%2C_Ciudad_Real%2C_Espa%C3%B1a%2C_2021-12-19%2C_DD_07.jpg"
        },
        {
            "name": "Black-tailed Prairie Dog",
            "description": "A rodent of the family Sciuridae found in the Great Plains of North America. Prior to habitat destruction, its species may have been the most abundant prairie dog in central North America.",
            "age": 5,
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cynomys_ludovicianus_GNP_21.jpg/1024px-Cynomys_ludovicianus_GNP_21.jpg"
        },
        {
            "name": "Red Panda",
            "description": "A small mammal native to the eastern Himalayas and southwestern China, well adapted to climbing due to its flexible joints and curved semi-retractile claws.",
            "age": 8,
            "image": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Red_Panda_%2824986761703%29.jpg"
        },
        {
            "name": "Geoffroy's Tamarin",
            "description": "A type of small monkey, found in Panama and Colombia, which eats a variety of foods, including insects, plant exudates, fruits, and other plant parts.",
            "age": 14,
            "image": "https://upload.wikimedia.org/wikipedia/commons/d/df/Geoffroy%27s_tamarin_%28Saguinus_geoffroyi%29_2.jpg"
        },
        {
            "name": "European Hedgehog",
            "description": "A member of a hedgehog species native to Europe, and a favourite in European gardens, both for its endearing appearance and its preference for eating a range of garden pests.",
            "age": 3,
            "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Erinaceus_europaeus_%28Linnaeus%2C_1758%29.jpg"
        }
    ]
}`;

let team = JSON.parse(initialTeam)["team members"];

// Showing the list of team members in a given container div, given the div id
function showTeamMembers(id) {
    const container = document.getElementById(id);
    if (container.innerHTML !== "") {
        return;
    }

    let toAdd = "";
    if (team.length === 0) { 
        toAdd += "<p>No members in team!</p>"
    } else {
        for (const member of team) {
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

// Given an image url, sets the colour of the corresponding card to the average colour of the image
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

// Hiding the list of team members in a given container div, given the div id
function hideTeamMembers(id) {
    const container = document.getElementById(id);
    container.innerHTML = "";
}
