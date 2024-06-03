// List of functions to use in React components

// Function used when adding a new member to the team
const addMember = ({member}) => {
    return {
        newMember: member,
        type: "ADD"
    }
};

// Function used when removing a member from the team
const deleteMember = ({index}) => {
    return {
        index: index,
        type: "DELETE"
    }
}

export {addMember, deleteMember}
