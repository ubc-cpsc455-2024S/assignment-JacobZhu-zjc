// Helper function to check form validity before attempting to create a new teammate or update the preview
const checkValidity = () => {
	const form = document.getElementById("new_member_form");
	if (!form) {
		return false;
	} else if (form.checkValidity()) {
        return true;
    } else {
        form.reportValidity();
        return false;
    }
};

export {checkValidity};
