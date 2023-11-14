var expect  = require("chai").expect;
var request = require("request");

describe("Test THA Endpoints", function() {

  describe("GET /files", function() {

    var url = "http://localhost:3000/files";

    it("Get a list of files from the server", function() {
      request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.succeed).to.equal(true);
        expect(body.files.length).to.greaterThan(0);
      });
    });

  });

  describe("GET /search", function() {
    var url = "http://localhost:3000/search";
    it("Invalid Query", function() {
      request(url, function(error, response, body) {
        body = JSON.parse(body)
        expect(body.message).to.equal("invalid query");
      });
    });

    it("Get result", function() {
      request(url+"?filename=example1.log&count=10&filter=received", function(error, response, body) {
        body = JSON.parse(body)
        expect(body.logs.length).to.equal(10);
      });
    });
  });
});