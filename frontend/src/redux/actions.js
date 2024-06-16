// List of functions to use in React components

// Function used when adding a new member to the team
const addMember = (member) => {
    return {        
        type: "ADD",
        newMember: member
    }
};

// Function used when removing a member from the team
const deleteMember = (index) => {
    return {
        type: "DELETE",
        index: index
    }
}

// Function to empty the array of team members
const emptyTeam = () => {
    return {
        type: "EMPTY"
    }
}

// Function to restore the starting teammates
const resetTeam = () => {
    return {
        type: "RESET"
    }
}

export {addMember, deleteMember, emptyTeam, resetTeam}
