import {useEffect} from 'react';
import NavBar from "../common/NavBar.jsx"
import "../common/general.css"
import "../input_form.css"
import "../common/team_display.css"

const ManagerPage = () => {
	// Setting the title of the page
	useEffect(() => {
		document.title = "Manage Teams";
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