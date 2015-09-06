var mongoose = require('mongoose');

// create the MovieSchema.
var ActivitySchema = new mongoose.Schema({
	description:{
		type: String,
		required: true	
	},
	date: {
		type: Date,
		required: true
	},
	type: {
		type: Number,
		required: true
	}
});

// Export the model schema.
module.exports = ActivitySchema;