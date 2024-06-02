import {useEffect, useState} from 'react';
import NavBar from "../common/NavBar.jsx"
import OuterSpacer from "../common/OuterSpacer.jsx";
import TeamDisplay from "../common/TeamDisplay.jsx"
import initializeTeam from "../scripts/setup.js"
import "../common/general.css"
import { Link } from 'react-router-dom';

// React component for the homepage
const HomePage = () => {
	// Setting the title of the page, and initializing teams from the starter JSON string
	useEffect(() => {
		document.title = "HomePage";
        initializeTeam();
	}, []);

	// Setting the card display to initially be non-visible
	const [cardsVisible, setVisibility] = useState(false);

	return (
		<>
		<NavBar />
		<OuterSpacer>
			<h1>Team Builder</h1>
			<p>
				Welcome to my implementation for Assignment 2 of CPSC 455! This webpage is a quick tool for building teams for sports or trading-card games, with the main editing functionality located on the <Link to="./manage/">Manage Teams</Link> page. Displayed below is your current team! Assuming you have not visited the site before, this would be comprised of a pre-loaded set of team members, for which I have chosen several animals with corresponding photos from Wikipedia (used with a Creactive Commons licence).
			</p>

			<h3>Your Team:</h3>
			<button onClick={() => {setVisibility(true)}}>Show</button>
			<button onClick={() => {setVisibility(false)}}>Hide</button>
			{<TeamDisplay cardsVisible={cardsVisible} addDeleteButtons={false}/>}
		</OuterSpacer>
		</>
	);
}

export default HomePage;