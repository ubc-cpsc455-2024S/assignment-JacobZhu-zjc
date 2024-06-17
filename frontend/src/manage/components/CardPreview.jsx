import {TeamCard} from "../../components/TeamDisplay";
import {checkValidity} from "./scripts";
import "../inputForm.css";

// React component for the div used to display card previews
const CardPreview = ({cardInfo}) => {
	// Helper function to check if the preview should be displayed
	const shouldDisplay = () => {
		const hasDescription = cardInfo["description"] !== "";
		const hasAge = cardInfo["age"] !== "";
		const hasImage = cardInfo["imageLink"] !== "";

		// Base case, if all fields are completed
		if (checkValidity() || hasDescription || hasAge || hasImage) {
			return true;
		}
		return false;
	}

	return (
		<div className="right_div">
			<h3>Card Preview:</h3>
			{shouldDisplay() ? (<TeamCard member={cardInfo} addDelete={false} index={undefined} />) : (<></>)}
		</div>
	);
};

export default CardPreview;
