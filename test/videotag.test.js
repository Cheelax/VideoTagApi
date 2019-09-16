var chai = require('chai');
var assert = require('assert');
const needle = require('needle');
var videoData = require('../data/video.json');
var tagData = require('../data/tag.json');

describe('hooks', function () {
    beforeEach(async () => {
        await CleanDatabase();
    });

    describe("Get Link", function () {
        it("should return all Link", async function () {
            await PopulateDatabase();

            const allVideo = await needle('get', 'http://localhost:8080/api/video/');
            allVideo.body.forEach(async function (element) {

                const rep = await needle('get', 'http://localhost:8080/api/video/' + element.id);

                var tagObjects = JSON.parse(rep.body.tags);

                tagObjects.forEach(function (element) {

                    assert.equal(JSON.stringify(element), JSON.stringify(tagData.tags[0]));
                });
            });
        });
        it("should return no Link", async function () {
            await needle("post", 'http://localhost:8080/api/video/', videoData.videos[0]);
            const rep = await needle('get', 'http://localhost:8080/api/video/' + 1);
            var res = rep.body;
            assert.equal(res.tags, JSON.stringify([]), res);
        });
    });

    describe("Delete Link", function () {
        it("should delete all Links", async function () {
            await PopulateDatabase();

            const allVideo = await needle('get', 'http://localhost:8080/api/video/');
            allVideo.body.forEach(async function (element) {
                var rep = await needle('get', 'http://localhost:8080/api/video/' + element.id);
                rep.body.tags = '[]';
                const video = {
                    ...rep.body
                };

                await needle('put', 'http://localhost:8080/api/video/' + element.id, {
                    video
                }, {
                    json: true
                });

                var repDelete = await needle('get', 'http://localhost:8080/api/video/' + element.id);
                assert.equal(repDelete.body.tags, JSON.stringify([]));

            });
        });
        // it("should delete one link", async function () {
        //     await PopulateDatabase();
        // });
    });
});

async function CleanDatabase() {
    var videoId = [];
    const repVideo = await needle('get', 'http://localhost:8080/api/video/');
    repVideo.body.forEach(async function (element) {
        videoId.push(element.id);
    });

    videoId.forEach(async function (element) {
        await needle("delete", 'http://localhost:8080/api/video/' + element);
    });

    var tagId = [];
    const repTag = await needle('get', 'http://localhost:8080/api/tag/');
    repTag.body.forEach(async function (element) {
        tagId.push(element.id);
    });

    tagId.forEach(async function (element) {
        await needle("delete", 'http://localhost:8080/api/tag/' + element);
    });
}

async function PopulateDatabase() {

    for (var i = 0; i < tagData.tags.length; i++) {
        await needle("post", 'http://localhost:8080/api/tag/', tagData.tags[i]);
    }

    for (var j = 0; j < videoData.videos.length; j++) {
        await needle("post", 'http://localhost:8080/api/video/', videoData.videos[j]);
    }
    return;
}