import { app } from "../../../index.js";
import request from "supertest"

describe("Unit Test Event Controller" ,()=>{
    it("POST /event/new", async()=>{
        const payload = {
            name: "Test Event Name", 
            description: "Test Event Name Description", 
            date: "2024-12-04",
            venue:{
                name:"Event Venue Name ",
                lat:10.13142515,
                lng:21.12321451
            },
            mode:"online",
            creator:{
                email:"test.mail@nodejs.com",
                name: "test mail"
            }
        }
        const response = await request(app)
        .post("/event/new")
        .send(payload)
        .set("Content-Type", "application/json");

        // console.log(response)

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            message: "Event created successfully",
            // event: response,
            status: "Created",
        })

    })
})