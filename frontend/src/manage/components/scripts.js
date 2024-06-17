// Helper function to check form validity before attempting to create a new teammate or update the preview
const checkValidity = () => {
	const forms = document.getElementsByClassName("new_member_form");
    const activeForm = [...forms].filter(form => document.hasFocus(form))[0];
    console.log(forms);
	if (forms.length === 0 || !activeForm) {
		return false;
	} else if (activeForm.checkValidity()) {
        return true;
    } else {
        activeForm.reportValidity();
        return false;
    }
};

export {checkValidity};
