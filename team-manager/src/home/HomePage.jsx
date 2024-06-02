import {useEffect} from 'react';
import NavBar from "../common/NavBar.jsx"
import OuterSpacer from "../common/OuterSpacer.jsx";
import "../common/general.css"
import "../common/team_display.css"

const HomePage = () => {
	// Setting the title of the page
	useEffect(() => {
		document.title = "Homepage";
	}, []);

	return (
		<>
		<NavBar />
		<OuterSpacer>
			<h1>Team Builder</h1>
			<p>
				Welcome to my implementation for Assignment 1 of CPSC 455! This webpage is a quick tool for building teams for sports or trading-card games, with the main editing functionality located on the <a href="./manage.html">Manage Teams</a> page. Displayed below is your current team! Assuming you have not visited the site before, this would be comprised of a pre-loaded set of team members, for which I have chosen several animals with corresponding photos from Wikipedia (used with a Creactive Commons licence).
			</p>

			<h3>Your Team:</h3>

		</OuterSpacer>
		</>
	);
}

export default HomePage;