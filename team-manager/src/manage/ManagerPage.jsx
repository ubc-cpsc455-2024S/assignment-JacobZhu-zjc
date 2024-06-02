import {useEffect, useState} from 'react';
import NavBar from "../common/NavBar.jsx"
import OuterSpacer from '../common/OuterSpacer.jsx';
import TeamDisplay, { TeamCard } from '../common/TeamDisplay.jsx';
import initializeTeam from "../scripts/setup.js"
import {getBackgroundColour} from '../scripts/image_lib.js';
import "../common/general.css"
import "./inputForm.css"

// React component for the team management page
const ManagerPage = () => {
	// Setting the title of the page, and initializing teams if necessary from the starter JSON string
	useEffect(() => {
		document.title = "Manage Teams";
		initializeTeam();
	}, []);

	// Setting the card display to initially be non-visible
	const [cardsVisible, setVisibility] = useState(false);

	// Setting the new card to be created to initially be blank
	const[newCard, updateCard] = useState({
		"name": "",
		"description": "",
		"age": "",
		"imageLink": "",
		"avgColour": {"r": 255, "g": 255, "b": 255}
	});

	// Asynchronously updating the average colour field of the card when the image link is changed
	useEffect(() => {
		const updateAvgColour = async () => {
			let backgroundColour;
			if (newCard.imageLink !== "") {
				backgroundColour = await getBackgroundColour(newCard.imageLink);
			} else {
				backgroundColour = {"r": 255, "g": 255, "b": 255};
			}

			updateCard((currentCard) => {
				return {
					...currentCard,
					"avgColour": backgroundColour
				}
			})
		}
		updateAvgColour();
	}, [newCard.imageLink]);

	// Helper function to empty the array of team members in sessionStorage
	const deleteAll = () => {
		let team = JSON.parse(sessionStorage.getItem("team"));
		team["team members"] = [];
		sessionStorage.setItem("team", JSON.stringify(team));
	}

	// Helper function to restore the starting teammates in sessionStorage
	const resetSession = async () => {
		sessionStorage.removeItem("team");
		await initializeTeam();
	}

	return (
		<>
		<NavBar />
		<OuterSpacer>
			<h1>Manage Teams</h1>

			<div id="menu">
				<NewMemberForm currentCard={newCard} updateCard={updateCard} />
				<CardPreview cardInfo={newCard} />
			</div>

			<button onClick={() => {setVisibility(true)}}>Show</button>
			<button onClick={() => {setVisibility(false)}}>Hide</button>
			<button onClick={() => resetSession()} className="delete_button">Reset session data</button>
			<button onClick={() => deleteAll()} className="delete_button">Delete all team members</button>
			{<TeamDisplay cardsVisible={cardsVisible} addDeleteButtons={true}/>}
		</OuterSpacer>
		</>
	);
}

// React component for the form used to create new team members
const NewMemberForm = ({currentCard, updateCard}) => {
	// Helper function to reset the values of all the inputs
	const clearInputs = () => {
		updateCard({
			"name": "",
			"description": "",
			"age": "",
			"imageLink": "",
			"avgColour": {"r": 255, "g": 255, "b": 255}
		});

		const preview = document.getElementById("preview_div");
		preview.innerHTML = "";
		preview.removeAttribute("class");
		preview.removeAttribute("style");
		
		document.getElementById("error_message").innerHTML = "";
	}

	// Helper function to create a new team member
	const createMember = async () => {
		if (!checkValidity()) {
			return;
		}
	
		// Creating the new teammate object and adding it to sessionStorage
		let team = JSON.parse(sessionStorage.getItem("team"));
		team["team members"].push(currentCard);
		sessionStorage.setItem("team", JSON.stringify(team));
		clearInputs();
	}

	return (
		<div className="left_div">
			<h3>Add a New Team Member!</h3>
                <form id="new_member_form">
                    <NameInput currentCard={currentCard} updateCard={updateCard} />
					<DescriptionInput currentCard={currentCard} updateCard={updateCard} />
                    <AgeInput currentCard={currentCard} updateCard={updateCard} />
                    <ImageLinkInput currentCard={currentCard} updateCard={updateCard} />
                    <input type="button" value="Add Member" onClick={() => createMember()} />
                    <input type="button" value="Clear" onClick={() => clearInputs()} /><br/>
                </form>
                <ErrorMessage currentCard={currentCard} />
		</div>
	);
}

// React component for an error message indicating which fields are missing
const ErrorMessage = ({currentCard}) => {
	// TODO: add confirmation button and queue in sessionStorage for incomplete teammmates?
	const hasDescription = currentCard["description"] !== "";
	const hasAge = currentCard["age"] !== "";
	const hasImage = currentCard["imageLink"] !== "";

	// Base case, if all fields are completed
	if (hasDescription && hasAge && hasImage) {
        return (<div id="error_message"></div>);
    }

	return (
		<div id="error_message">
			<ul>
				{hasDescription ? <></> : <li>Description</li>}
				{hasAge ? <></> : <li>Age</li>}
				{hasImage ? <></> : <li>Image Link</li>}
			</ul>
		</div>
	);
}

// React component for an input for a name
const NameInput = ({currentCard, updateCard}) => {
	// Helper function to pull name data from the form
	const updateName = (e) => updateCard({
		...currentCard,
		"name": e.target.value
	});

	return (
		<>
			<label htmlFor="new_member_name">Name:</label><br/>
			<input type="text" value={currentCard["name"]} onChange={updateName} required /><br/>
		</>
	);
}

// React component for an input for a description
const DescriptionInput = ({currentCard, updateCard}) => {
	// Helper function to pull description data from the form and check it for validity
	const updateDescription = (e) => updateCard(() => {
		const data = e.target.value;
		return {
			...currentCard,
			"description": (data !== "") ? data : <em>No description provided</em>
		}
	});

	return (
		<>
			<label htmlFor="new_member_description">Description:</label><br/>
			<textarea value={currentCard["description"]} onChange={updateDescription} cols="40" rows="5"></textarea><br/>
		</>
	);
}

// React component for an input for a member age
const AgeInput = ({currentCard, updateCard}) => {
	// Helper function to pull age data from the form and check it for validity
	const updateAge = (e) => updateCard(() => {
		const data = e.target.value;
		return {
			...currentCard,
			"age": (data !== "") ? data : <em>No age provided</em>
		}
	});

	return (
		<>
			<label htmlFor="new_member_age">Age:</label><br/>
			<input type="number" step="1" min="0" value={currentCard["age"]} onChange={updateAge} /><br/>
		</>
	);
}

// React component for an input for a member image link
const ImageLinkInput = ({currentCard, updateCard}) => {
	// Helper function to pull image data from the form and check it for validity
	const updateImageLink = (e) => updateCard({
		// TODO: could send requests to determine if the URL leads to a valid image or not
		...currentCard,
		"imageLink": e.target.value
	});

	return (
		<>
			<label htmlFor="new_member_image_link">Image Link:</label><br/>
			<input type="text" value={currentCard["imageLink"]} onChange={updateImageLink} /><br/>
		</>
	);
}

// React component for the div used to display card previews
const CardPreview = ({cardInfo}) => {
	return (
		<div className="right_div">
			<h3>Card Preview:</h3>
			{checkValidity() ? (<TeamCard member={cardInfo} addDelete={false} index={undefined} />) : (<></>)}
		</div>
	);
}

// Function to check form validity before attempting to create a new teammate or update the preview
const checkValidity = () => {
	const form = document.getElementById('new_member_form');
	if (!form) {
		return false;
	} else if (form.checkValidity()) {
        return true;
    } else {
        form.reportValidity();
        return false;
    }
}

export default ManagerPage;