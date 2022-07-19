import request from "supertest";
import app from "../src/index";
import {
  dbDisconnect,
  connectInMemoryDB,
} from "../src/db/connect-in-memory-db";

const createFixtureRoute = "/api/v1/fixtures/create";
const signUpRoutes = "/api/v1/auth/register";
const signInRoutes = "/api/v1/auth/login";
const fixtureRoute = "/api/v1/fixtures";

let token: string;
let id: string;

beforeEach(async () => {
  await request(app).post(signUpRoutes).send(userData);
  const response = await request(app).post(signInRoutes).send({
    email: userData.email,
    password: userData.password,
  });
  token = response.body.token;
  id = response.body.data.data._id;
});

afterAll(async () => {
  await dbDisconnect();
});

const userData = {
  first_name: "Victor",
  last_name: "Mario",
  email: "mario@gmail.com",
  username: "marioG",
  role: "admin",
  password: "pass12345",
};

describe("Fixture", () => {
  describe("Fixtures Test", () => {
    it("Create Fixture", async () => {
      const res = await request(app)
        .post(createFixtureRoute)
        .set("Authorization", `Bearer ${token}`)
        .send({
          home_team: "manchester united",
          away_away: "chelsea",
          match_date: "2020-01-01",
        });
      console.log(res.body);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("status");
      expect(res.body.status).toBe(201);
      expect(res.body.message).toBe("Successful!");
    });

    it("Create Fixture", async () => {
      const res = await request(app)
        .post(createFixtureRoute)
        .set("Authorization", `Bearer ${token}`)
        .send({
          home_team: "Liverpool Fc",
          away_away: "Manchester City",
          match_date: "2022-11-11",
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("status");
      expect(res.body.status).toBe(201);
      expect(res.body.message).toBe("Successful!");
    });

    it("Create fixtures with No Data", async () => {
      const res = await request(app)
        .post(createFixtureRoute)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe("Error creating fixture");
    });

    it("Views all Fixtures", async () => {
      const res = await request(app)
        .get(`${fixtureRoute}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(200);
    });

    it("View a Fixture", async () => {
      const res = await request(app)
        .get(`${fixtureRoute}/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(200);
    });

    it("view Pending Fixtures", async () => {
      const res = await request(app)
        .get(`${fixtureRoute}/pending`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(200);
    });

    it("View Completed Fixtures", async () => {
      const res = await request(app)
        .get(`${fixtureRoute}/completed`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(200);
    });

    it("Update Fixtures", async () => {
      const res = await request(app)
        .patch(`${fixtureRoute}/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          home: "chelsea",
          away: "",
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe("Successful!");
    });

    it("Delete Fixture", async () => {
      const res = await request(app)
        .delete(`${fixtureRoute}/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body.status).toBe(200);
      expect(res.body.data).toBe({ payload: null });
      expect(res.body.message).toBe("Successful!");
    });
  });
});
