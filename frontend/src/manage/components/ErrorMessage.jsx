import "../inputForm.css";

// React component for an error message indicating which fields are missing
const ErrorMessage = ({currentCard}) => {
	// TODO: add confirmation button and queue in Redux state for incomplete teammmates?
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
};

export default ErrorMessage;
