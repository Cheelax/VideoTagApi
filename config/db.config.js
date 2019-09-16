const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.conString,{logging: false});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.videos = require('../model/video.js')(sequelize, Sequelize);
db.tags = require('../model/tag.js')(sequelize, Sequelize);
db.tagvideo = require('../model/tagvideo.js')(sequelize, Sequelize);

db.videos.belongsToMany(db.tags, { as: 'tags', through: {model : db.tagvideo}, foreignKey:"tagid"});
db.tags.belongsToMany(db.videos , { as: 'videos', through: {model : db.tagvideo}, foreignKey:"videoid"});
 
module.exports = db;