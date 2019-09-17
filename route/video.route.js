module.exports = function (app) {

    const video = require('../controller/video.controller.js');

    // Create a new Video
    app.post('/api/video', video.create);

    // Retrieve all Video
    app.get('/api/video', video.findAll);

    // Retrieve all Video
    app.get('/api/video/:offset/:limit', video.findAllWithPagination);

    // Retrieve a single Video by Id
    app.get('/api/video/:videoId', video.findById);

    app.get('/api/videobytag/:tagId', video.findByTag);

    // Update a Video with Id
    app.put('/api/video/:videoId', video.update);

    // Delete a Video with Id
    app.delete('/api/video/:videoId', video.delete);
};