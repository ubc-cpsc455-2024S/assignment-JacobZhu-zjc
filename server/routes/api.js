const express = require("express");
const {v4: uuidv4} = require('uuid');
const router = express.Router();
const memberModel = require("../mongodb/schemas").memberModel;
const initialState = require("../default_data").initialState;

// Helper function to correctly parse the "_id" field from a Buffer to a UUID
const parseIDs = (data) => {
	const teamMembers = [];
	for (const member of data) {
		let copy = {...Object(member)["_doc"]};
		copy["_id"] = String(member["_id"]);
		teamMembers.push(copy);
	}
	return teamMembers;
}

// GET endpoint to fetch team members on the given page, using offset-based pagination
router.get("/members", async (req, res) => {
	const MEMBERS_PER_PAGE = 10;

	const pageNumber = req.query["page"];
	const teamMembers = parseIDs(await memberModel.find({})); // Getting all team members from mongodb
	const numPages = Math.max(1, Math.ceil(teamMembers.length / MEMBERS_PER_PAGE));
	res.json({
		"teamMembers": teamMembers.slice((pageNumber - 1) * MEMBERS_PER_PAGE, pageNumber * MEMBERS_PER_PAGE),
		"numPages": numPages
	});
});

// GET endpoint to reset team to initial members
router.get("/members/reset", async (req, res) => {
	await memberModel.deleteMany({});
	await memberModel.insertMany(JSON.parse(initialState));
	res.json(parseIDs(await memberModel.find({})));
});

// GET endpoint to delete all members
router.get("/members/empty", async (req, res) => {
	await memberModel.deleteMany({});
	res.status(204).send();
});

// POST endpoint to add a new member
router.post("/members", async (req, res) => {
	const newMember = req.body;
	// Using UUID to set team member IDs
	newMember["_id"] = uuidv4();
	await memberModel.create(newMember);
	res.status(201).json(newMember);
});

// PUT endpoint to update a team member
router.put("/members/:id", async (req, res) => {
	// Updating specified member with the new values for the fields sent in the HTTP request
	const editedMember = await memberModel.findByIdAndUpdate(req.params.id, req.body);
	if (editedMember !== null) {
		// Responding with the updated team member
		res.json(teamMembers[index]);
	} else {
		res.status(404).send("Member not found");
	}
});

// DELETE endpoint to delete a member
router.delete("/members/:id", async (req, res) => {
	const data = await memberModel.findById(req.params.id);
	if (data !== null) {
		// Removing the member specified in the HTTP request
		await memberModel.deleteOne({"_id": req.params.id})
		// Responding with a status code, but no body
		res.status(204).send();
	} else {
		res.status(404).send("Member not found");
	}
});

module.exports = router;
