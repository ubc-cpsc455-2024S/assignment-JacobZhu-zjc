import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import NavBar from "../components/NavBar.jsx"
import OuterSpacer from "../components/OuterSpacer.jsx";
import TeamDisplay from "../components/TeamDisplay.jsx";
import CardPreview from "./components/CardPreview.jsx";
import NewMemberForm from "./components/NewMemberForm.jsx";
import {getBackgroundColour} from "../scripts/image_lib.js";
import {emptyTeam, resetTeam} from "../redux/actions.js";
import "../components/general.css"
import "./inputForm.css"

// React component for the team management page
const ManagerPage = () => {
	const dispatch = useDispatch();

	// Setting the title of the page
	useEffect(() => {
		document.title = "Manage Teams";
	}, []);

	// Setting the card display to initially be non-visible
	const [cardsVisible, setVisibility] = useState(false);

	// Setting the new card to be created to initially be blank
	const[newCard, updateCard] = useState({
		"name": "",
		"description": "",
		"age": "",
		"imageLink": "",
		"avgColour": {"r": 255, "g": 255, "b": 255},
		"id": "-1"
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
			<button onClick={() => dispatch(resetTeam())} className="delete_button">Reset session data</button>
			<button onClick={() => dispatch(emptyTeam())} className="delete_button">Delete all team members</button>
			{<TeamDisplay cardsVisible={cardsVisible} addDeleteButtons={true}/>}
		</OuterSpacer>
		</>
	);
}

export default ManagerPage;
