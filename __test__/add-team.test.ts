import request from "supertest";
import app from "../src/index";

import {
  dbDisconnect,
  connectInMemoryDB,
} from "../src/db/connect-in-memory-db";

const createTeamRoute = "/api/v1/teams/create";
const signUpRoutes = "/api/v1/auth/register";
const signinRoute = "/api/v1/auth/login";
const teamRoute = "/api/v1/teams";

let token: string;
let id: string;

beforeEach(async () => {
  await request(app).post(signUpRoutes).send(userData);
  const response = await request(app).post(signinRoute).send({
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

describe("Team", () => {
  describe("Teams Test", () => {
    // it("Create Team", async () => {
    //   const res = await request(app)
    //     .post(createTeamRoute)
    //     .set("Authorization", `Bearer ${token}`)
    //     .send({
    //       short_name: "Bayern",
    //       full_name: "Bayern",
    //       coach: "mario",
    //       size: 20,
    //     });
    //   console.log(res.body);
    //   expect(res.statusCode).toEqual(201);
    //   expect(res.body).toHaveProperty("message");
    //   expect(res.body).toHaveProperty("status");
    //   expect(res.body.status).toBe(201);
    //   expect(res.body.message).toBe("Successful!");
    // });

    it("Create Team with No Data", async () => {
      const res = await request(app)
        .post(createTeamRoute)
        .set("Authorization", `Bearer ${token}`)
        .send();
      console.log(res.body);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(400);
      expect(res.body.message).toBe("Error creating team");
    });

    it("View all Teams", async () => {
      const res = await request(app)
        .get(`${teamRoute}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.payload[0]).toHaveProperty("_id");
      expect(res.body.data.payload[0]).toHaveProperty("short_name");
      expect(res.body.data[0]).toHaveProperty("full_name");
      expect(res.body.status).toBe(200);
    });

    it("View a Team", async () => {
      const res = await request(app)
        .get(`${teamRoute}/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data.payload).toHaveProperty("_id");
      expect(res.body.data.payload).toHaveProperty("short_name");
      expect(res.body.data).toHaveProperty("full_name");
      expect(res.body.status).toBe(200);
    });

    it("Update Team", async () => {
      const res = await request(app)
        .patch(`${teamRoute}/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          full_name: "Bayern Munich",
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("status");
      expect(res.body.status).toBe(200);
      expect(res.body.message).toBe("Team successfully updated");
    });

    it("Delete Team", async () => {
      const res = await request(app)
        .delete(`${teamRoute}/${id}`)
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
