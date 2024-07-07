import mongoose from 'mongoose';

// =============== TEAM MEMBERS ===============
// Schema for an RGB colour, used to store background colours for a team member's card
const colourSchema = new mongoose.Schema({
    r: { type: Number, required: true, default: 255 },
    g: { type: Number, required: true, default: 255 },
    b: { type: Number, required: true, default: 255 },
});

// Schema for an individual team member
const imageSchema = new mongoose.Schema({
    _id: mongoose.Types.UUID,
    name: { type: String, required: true, default: "" },
    description: { type: String, required: true, default: "" },
    age: { type: Number, required: true, default: 0 },
    imageLink: { type: String, required: true, default: "" },
    avgColour: { type: colourSchema, required: true, default: () => ({}) } // Generating the default value according to the default values specified in colourSchema
});

export const imageModel = mongoose.model("Image", imageSchema);
