import "./teamDisplay.css"
import {getTextColour} from "../scripts/image_lib"

// React component for displaying team cards in a flex box
const TeamDisplay = ({cardsVisible, origin}) => {
    // Base case, if the container is set to be hidden
    if (!cardsVisible) {
        return (<div className="flex_container" id={origin}></div>);
    }

    // Another base case, if there are no cards in the system
    const team = JSON.parse(sessionStorage.getItem("team"))["team members"];
    if (team.length === 0) { 
        return (
            <div className="flex_container" id={origin}>
                <p>No members in team!</p>
            </div>
        );
    }

    // Adding all the cards to a flex container
    return (
        <div className="flex_container" id={origin}>
            {team.map((member, index) => (
                <TeamCard key={index} member={member} />
            ))}
        </div>
    )
}

// React component for a card for a single team member
const TeamCard = ({member}) => {
    const r = member.avgColour.r, g = member.avgColour.g, b = member.avgColour.b;

    return (
        <div className="team_card" style={{backgroundColor: "rgb(" + r + "," + g + "," + b + ")", color: getTextColour(member.avgColour)}}>
            <strong>{member.name}</strong>
            <p>{member.description}</p><br/>
            Age: {member.age} <br/><br/>
            {member.image === "" ? <em>No image included</em> : <img src={member.image}/>}
        </div>
    )
}

export default TeamDisplay
