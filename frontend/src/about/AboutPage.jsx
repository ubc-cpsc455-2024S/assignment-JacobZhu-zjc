import {useEffect} from "react";
import NavBar from "../common/NavBar.jsx"
import OuterSpacer from "../common/OuterSpacer.jsx"
import "../common/general.css"

// React component for the "About Me" page
const AboutPage = () => {
	// Setting the title of the page
	useEffect(() => {
		document.title = "About Me";
	}, []);

	return (
		<>
		<NavBar />
		<OuterSpacer>
			<h1>About Me!</h1>
			<p>
				Hi! My name is Jacob, and I&apos;m currently a 3rd-year BSc. student at UBC, specializing in CPSC. I enjoy working on various projects and learning more about cool technologies available in CS! In my spare time, I enjoy watching travel videos, indoor bouldering, and juggling! You can reach me at foo@bar.com.
			</p>
			<p>
				This project is my submission for Assignment 2 of CPSC 455, which is a simple website built using React.js, and CSS. As per requirements, every page has a navbar, and loads CSS from external files. Additionally, the site is built to be responsive through the use of &lt;meta&gt; tags and media queries, as well as flex containers for displaying team member cards. Additionally, there is a JS object used initialize the starting team members, as well as list used to store team members (shared across pages using a <em>Redux state</em>). One interesting thing I tried to implement was the dynamic setting of a card&apos;s background colour, based on the average colour of the corresponding member&apos;s photo!
			</p>
		</OuterSpacer>
		</>
	);
}

export default AboutPage;