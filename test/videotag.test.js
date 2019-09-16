// var chai = require('chai');
// var expect = chai.expect;
// var assert = require('assert');
// const needle = require('needle');

// var server = require('../server.js');
// var videoData = require('../data/video.json');
// var tagData = require('../data/tag.json');
// const env = require('../config/env.js');

// describe('hooks', function () {
//   beforeEach(async () => {
//     await CleanDatabase();
//   });

//   after(async () => {
//     //await CleanDatabase();
//   });

//   afterEach(async () => {
//     //await CleanDatabase();
//   });

//   describe("Get Link", function () {
//     it("should return all Link", async function () {
//       await PopulateDatabase();

//       const allVideo = await needle('get', 'http://localhost:8080/api/video/');
//       allVideo.body.forEach(async function (element) {

//         const rep = await needle('get', 'http://localhost:8080/api/video/' + element.id);
//         var tagObjects = JSON.parse(rep.body.tags);
//         console.log("tagObjects");
//         console.log(tagObjects);
//         tagObjects.forEach(function (element) {
//         console.log(element);

//           assert.equal(JSON.stringify(element), JSON.stringify(tagData.tags[0]));
//         });
//       });
//     });
//     it("should return no Link", async function () {
//       await needle("post", 'http://localhost:8080/api/video/', videoData.videos[0]);
//       const rep = await needle('get', 'http://localhost:8080/api/video/'+ 1);
//       var res = rep.body;
//        assert.equal(res.tags, JSON.stringify([]), res);
//     });
//   });

//   describe("Delete Link", function () {
//     it("should delete all Links", async function () {
//       await PopulateDatabase();

//       const allVideo = await needle('get', 'http://localhost:8080/api/video/');
//       allVideo.body.forEach(async function (element) {
//         const rep = await needle('get', 'http://localhost:8080/api/video/' + element.id);
//         var tagObjects = JSON.parse(rep.body.tags);
//         console.log(tagObjects);
//         rep.body.tags='';
//         const rep2 = await needle('put', 'http://localhost:8080/api/video/'+element.id, rep.body);
//         console.log("rep2.body");

//         console.log(rep2.body);
//         const repDelete = await needle('get', 'http://localhost:8080/api/video/' + element.id);
//         console.log(repDelete.body);



        
//       });

//       // var videoId = [];
//       // const toDelete = await needle('get', 'http://localhost:8080/api/video/');
//       // toDelete.body.forEach(function (element) {
//       //   videoId.push(element.id);
//       // });

//       // for (var i = 0; i < videoId.length; i++) {
//       //   await needle("delete", 'http://localhost:8080/api/video/' + videoId[i]);
//       // }

//       // const rep = await needle('get', 'http://localhost:8080/api/video/');
//       // var res = rep.body;
//       // assert.equal(res.length, 0, rep.body);
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

//   for (var i = 0; i < tagData.tags.length; i++) {
//     await needle("post", 'http://localhost:8080/api/tag/', tagData.tags[i]);
//   }

//   for (var j = 0; j < videoData.videos.length; j++) {
//     videoData.videos[j].tags = [];
//     videoData.videos[j].tags.push(tagData.tags[0]);

//     await needle("post", 'http://localhost:8080/api/video/', videoData.videos[j]);
//   }
//   return;
// }