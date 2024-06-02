import {useEffect} from 'react';
import NavBar from "../common/NavBar.jsx"
import initializeTeam from "../scripts/setup.js"
import "../common/general.css"
import "./inputForm.css"

// React component for the team management page
const ManagerPage = () => {
	// Setting the title of the page, and initializing teams if necessary from the starter JSON string
	useEffect(() => {
		document.title = "Manage Teams";
		initializeTeam();
	}, []);

	return (
		<>
		<NavBar />
		<div>
			<h1>Manager Page</h1>
			<p>Manage your team on this page.</p>
		</div>
		</>
	);
}

export default ManagerPage;