const db = require('../config/db.config.js');
const Video = db.videos;
const Tag = db.tags;
const tagvideo = db.tagvideo;
const TagVideoController = require('../controller/tagvideo.controller.js');
const TagController = require('../controller/tag.controller.js');

// Post a Video
exports.create = (req, res) => {
	var Tags = [];

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
		if( TagVideoToCreate!=null)
		{
			for (var i = 0; i < TagVideoToCreate.length; i++) {
				TagVideoController.create(VideoData.id,
					TagVideoToCreate[i].id);
			}
		}
		res.send(video + Tags);
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

// Find a Video by Id
exports.findById =async function (req, res){
	var video=await Video.findByPk(req.params.videoId);
	
		var videoId=video.id;
		var tagVideobyvideoId=await TagVideoController.findAllByVideoId(videoId);

		var tagByTagVideo = await TagController.findAllByTagId(tagVideobyvideoId);

		video.dataValues.tags=JSON.stringify(tagByTagVideo);

		res.send(video);
};

// Update a Video
exports.update = (req, res) => {
	var video = req.body;
	Video.update({
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		url: req.body.url,
		createdat: req.body.createdat,
		updatedat: req.body.updatedat,
	}, {
		where: {
			id: req.body.id
		}
	}).then(() => {
		var VideoData = video.dataValues;
		console.log("req.body.tags");
		console.log(req.body);
		
		TagVideoController.updateForVideo(req.body.id,req.body.tags);
		// var TagVideoToCreate = req.body.tags;
		// console.log("==================================");
		// console.log(TagVideoToCreate);
		// for (var i = 0; i < TagVideoToCreate.length; i++) {
		// 	TagVideoController.create(VideoData.id,
		// 		TagVideoToCreate[i].id);
		// }
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