// Function for creating a teammate
async function createMember() {
    // Pulling data from the corresponding <input> elements
    let hasDescription = true, hasAge = true, hasImage = false;

    const name = document.getElementById("new_member_name").value;
    if (name === "") {
        return;
    }
    let description = document.getElementById("new_member_description").value;
    if (description === "") {
        description = "<emph>No description provided</emph>";
        hasDescription = false;
    }
    let age = document.getElementById("new_member_age").value;
    if (age === "") {
        age = "<emph>No age provided</emph>";
        hasAge = false;
    }
    const imageUrl = document.getElementById("new_member_image_link").value;
    // TODO: could send requests to determine if the URL leads to a valid image or not
    let backgroundColour = {"r": 255, "g": 255, "b": 255};
    if (imageUrl !== "") {
        hasImage = true;
        backgroundColour = await getBackgroundColour(imageUrl);
    }

    // Editing error message if any fields are incomplete
    // TODO: add confirmation button and queue in sessionStorage for incomplete teammmates?
    if (!hasDescription || !hasAge || !hasImage) {
        let errorMessage = "<p>Note: Your team member was missing the following fields:</p>";
        errorMessage += "<ul>";
        errorMessage += (!hasDescription) ? "<li>Description</li>" : "";
        errorMessage += (!hasAge) ? "<li>Age</li>" : "";
        errorMessage += (!hasImage) ? "<li>Image Link</li>" : "";
        errorMessage += "</ul>";
        document.getElementById("error_message").innerHTML = errorMessage;
    }

    // Creating the new teammate object and adding it to sessionStorage
    let team = JSON.parse(sessionStorage.getItem("team"));
    team["team members"].push({
        "name": name,
        "description": description,
        "age": age,
        "image": imageUrl,
        "avgColour": backgroundColour
    });
    sessionStorage.setItem("team", JSON.stringify(team));
}
