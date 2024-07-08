import {useDispatch} from "react-redux";
import ErrorMessage from "./ErrorMessage.jsx";
import {NameInput, DescriptionInput, AgeInput, ImageLinkInput} from "./Inputs.jsx";
import {checkValidity} from "./scripts.js";
import {addMember, fetchMembers} from "../../redux/actions";
import "../inputForm.css";

// React component for the form used to create new team members
const NewMemberForm = ({currentCard, updateCard, addOption}) => {
	const dispatch = useDispatch();

	// Helper function to reset the values of all the inputs
	const clearInputs = () => {
		updateCard({
			"name": "",
			"description": "",
			"age": "",
			"imageLink": "",
			"avgColour": {"r": 255, "g": 255, "b": 255}
		});
	}

	// Helper function to create a new team member
	const createMember = async () => {
		if (!checkValidity()) {
			return;
		}
	
		// Creating the new teammate object and adding it to Redux state
		await dispatch(addMember(currentCard));
		await dispatch(fetchMembers());
		clearInputs();
	}

	return (
		<div className="left_div">
			<h3>Add a New Team Member!</h3>
                <form className="new_member_form">
                    <NameInput currentCard={currentCard} updateCard={updateCard} />
					<DescriptionInput currentCard={currentCard} updateCard={updateCard} />
                    <AgeInput currentCard={currentCard} updateCard={updateCard} />
                    <ImageLinkInput currentCard={currentCard} updateCard={updateCard} />
                    {addOption ? <input type="button" value="Add Member" onClick={() => createMember()} /> : <></>}
                    <input type="button" value="Clear" onClick={() => clearInputs()} /><br/>
                </form>
                <ErrorMessage currentCard={currentCard} />
		</div>
	);
};

export default NewMemberForm;
