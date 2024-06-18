import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getTextColour} from "../scripts/image_lib"
import DetailedView from "./DetailedView";
import {fetchMembers, deleteMember} from "../redux/actions";
import "./teamDisplay.css"

// React component for displaying team cards in a flex box
const TeamDisplay = ({cardsVisible, addDeleteButtons, startingPage = 1}) => {
    const dispatch = useDispatch();
    const team = useSelector((state) => state["teamMembers"]);
    const numPages = useSelector((state) => state["numPages"]);
    // Setting the starting page to be 1, whenever the TeamDisplay is rendered
    const [currentPage, setCurrentPage] = useState(startingPage);

    // Updating the state of the team in Redux every time the component loads
	useEffect(() => {
		dispatch(fetchMembers(currentPage));
	}, [currentPage, dispatch]);

    // Base case, if the container is set to be hidden
    if (!cardsVisible) {
        return (<div className="flex_container"></div>);
    }

    // Another base case, if there are no cards in the system
    if (team.length === 0) {
        return (
            <div className="flex_container">
                <p>No members in team!</p>
            </div>
        );
    }

    // Adding all the cards to a flex container
    return (
        <>
            <div className="flex_container">
                {team.map((member, index) => (
                    <TeamCard key={index} member={member} addDelete={addDeleteButtons} addDialog={true} />
                ))}
            </div>
            {(currentPage > 1) ? <button onClick={() => setCurrentPage(currentPage - 1)}>Previous Page</button> : <button disabled>Previous Page</button>}
            {(currentPage < numPages) ? <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button> : <button disabled>Next Page</button>}
        </>
    )
}

// React component for a card for a single team member
const TeamCard = ({member, addDelete, addDialog}) => {
    const r = member.avgColour.r, g = member.avgColour.g, b = member.avgColour.b;

    return (
        <div className="team_card" style={{backgroundColor: "rgb(" + r + "," + g + "," + b + ")", color: getTextColour(member.avgColour)}}>
            {/* Adding delete buttons if specified */}
            {addDelete ? (<DeleteButton id={member["id"]} />) : <></>}
            {/* Adding the rest of the card */}
            <strong>{member.name}</strong>
            <p>{member.description}</p><br/>
            Age: {member.age} <br/><br/>
            {member.imageLink === "" ? <><em>No image included</em><br/></> : <img src={member.imageLink} />}
            {addDialog ? <DetailedView member={member} /> : <></>}
        </div>
    )
}

// React component for individual delete buttons
const DeleteButton = ({id}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteMember(id))
        dispatch(fetchMembers());
    };

    return (
        <button className="delete_card_button" onClick={() => handleDelete()}>&#x2715;</button>
    );
}

export default TeamDisplay
export {TeamCard}
