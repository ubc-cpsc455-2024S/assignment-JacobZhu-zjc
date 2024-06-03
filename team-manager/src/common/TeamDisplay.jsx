import "./teamDisplay.css"
import {getTextColour} from "../scripts/image_lib"
import DetailedView from "./DetailedView";

// React component for displaying team cards in a flex box
const TeamDisplay = ({cardsVisible, addDeleteButtons}) => {
    // Base case, if the container is set to be hidden
    if (!cardsVisible) {
        return (<div className="flex_container"></div>);
    }

    // Another base case, if there are no cards in the system
    const team = JSON.parse(sessionStorage.getItem("team"))["team members"];
    if (team.length === 0) { 
        return (
            <div className="flex_container">
                <p>No members in team!</p>
            </div>
        );
    }

    // Adding all the cards to a flex container
    return (
        <div className="flex_container">
            {team.map((member, index) => (
                <TeamCard key={index} member={member} addDelete={addDeleteButtons} index={index} addDialog={true} />
            ))}
        </div>
    )
}

// React component for a card for a single team member
const TeamCard = ({member, addDelete, index, addDialog}) => {
    const r = member.avgColour.r, g = member.avgColour.g, b = member.avgColour.b;

    return (
        <>
        <div className="team_card" style={{backgroundColor: "rgb(" + r + "," + g + "," + b + ")", color: getTextColour(member.avgColour)}}>
            {/* Adding delete buttons if specified */}
            {addDelete ? (<DeleteButton index={index} />) : <></>}
            {/* Adding the rest of the card */}
            <strong>{member.name}</strong>
            <p>{member.description}</p><br/>
            Age: {member.age} <br/><br/>
            {member.imageLink === "" ? <em>No image included</em> : <img src={member.imageLink} />}
            {addDialog ? <DetailedView member={member} /> : <></>}
        </div>
        </>
    )
}

// React component for individual delete buttons
const DeleteButton = ({index}) => {
    // Helper function to delete a specific card at the given index in sessionStorage
    const deleteCard = () => {
        let team = JSON.parse(sessionStorage.getItem("team"));
        team["team members"].splice(Number(index), 1);
        sessionStorage.setItem("team", JSON.stringify(team));
    }
    
    return (
        <button className="delete_card_button" onClick={() => deleteCard()}>&#x2715;</button>
    );
}

export default TeamDisplay
export {TeamCard}