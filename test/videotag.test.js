var chai = require('chai');
var assert = require('assert');
const needle = require('needle');
var videoData = require('../data/video.json');
var tagData = require('../data/tag.json');

describe('video Tag hooks', function () {
    beforeEach(async () => {
        await CleanDatabase();
    });
    after(async ()=>{
    await CleanDatabase();});

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

            var allVideoData = allVideo.body;
            for(var i=0;i<allVideoData.length;i++)
            {
                var rep = await needle('get', 'http://localhost:8080/api/video/' + allVideoData[i].id);
                rep.body.tags = '[]';
                const video = {
                    ...rep.body
                };

                const res=await needle('put', 'http://localhost:8080/api/video/' + allVideoData[i].id, {
                    video
                }, {
                    json: true
                });
                var repDelete = await needle('get', 'http://localhost:8080/api/video/' + allVideoData[i].id);
                assert.equal(repDelete.body.tags, JSON.stringify([]));
            }
        }
        );
    });
    describe("Get videos by tag", function () {
        it("should return some Video", async function () {
            await PopulateDatabase();
            
            var repToUpdate = await needle('get', 'http://localhost:8080/api/videobytag/1');
           assert.equal(repToUpdate.body.length,2);
        });
    });
});

async function CleanDatabase() {
    var videoId = [];
    const repVideo = await needle('get', 'http://localhost:8080/api/video/');
    if(typeof repVideo.body == 'undefined' || repVideo.body!='[]')
    {
        repVideo.body.forEach(async function (element) {
            videoId.push(element.id);
        });
    
        videoId.forEach(async function (element) {
            await needle("delete", 'http://localhost:8080/api/video/' + element);
        });
    }

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
    for(var i =0;i<tagData.tags.length;i++)
    {
        await needle("post", "http://localhost:8080/api/tag/", tagData.tags[i]);

    }
    for(var j =0;j<videoData.videos.length;j++)
    {
        videoData.videos[j].tags = [];
        videoData.videos[j].tags.push(tagData.tags[0]);
        await needle("post", "http://localhost:8080/api/video/", videoData.videos[j]);
    }
    
}