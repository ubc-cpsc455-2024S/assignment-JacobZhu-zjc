// Function to check form validity before attempting to create a new teammate
async function attemptAdd(id) {
    const form = document.getElementById('new_member_form');
    if (form.checkValidity()) {
        createMember('manage_display');
    } else {
        form.reportValidity();
    }
}

// Function for creating a teammate
async function createMember(id) {
    // Pulling data from the corresponding <input> elements
    const name = document.getElementById("new_member_name").value;
    const description = parseDescription();
    const age = parseAge();
    const image = await parseImage();

    // Editing error message if any fields are incomplete
    // TODO: add confirmation button and queue in sessionStorage for incomplete teammmates?
    if (!description.isComplete || !age.isComplete || !image.isComplete) {
        let errorMessage = "<p>Note: Your team member was missing the following fields:</p>";
        errorMessage += "<ul>";
        errorMessage += (!description.isComplete) ? "<li>Description</li>" : "";
        errorMessage += (!age.isComplete) ? "<li>Age</li>" : "";
        errorMessage += (!image.isComplete) ? "<li>Image Link</li>" : "";
        errorMessage += "</ul>";
        document.getElementById("error_message").innerHTML = errorMessage;
    }

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

// Clears the values of all the inputs
function clearInputs() {
    document.getElementById("new_member_name").value = "";
    document.getElementById("new_member_description").value = "";
    document.getElementById("new_member_age").value = "";
    document.getElementById("new_member_image_link").value = "";
}

// Empties the array of team members in sessionStorage
function deleteAll(id) {
    let team = JSON.parse(sessionStorage.getItem("team"));
    team["team members"] = [];
    sessionStorage.setItem("team", JSON.stringify(team));
    showTeamMembers(id);
}

// Restores the starting teammates in sessionStorage
function resetSession() {
    sessionStorage.removeItem("team");
    initializeTeam();
}
