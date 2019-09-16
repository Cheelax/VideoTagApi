const db = require('../config/db.config.js');
const TagVideo = db.tagvideo;

// Post a tagVideo
exports.create = (videoid, tagid) => {
    if(videoid!=null && tagid!=null )
    {
        TagVideo.create({
            videoid: videoid,
            tagid: tagid,
        }).catch(err => {
            
        });
    }
};

exports.updateForVideo = (videoid,tagList) => {
    if ( typeof tagList == 'undefined' || !tagList )
    {
        this.deleteByVideoId(videoid);
    }
    else {
        this.deleteByVideoId(videoid);
        tagList.forEach(element => {
            this.create(videoid,element.id);
        });
    }
};

// Delete a Tagvideo by Id
exports.delete = (videoid, tagid) => {
    TagVideo.destroy({
        where: { videoid: videoid ,tagid: tagid}
    }).then(() => {
        res.status(200).send('Tag has been deleted!');
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    });
};

// Delete a Tagvideo by Id
exports.deleteByVideoId = (videoid) => {
    TagVideo.destroy({
        where: { videoid: videoid}
    }).then(() => {
    }).catch(err => {
    });
};

exports.findAllByVideoId = async function(videoId) {
    var result=[];
    const tagvideo = await TagVideo.findAll({ where: {
                videoid: videoId
            }
        });
            for(var i=0;i<tagvideo.length;i++)
            {
                result.push(tagvideo[i].dataValues);
            }
            return result;
};