var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
const needle = require('needle');

var server = require('../server.js');
var videoData = require('../data/video.json');
var tagData = require('../data/tag.json');
const env = require('../config/env.js');

describe('hooks', function () {
    beforeEach(async () => {
        await CleanDatabase();
    });

    after(async () => {
        await CleanDatabase();
    });

    describe("Create Tags", async function () {
        it("should create all Tags", async function () {
            tagData.tags.forEach(async function (element) {
                var rep = await needle("post", "http://localhost:49160/api/tag/", element, {
                    json: true
                });
            });

            const rep = await needle('get', 'http://localhost:49160/api/tag/');
            rep.body.forEach(function (element) {
                var tagDataexpected = tagData.tags.find(tag => tag.id == element.id);
                assert.equal(element.id, tagDataexpected.id);
                assert.equal(element.valeur, tagDataexpected.valeur);
            });
        });

        it("should not create Tags", async function () {
            var tag = {
                ...tagData.tags[1]
            };
            tag.valeur = null;

            rep = await needle("post", "http://localhost:49160/api/tag/", tag, {
                json: true
            });
            assert.equal(rep.statusCode, 500);

            tag = {
                ...tagData.tags[1]
            };
        });
    });

    describe("Delete Tags", function () {
        it("should delete all Tags", async function () {
            await PopulateDatabase();

            var tagId = [];
            const resToDelete = await needle('get', 'http://localhost:49160/api/tag/');

            resToDelete.body.forEach(function (element) {
                tagId.push(element.id);
            });
            var toDeletelength = resToDelete.body.length;
            for (var j = 0; j < toDeletelength; j++) {
                tagId.push(resToDelete.body[i]);
            }

            for (var i = 0; i < tagId.length; i++) {
                await needle("delete", 'http://localhost:49160/api/tag/' + tagId[i]);
            }
            const rep = await needle('get', 'http://localhost:49160/api/tag/');
            assert.equal(rep.body.length, 0, rep.body);
        });
    });
});

async function CleanDatabase() {
    var videoId = [];
    const repVideo = await needle('get', 'http://localhost:49160/api/video/');
    repVideo.body.forEach(async function (element) {
        videoId.push(element.id);
    });

    videoId.forEach(async function (element) {
        await needle("delete", 'http://localhost:49160/api/video/' + element);
    });

    var tagId = [];
    const resToDelete = await needle('get', 'http://localhost:49160/api/tag/');

    var toDeletelength = resToDelete.body.length;
    for (var j = 0; j < toDeletelength; j++) {
        tagId.push(resToDelete.body[i]);
    }
    for (var i = 0; i < tagId.length; i++) {
        await needle("delete", 'http://localhost:49160/api/tag/' + tagId[i]);
    }
}

async function PopulateDatabase() {

    await tagData.tags.forEach(async function (element) {
        await needle("post", "http://localhost:49160/api/tag/", element);
    });

    await videoData.videos.forEach(async function (element) {
        element.tags = [];
        element.tags.push(tagData.tags[0]);
        await needle("post", "http://localhost:49160/api/video/", element);
    });
}