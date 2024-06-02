// import {getTextColour} from "./image_lib";

// // Function to pull available data from HTML and update preview of teammate card
// async function updatePreview() {
//     if (!checkValidity()) {
//         return;
//     }

//     // Pulling data from the corresponding <input> elements
//     const name = document.getElementById("new_member_name").value;
//     const description = parseDescription();
//     const age = parseAge();
//     const image = await parseImage();

//     // Editing error message if any fields are incomplete
//     updateErrorMessage(description.isComplete, age.isComplete, image.isComplete);

//     // Preparing the div
//     const container = document.getElementById("preview_div");
//     const r = image.backgroundColour.r, g = image.backgroundColour.g, b = image.backgroundColour.b;
//     container.setAttribute("class", "team_card");
//     container.setAttribute("style", 'background-color: rgb(' + r + ',' + g + ',' + b + '); color: ' + getTextColour(image.backgroundColour) + ';')
    
//     // Preparing the HTML to be added
//     let previewHTML = "";
//     previewHTML += "<strong>" +  name + "</strong><br><br>";
//     previewHTML += description.data + "<br><br>";
//     previewHTML += "Age: " + age.data + "<br><br>";
//     if (image.isComplete) {
//         previewHTML += "<img src=" + image.imageUrl + ">";
//     } else {
//         previewHTML += "<em>No image included</em>";
//     }
//     previewHTML += "</div>";

//     container.innerHTML = previewHTML;
// }

// export {updatePreview}