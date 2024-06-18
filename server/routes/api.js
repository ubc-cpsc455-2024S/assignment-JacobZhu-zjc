const express = require("express");
const {v4: uuidv4} = require('uuid');
const router = express.Router();
let teamMembers = require("../data/team").teamMembers;
const initialState = require("../data/team").initialState;

// GET endpoint to fetch team members on the given page, using offset-based pagination
router.get("/members", (req, res) => {
	const MEMBERS_PER_PAGE = 10;

	const queries = req.query;
	const pageNumber = queries["page"];
	const numPages = Math.max(1, Math.ceil(teamMembers.length / MEMBERS_PER_PAGE));
	res.json({
		teamMembers: teamMembers.slice((pageNumber - 1) * MEMBERS_PER_PAGE, pageNumber * MEMBERS_PER_PAGE),
		numPages: numPages
	});
});

// GET endpoint to reset team to initial members
router.get("/members/reset", (req, res) => {
	teamMembers = JSON.parse(initialState);
	res.json(teamMembers);
});

// GET endpoint to delete all members
router.get("/members/empty", (req, res) => {
	teamMembers = [];
	res.status(204).send();
});

// POST endpoint to add a new member
router.post("/members", (req, res) => {
	const newMember = req.body;
	// Using UUID to set team member IDs
	newMember["id"] = uuidv4();
	teamMembers.push(newMember);
	res.status(201).json(newMember);
});

// PUT endpoint to update a team member
router.put("/members/:id", (req, res) => {
	const id = req.params.id;
	const updatedMember = req.body;
	const index = teamMembers.findIndex(member => (member["id"] === id));
	if (index !== -1) {
		// Updating specified member with the new values for the fields sent in the HTTP request
		teamMembers[index] = {...teamMembers[index], ...updatedMember};
		// Responding with the updated team member
		res.json(teamMembers[index]);
	} else {
		res.status(404).send("Member not found");
	}
});

// DELETE endpoint to delete a member
router.delete("/members/:id", (req, res) => {
	const id = req.params.id;
	const index = teamMembers.findIndex(member => (member["id"] === id));
	if (index !== -1) {
		// Removing the member specified in the HTTP request
		teamMembers.splice(index, 1);
		// Responding with a status code, but no body
		res.status(204).send();
	} else {
		res.status(404).send("Member not found");
	}
});

module.exports = router;
