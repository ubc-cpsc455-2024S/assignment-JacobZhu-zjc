import {useRef, useState} from "react";
import {TeamCard} from "./TeamDisplay"
import "./detailedView.css"

// React component used to view a single team card in more detail
const DetailedView = ({member}) => {
    const dialogPopup = useRef();
    const [isVisible, setVisibility] = useState(false);

    const showDialog = () => {
        setVisibility(true);
        dialogPopup.current.showModal();
    };

    const hideDialog = () => {
        setVisibility(false);
        dialogPopup.current.close();
    };

    return (
        <>
            <button onClick={() => showDialog()}>See Details</button>
            <dialog ref={dialogPopup}>
                {isVisible ? <TeamCard member={member} addDelete={false} index={undefined} addDialog={false} /> : <></>}
                {isVisible ? <button onClick={() => hideDialog()} autoFocus>Close</button> : <></>}
            </dialog>
        </>
    );
}

export default DetailedView