import {app} from "./index.js"
import request from "supertest"

describe("Unit Testes", ()=>{
    it("GET /api/test should return 200",async()=>{
        const response = await request(app).get("/api/test")
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Hello, World")
    })

})