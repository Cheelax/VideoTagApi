var chai = require('chai');
var expect = chai.expect;
var assert = require('assert');
const needle = require('needle');

var server = require('../server.js');
var videoData = require('../data/video.json');
var tagData = require('../data/tag.json');
const env = require('../config/env.js');

describe('hooks', function () {
  before(async () => {
    await CleanDatabase();
  });

  after(async () => {
    await CleanDatabase();
  });

  afterEach(async () => {
    await CleanDatabase();
  });

  describe("Create Tags", async function () {
    it("should create all Tags", async function () {
      tagData.tags.forEach(async function (element) {
        var rep = await needle("post", "http://localhost:8080/api/tag/", element, {
          json: true
        });
      });

      const rep = await needle('get', 'http://localhost:8080/api/tag/');
      rep.body.forEach(function (element) {
        var tagDataexpected = tagData.tags.find(tag => tag.id == element.id);
        assert.equal(element.id, tagDataexpected.id);
        assert.equal(element.valeur, tagDataexpected.valeur);
      });
    });

    it("should not create Tags", async function () {
      console.log("Normal 500 response");
      var tag = {
        ...tagData.tags[1]
      };
      tag.valeur = null;

      rep = await needle("post", "http://localhost:8080/api/tag/", tag, {
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
      const toDelete = await needle('get', 'http://localhost:8080/api/tag/');
      var resToDelete = toDelete.body;
      assert.equal(resToDelete.length, tagData.tags.length);

      resToDelete.forEach(function (element) {
        tagId.push(element.id);
      });

      for (var i = 0; i < tagId.length; i++) {
        await needle("delete", 'http://localhost:8080/api/tag/' + tagId[i]);
      }
      const rep = await needle('get', 'http://localhost:8080/api/tag/');
      assert.equal(rep.body.length, 0, rep.body);
    });
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

  await tagData.tags.forEach(async function (element) {
    await needle("post", "http://localhost:8080/api/tag/", element);

  });

  await videoData.videos.forEach(async function (element) {
    element.tags = [];
    element.tags.push(tagData.tags[0]);
    await needle("post", "http://localhost:8080/api/video/", element);
  });
  return;
}