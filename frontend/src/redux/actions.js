// List of functions to use in React components
import axios from "axios";

// Labels for each action, used in the Redux reducer
const FETCH_MEMBERS = "FETCH_MEMBERS";
const ADD_MEMBER = "ADD_MEMBER";
const UPDATE_MEMBER = "UPDATE_MEMBER";
const DELETE_MEMBER = "DELETE_MEMBER";
const EMPTY_TEAM = "EMPTY_TEAM";
const RESET_TEAM = "RESET_TEAM";

// Function used when getting team members from backend, with pagination
const fetchMembers = (page) => async dispatch => {
    const res = await axios.get("http://localhost:3001/api/members", {
        params: {
            "page": (page) ? page : 1
        }
    });
    console.log(res.data);
    dispatch({
        type: FETCH_MEMBERS,
        payload: res.data
    });
};

// Function used when adding a new member to the team
const addMember = (member) => async dispatch => {
    const res = await axios.post("http://localhost:3001/api/members", member);
    dispatch({
        type: ADD_MEMBER,
        payload: res.data
    });
};

// Function used when updating an existing member"s data
const updateMember = (id, member) => async dispatch => {
    const res = await axios.put(`http://localhost:3001/api/members/${id}`, member);
    dispatch({
        type: UPDATE_MEMBER,
        payload: res.data
    });
};

// Function used when removing a member from the team
const deleteMember = (id) => async dispatch => {
    await axios.delete(`http://localhost:3001/api/members/${id}`);
    dispatch({
        type: DELETE_MEMBER,
        payload: id
    });
}

// Function to empty the array of team members
const emptyTeam = () => async dispatch => {
    await axios.get("http://localhost:3001/api/members/empty");
    dispatch({
        type: EMPTY_TEAM,
    });
}

// Function to restore the starting teammates
const resetTeam = () => async dispatch => {
    const res = await axios.get("http://localhost:3001/api/members/reset");
    dispatch({
        type: RESET_TEAM,
        payload: res.data
    });
}

export {fetchMembers, addMember, updateMember, deleteMember, emptyTeam, resetTeam};
export {FETCH_MEMBERS, ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER, EMPTY_TEAM, RESET_TEAM};
