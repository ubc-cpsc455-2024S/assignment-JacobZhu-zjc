// Function for creating a teammate
async function createMember(id) {
    if (!checkValidity()) {
        return;
    }

    // Pulling data from the corresponding <input> elements
    const name = document.getElementById("new_member_name").value;
    const description = parseDescription();
    const age = parseAge();
    const image = await parseImage();

    // Creating the new teammate object and adding it to sessionStorage
    let team = JSON.parse(sessionStorage.getItem("team"));
    team["team members"].push({
        "name": name,
        "description": description.data,
        "age": age.data,
        "image": image.imageUrl,
        "avgColour": image.backgroundColour
    });
    sessionStorage.setItem("team", JSON.stringify(team));
    showTeamMembers(id);
}

// Function to check form validity before attempting to create a new teammate or update the preview
function checkValidity() {
    const form = document.getElementById('new_member_form');
    if (form.checkValidity()) {
        return true;
    } else {
        form.reportValidity();
        return false;
    }
}

// Helper function to pull description data from the HTML page and check it for validity
function parseDescription() {
    let data = document.getElementById("new_member_description").value;
    let isComplete = true;
    if (data === "") {
        data = "<em>No description provided</em>";
        isComplete = false;
    }

    return {"data": data, "isComplete": isComplete};
}

// Helper function to pull age data from the HTML page and check it for validity
function parseAge() {
    let data = document.getElementById("new_member_age").value;
    let isComplete = true;
    if (data === "") {
        data = "<em>No age provided</em>";
        isComplete = false;
    }

    return {"data": data, "isComplete": isComplete};
}

// Helper function to pull image data from the HTML page and check it for validity
async function parseImage() {
    // TODO: could send requests to determine if the URL leads to a valid image or not
    const imageUrl = document.getElementById("new_member_image_link").value;
    let backgroundColour = {"r": 255, "g": 255, "b": 255};
    let isComplete = false;
    if (imageUrl !== "") {
        backgroundColour = await getBackgroundColour(imageUrl);
        isComplete = true;
    }

    return {"imageUrl": imageUrl, "backgroundColour": backgroundColour, "isComplete": isComplete};
}

// Function to pull available data from HTML and update preview of teammate card
async function updatePreview() {
    if (!checkValidity()) {
        return;
    }

    // Pulling data from the corresponding <input> elements
    const name = document.getElementById("new_member_name").value;
    const description = parseDescription();
    const age = parseAge();
    const image = await parseImage();

    // Editing error message if any fields are incomplete
    updateErrorMessage(description.isComplete, age.isComplete, image.isComplete);

    // Preparing the div
    const container = document.getElementById("preview_div");
    const r = image.backgroundColour.r, g = image.backgroundColour.g, b = image.backgroundColour.b;
    container.setAttribute("class", "team_card");
    container.setAttribute("style", 'background-color: rgb(' + r + ',' + g + ',' + b + '); color: ' + getTextColour(image.backgroundColour) + ';')
    
    // Preparing the HTML to be added
    let previewHTML = "";
    previewHTML += "<strong>" +  name + "</strong><br><br>";
    previewHTML += description.data + "<br><br>";
    previewHTML += "Age: " + age.data + "<br><br>";
    if (image.isComplete) {
        previewHTML += "<img src=" + image.imageUrl + ">";
    } else {
        previewHTML += "<em>No image included</em>";
    }
    previewHTML += "</div>";

    container.innerHTML = previewHTML;
}

// Helper function to update the error message according to the missing fields
function updateErrorMessage(hasDescription, hasAge, hasImage) {
    // TODO: add confirmation button and queue in sessionStorage for incomplete teammmates?
    if (hasDescription && hasAge && hasImage) {
        document.getElementById("error_message").innerHTML = "";
        return;
    }
    
    let errorMessage = "<p>Note: Your team member is missing the following fields:</p>";
    errorMessage += "<ul>";
    errorMessage += (hasDescription) ? "" : "<li>Description</li>";
    errorMessage += (hasAge) ? "" : "<li>Age</li>";
    errorMessage += (hasImage) ? "" : "<li>Image Link</li>";
    errorMessage += "</ul>";
    document.getElementById("error_message").innerHTML = errorMessage;
}

// Clears the values of all the inputs
function clearInputs() {
    document.getElementById("new_member_name").value = "";
    document.getElementById("new_member_description").value = "";
    document.getElementById("new_member_age").value = "";
    document.getElementById("new_member_image_link").value = "";
    const preview = document.getElementById("preview_div");
    preview.innerHTML = "";
    preview.removeAttribute("class");
    preview.removeAttribute("style");
    document.getElementById("error_message").innerHTML = "";
}

// Empties the array of team members in sessionStorage
function deleteAll(id) {
    let team = JSON.parse(sessionStorage.getItem("team"));
    team["team members"] = [];
    sessionStorage.setItem("team", JSON.stringify(team));
    showTeamMembers(id);
}

// Restores the starting teammates in sessionStorage
async function resetSession(id) {
    sessionStorage.removeItem("team");
    await initializeTeam();
    showTeamMembers(id);
}
