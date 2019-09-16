const db = require('../config/db.config.js');
const Tag = db.tags;

// FETCH all Videos
exports.findAll = (req, res) => {
	Tag.findAll().then(tags => {
		// Send all customers to Client
		res.send(tags);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// Post a Tag
exports.create = (req, res) => {
	// Save to PostgreSQL database
	Tag.create({
		id: req.body.id,
		valeur: req.body.valeur,
	}).then(tag => {
		res.send(tag);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// Delete a Tag by Id
exports.delete = (req, res) => {
	const id = req.params.tagId;
	Tag.destroy({
		where: {
			id: id
		}
	}).then(() => {
		res.status(200).send('Tag has been deleted!');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

exports.findAllByTagId = async function (tagVideoArray) {
	var result = [];
	for (var i = 0; i < tagVideoArray.length; i++) {
		var toFind = tagVideoArray[i].tagid;
		var found = await Tag.findAll({
			where: {
				id: toFind
			}
		});
		result.push(found[0].dataValues);
	}
	return result;
};