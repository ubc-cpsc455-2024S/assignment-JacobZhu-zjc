import "./outerSpacer.css"

// Custom <div> component that adds space to the left and right using margins
const OuterSpacer = ({children}) => {
    return (
        <div className="outer_spacer">
            {children}
        </div>
    )
}

export default OuterSpacer