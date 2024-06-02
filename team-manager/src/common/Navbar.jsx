import {useNavigate} from "react-router-dom";
import "./navbar.css"

// Navbar component, shared across all pages
const NavBar = () => {
    // Objects storing the names and absolute paths to each subpage
    const pages = [
        {"pageName": "Home", "destination": "/"},
        {"pageName": "Manage Team", "destination": "/manage/"},
        {"pageName": "About Me", "destination": "/about/"}
    ];

    // Iterating through the list of pages and creating a button for each element
    return (
        <ul className="navbar">
            {pages.map((page, index) => (
                <li key={index}>
                    <NavBarButton pageName={page.pageName} destination={page.destination}/>
                </li>
            ))}
        </ul>
    )
}

// Button for each page, responsible for redirecting when clicked
const NavBarButton = ({pageName, destination}) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(destination)}>
            {pageName}
        </button>
    )
}

export default NavBar