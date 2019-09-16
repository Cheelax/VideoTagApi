module.exports = function(app) {
 
    const tag = require('../controller/tag.controller.js');
 
    // Create a new Tag
    app.post('/api/tag', tag.create);

    // Retrieve all Video
    app.get('/api/tag', tag.findAll);

    // Delete a Tag with Id
    app.delete('/api/tag/:tagId', tag.delete);
}