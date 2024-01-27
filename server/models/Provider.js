const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const providerSchema = new Schema({
	provider_id: {
	    type: String,
		required: true,
		unique: true,
		index: true,
	},
	provider_name: {
	    type: String,
		required: true,
		unique: true,
	},
	logo_path: {
		type: String,
		required: true,
		unique: true,
	}
});

const Provider = model('Provider', providerSchema);

module.exports = Provider;