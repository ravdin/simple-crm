import { IsNull } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import * as express from "express";
import { UserNote } from "./entity/UserNote";

const run = async () => {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager.getRepository(User).find();
        res.json(users);
    });
    app.get("/user/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.id  } });
        res.json(user);
    });
    app.post("/users", async (req, res) => {
        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.put("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.id } });
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.post("/users/notes", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.body.id }});
        if (user === null) {
            res.status(404);
            return;
        }
        const userNote = new UserNote();
        userNote.user = user;
        userNote.note = req.body.note;
        await AppDataSource.manager.getRepository(UserNote).save(userNote);
        res.json(user);
    });
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};

run();
