// Import supertest for HTTP requests
const request = require("supertest");
// note that we take advantage of @jest/globals (describe, it, expect, etc.)
// API for expect can be found here: https://jestjs.io/docs/expect
const apiUrl = "http://localhost:3000";

describe("Endpoint tests", () => {
    // Test our departures get request
    test("GET departures, testing if we can get all departures", async () => {
        const res = await request(apiUrl).get("/api/v1/departures/flights");
        // Check if we are recieving a status code 200 upon a successful GET Request
        expect(res).toHaveProperty("statusCode", 200);
        // Check if we get at least a response body
        expect(res.body).toBeDefined();
        // Check if the response body is an array
        expect(res.body).toBeInstanceOf(Array);

        // Check if all objects that are returned have the Departure property set to true
        // Otherwise they would not be a departure!
        res.body.forEach(obj => {
            expect(obj).toHaveProperty("Departure", true);
        });
    });

    test("GET arrivals, testing if we can get all arrivals", async () => {
        const res = await request(apiUrl).get("/api/v1/arrivals/flights");
        // Check if we are recieving a status code 200 upon a successful GET request
        expect(res).toHaveProperty("statusCode", 200);
        // Check if we are getting a response body
        expect(res.body).toBeDefined();
        // Check if the response body is an array
        expect(res.body).toBeInstanceOf(Array);

        res.body.forEach(obj => {
            expect(obj).toHaveProperty("Departure", false);
        });

    });

    test("GET arrivals only flights where AirlineIATA = FI", async () => {
        const res = await request(apiUrl).get("/api/v1/arrivals/flights?filter[AirlineIATA]=FI");

        expect(res).toHaveProperty("statusCode", 200);

        expect(res.body).toBeDefined();

        expect(res.body).toBeInstanceOf(Array);

        res.body.forEach(obj => {
            expect(obj).toHaveProperty("AirlineIATA", "FI");
            // Expect the beginning of the flight number to be 'FI'
            expect(obj.No.slice(0,2)).toEqual("FI");
        });

    });
});