

//     var chai = require('chai');
// var expect = chai.expect;
// var assert = require('assert');
// const needle = require('needle');

// var server = require('../server.js');
// var videoData = require('../data/video.json');
// var tagData = require('../data/tag.json');
// const env = require('../config/env.js');

// describe('hooks', function () {
//   before(async () => {
//     await CleanDatabase();
//   });

//   after(async () => {
//     await CleanDatabase();
//   });

//   afterEach(async () => {
//     await CleanDatabase();
//   });

//   describe("Get all videos", function () {
//     it("should return all Video", async function () {
//       await PopulateDatabase();
//       const rep = await needle('get', 'http://localhost:8080/api/video/');
//       rep.body.forEach(function (element) {
//         var videoDataexpected = videoData.videos.find(video => video.id == element.id);
//         assert.equal(element.id, videoDataexpected.id);
//         assert.equal(element.name, videoDataexpected.name);
//       });
//     });
//     it("should return no Video", async function () {
//       await CleanDatabase();
//       const rep = await needle('get', 'http://localhost:8080/api/video/');
//       var res = rep.body;
//       assert.equal(res.length, 0, res);
//     });
//   });

//   describe("Create Videos", async function () {
//     it("should create all Video", async function () {
//       videoData.videos.forEach(async function (element) {
//         var rep = await needle("post", "http://localhost:8080/api/video/", element, {
//           json: true
//         });
//       });

//       const rep = await needle('get', 'http://localhost:8080/api/video/');
//       rep.body.forEach(function (element) {
//         var videoDataexpected = videoData.videos.find(video => video.id == element.id);
//         assert.equal(element.id, videoDataexpected.id);
//         assert.equal(element.name, videoDataexpected.name);
//         assert.equal(element.description, videoDataexpected.description);
//         assert.equal(element.url, videoDataexpected.url);
//         assert.equal(element.createdat, videoDataexpected.createdat);
//         assert.equal(element.updatedat, videoDataexpected.updatedat);
//       });

//     });
//     it("should not create Video", async function () {
//       console.log("Normal 500 response");
//       video = {
//         ...videoData.videos[0]
//       };

//       video.url = null;
//       var rep = await needle("post", "http://localhost:8080/api/video/", video, {
//         json: true
//       });

//       assert.equal(rep.statusCode, 500);

//       video = {
//         ...videoData.videos[1]
//       };
//       video.name = null;

//       rep = await needle("post", "http://localhost:8080/api/video/", video, {
//         json: true
//       });
//       assert.equal(rep.statusCode, 500);

//       video = {
//         ...videoData.videos[1]
//       };
//       video.id = null;

//       rep = await needle("post", "http://localhost:8080/api/video/", video, {
//         json: true
//       });
//       assert.equal(rep.statusCode, 500, rep.body);

//     });
//   });

//   describe("Delete Videos", function () {
//     it("should delete all Video", async function () {
//       await needle("post", "http://localhost:8080/api/video/", videoData.videos[0]);
//       await needle("post", "http://localhost:8080/api/video/", videoData.videos[1]);
//       var videoId = [];
//       const toDelete = await needle('get', 'http://localhost:8080/api/video/');
// var resToDelete = toDelete.body;

// assert.equal(resToDelete.length, 2);

//       toDelete.body.forEach(function (element) {
//         videoId.push(element.id);
//       });

//       for (var i = 0; i < videoId.length; i++) {
//         await needle("delete", 'http://localhost:8080/api/video/' + videoId[i]);
//       }

//       const rep = await needle('get', 'http://localhost:8080/api/video/');
//       var res = rep.body;
//       assert.equal(res.length, 0, rep.body);
//     });
//   });

//   describe("Update Videos", function () {
//     it("should update Video", async function () {

//       await needle("post", "http://localhost:8080/api/video/", videoData.videos[0]);

//       const repToUpdate = await needle('get', 'http://localhost:8080/api/video/');

//       var video = {
//         ...repToUpdate.body[0]
//       };

//       video.name = "updatedName";
//       video.description = "updatedDescription";
//       video.url = "http://www.twitter.com";
//       video.createdat = new Date(2019, 12, 9, 0, 0, 0);
//       video.createdat.setUTCHours(0);
//       video.createdat.toUTCString();
//       video.updatedat = new Date(2019, 12, 9, 0, 0, 0);
//       video.updatedat.setUTCHours(0);
//       video.updatedat.toUTCString();

//       await needle('put', 'http://localhost:8080/api/video/' + video.id, {
//         video
//       }, {
//         json: true
//       });

//       const repUpdated = await needle('get', 'http://localhost:8080/api/video/');
//       var videoUpdated = {
//         ...repUpdated.body[0]
//       };

//       var createdatupdated = new Date(videoUpdated.createdat);
//       var updatedatupdated = new Date(videoUpdated.updatedat);

//       assert.equal(videoUpdated.name, video.name);
//       assert.equal(videoUpdated.description, video.description);
//       assert.equal(videoUpdated.url, video.url);
//       assert.equal(createdatupdated.toISOString(), video.createdat.toISOString());
//       assert.equal(updatedatupdated.toISOString(), video.updatedat.toISOString());
//     });
//     it("should not update Video", async function () {

//       await needle("post", "http://localhost:8080/api/video/", videoData.videos[0]);
  
//       const repToUpdate = await needle('get', 'http://localhost:8080/api/video/');
  
//       var video = {
//         ...repToUpdate.body[0]
//       };
//       video.name = null;
//       video.url = null;
//       console.log("normal 500 response");
//       var putRes = await needle('put', 'http://localhost:8080/api/video/' + video.id, {
//         video
//       }, {
//         json: true
//       });
  
//       assert.equal(putRes.statusCode, 500);
//     });
//   });
// });

// async function CleanDatabase() {
//   var videoId = [];
//   const repVideo = await needle('get', 'http://localhost:8080/api/video/');
//   repVideo.body.forEach(async function (element) {
//     videoId.push(element.id);
//   });

//   videoId.forEach(async function (element) {
//     await needle("delete", 'http://localhost:8080/api/video/' + element);
//   });

//   var tagId = [];
//   const repTag = await needle('get', 'http://localhost:8080/api/tag/');
//   repTag.body.forEach(async function (element) {
//     tagId.push(element.id);
//   });

//   tagId.forEach(async function (element) {
//     await needle("delete", 'http://localhost:8080/api/tag/' + element);
//   });

// }

// async function PopulateDatabase() {
//   await videoData.videos.forEach(async function (element) {
//     await needle("post", "http://localhost:8080/api/video/", element);
//   });
//   return;
// }