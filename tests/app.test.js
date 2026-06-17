const request = require("supertest");
const app = require("../server");

describe("Attendance Management System APIs", () => {

    // 1️⃣ Add Student (Valid)
    test("POST /student - should add student", async () => {
        const res = await request(app)
            .post("/student")
            .send({ id: 1, name: "Ali" });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Student added successfully");
    });

    // 2️⃣ Add Student (Invalid)
    test("POST /student - should fail on invalid data", async () => {
        const res = await request(app)
            .post("/student")
            .send({ id: "" });

        expect(res.statusCode).toBe(400);
    });

    // 3️⃣ Get Students
    test("GET /students - should return students", async () => {
        const res = await request(app).get("/students");

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // 4️⃣ Mark Attendance (Valid)
    test("POST /attendance - mark attendance", async () => {
        const res = await request(app)
            .post("/attendance")
            .send({
                id: 1,
                date: "2026-06-17",
                status: "Present"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Attendance marked successfully");
    });

    // 5️⃣ Mark Attendance (Invalid student)
    test("POST /attendance - student not found", async () => {
        const res = await request(app)
            .post("/attendance")
            .send({
                id: 999,
                date: "2026-06-17",
                status: "Present"
            });

        expect(res.statusCode).toBe(404);
    });

});