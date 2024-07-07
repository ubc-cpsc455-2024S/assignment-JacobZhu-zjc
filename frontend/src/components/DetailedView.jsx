import {useRef, useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import NewMemberForm from "../manage/components/NewMemberForm";
import CardPreview from "../manage/components/CardPreview";
import {getBackgroundColour} from "../scripts/image_lib";
import {fetchMembers, updateMember} from "../redux/actions";
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

    // Asynchronously updating the average colour field of the card when the image link is changed
	useEffect(() => {
		const updateAvgColour = async () => {
			let backgroundColour;
			if (newCard.imageLink !== "") {
				backgroundColour = await getBackgroundColour(newCard.imageLink);
			} else {
				backgroundColour = {"r": 255, "g": 255, "b": 255};
			}

			updateCard((currentCard) => {
				return {
					...currentCard,
					"avgColour": backgroundColour
				}
			})
		}
		updateAvgColour();
	}, [newCard.imageLink]);

    // Helper function to dispatch an action to update a given member
    const handleUpdate = () => {
        dispatch(updateMember(newCard["id"], newCard));
        dispatch(fetchMembers());
    };

    return (
        <>
            <button onClick={() => showDialog()}>Edit Member</button>
            <dialog ref={dialogPopup}>
                {isVisible ? <>
                    <h2>Edit Member</h2>
                    <div id="display">
                        {/* FIXME: the popup window makes the original NewMemberForm on the Manager page unfocusable, so Chrome throws an "error" of sorts */}
                        {/* FIXME: the popup window edits the corresponding team member on the first page when accessed from other pages */}
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