const db = require('../config/db.config.js');
const Video = db.videos;
const Tag = db.tags;
const TagVideoController = require('../controller/tagvideo.controller.js');
const TagController = require('../controller/tag.controller.js');

// Post a Video
exports.create = (req, res) => {

	Video.create({
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		url: req.body.url,
		createdat: req.body.createdat,
		updatedat: req.body.updatedat
	}).then(video => {
		var VideoData = video.dataValues;
		var TagVideoToCreate = req.body.tags;
		if (TagVideoToCreate != null) {
			for (var i = 0; i < TagVideoToCreate.length; i++) {
				TagVideoController.create(VideoData.id,
					TagVideoToCreate[i].id);
			}
		}
		res.send(video);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// FETCH all Videos
exports.findAll = (req, res) => {
	Video.findAll({
		include: [{
			model: Tag,
			as: 'tags',
			attributes: ['id', 'valeur'],
			through: {
				attributes: ['videoid', 'tagid'],
			}
		}]
	}).then(videos => {
		res.send(videos);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

exports.findAllWithPagination = (req, res) => {
	Video.findAll({offset: req.params.offset, limit: req.params.limit,
		include: [{
			model: Tag,
			as: 'tags',
			attributes: ['id', 'valeur'],
			through: {
				attributes: ['videoid', 'tagid'],
			}
		}]
	}).then(videos => {
		res.send(videos);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// FETCH all Videos
exports.findByTag = async function (req, res)  {
	var id= parseInt(req.params.tagId);
	Video.findAll({
		include: [{
			model: Tag,
			as: 'tags',
			attributes: ['id', 'valeur'],
			through: {
				attributes: ['videoid', 'tagid'],
			}
		}]
	}).then(videos => {
		res.send(videos);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// Find a Video by Id
exports.findById = async function (req, res) {
	Video.findByPk(
			req.params.videoId
		)
		.then(async function (video) {
			if (video == null || typeof (video) == 'undefined') {
				res.send(video);
				return;
			}
			var tagVideobyvideoId = await TagVideoController.findAllByVideoId(req.params.videoId);

			var tagByTagVideo = await TagController.findAllByTagId(tagVideobyvideoId);
			if (tagByTagVideo != null) {
				video.dataValues.tags = JSON.stringify(tagByTagVideo);
			} else {
				video.dataValues.tags = JSON.stringify([]);
			}
			res.send(video.dataValues);
		}).catch(err => {
			res.status(500).send("Error -> " + err);
		});
};

// Update a Video
exports.update = (req, res) => {
	Video.update({
		id: req.body.video.id,
		name: req.body.video.name,
		description: req.body.video.description,
		url: req.body.video.url,
		createdat: req.body.video.createdat,
		updatedat: req.body.video.updatedat,
	}, {
		where: {
			id: req.body.video.id
		}
	}).then((video) => {
		TagVideoController.updateForVideo(req.body.video.id, req.body.tags);
		res.status(200).send(video);
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};

// Delete a Video by Id
exports.delete = (req, res) => {
	const id = req.params.videoId;
	Video.destroy({
		where: {
			id: id
		}
	}).then(() => {
		res.status(200).send('Video has been deleted!');
	}).catch(err => {
		res.status(500).send("Error -> " + err);
	});
};