import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import NewMemberForm from "../manage/components/NewMemberForm";
import CardPreview from "../manage/components/CardPreview";
import {updateMember} from "../redux/actions";
import "./detailedView.css";

// React component used to view a single team card in more detail, and to edit a card
const DetailedView = ({member}) => {
    const dialogPopup = useRef();
    const dispatch = useDispatch();
    const [isVisible, setVisibility] = useState(false);

    // Functions for showing and hiding the popup screen
    const showDialog = () => {
        setVisibility(true);
        dialogPopup.current.showModal();
    };

    const hideDialog = () => {
        setVisibility(false);
        dialogPopup.current.close();
    };

    // Setting the initial state of the card to be identical to the pre-existing state
	const[newCard, updateCard] = useState({
		"name": member["name"],
		"description": member["description"],
		"age": member["age"],
		"imageLink": member["imageLink"],
		"avgColour": member["avgColour"],
		"id": member["id"]
	});

    // Helper function to dispatch an action to update a given member
    const handleUpdate = () => {
        dispatch(updateMember(newCard["id"], newCard));
    };

    return (
        <>
            <button onClick={() => showDialog()}>Edit Member</button>
            <dialog ref={dialogPopup}>
                {isVisible ? <>
                    <h2>Edit Member</h2>
                    <div id="display">
                        <NewMemberForm currentCard={newCard} updateCard={updateCard} addOption={false} />
                        <CardPreview cardInfo={newCard} />
                    </div>
                    <button onClick={() => {hideDialog(); handleUpdate();}} autoFocus>Save</button>
                </> : <></>}
            </dialog>
        </>
    );
}

export default DetailedView