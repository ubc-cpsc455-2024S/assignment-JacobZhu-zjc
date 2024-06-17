import {FETCH_MEMBERS, ADD_MEMBER, UPDATE_MEMBER, DELETE_MEMBER, EMPTY_TEAM, RESET_TEAM} from "./actions"

// Reducer for Redux state
function rootReducer(state, action) {
    switch (action.type) {
        case FETCH_MEMBERS:
            return {
                ...state,
                teamMembers: action.payload
            };
        case ADD_MEMBER:
            return {
                ...state,
                teamMembers: [...state["teamMembers"], action.payload]
            };
        case UPDATE_MEMBER:
            return {
                ...state,
                // Replacing the member with the given id with the HTML response body
                teamMembers: state["teamMembers"].map(member => (member["id"] === action.payload.id) ? action.payload : member)
            };
        case DELETE_MEMBER:
            return {
                ...state,
                teamMembers: state["teamMembers"].filter(member => member["id"] !== action.payload)
            };
        case EMPTY_TEAM:
            return {
                ...state,
                teamMembers: []
            }
        case RESET_TEAM:
            return {
                ...state,
                teamMembers: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;
