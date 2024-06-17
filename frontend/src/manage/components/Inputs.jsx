import "../inputForm.css";

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
			<input type="text" value={currentCard["name"]} onChange={updateName} id="new_member_name" required /><br/>
		</>
	);
};

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
			<textarea value={currentCard["description"]} onChange={updateDescription} id="new_member_description" cols="40" rows="5"></textarea><br/>
		</>
	);
};

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
			<input type="number" step="1" min="0" value={currentCard["age"]} onChange={updateAge} id="new_member_age" /><br/>
		</>
	);
};

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
			<input type="text" value={currentCard["imageLink"]} onChange={updateImageLink} id="new_member_image_link" /><br/>
		</>
	);
};

export {NameInput, DescriptionInput, AgeInput, ImageLinkInput};
