import { Router } from "express";
import multer from "multer";
import Request from "./model.js";
import jwt from "jsonwebtoken";
import { connectDb } from "../../config/db.js";

const router = Router();
const upload = multer({ dest: "uploads/" });
const { JWT_SECRET_KEY } = process.env;


const authenticate = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json("Token ausente");

    jwt.verify(token, JWT_SECRET_KEY, {}, (err, user) => {
        if (err) return res.status(403).json("Token inválido");
        req.user = user;
        next();
    });
};


router.post("/", authenticate, upload.array("photos"), async (req, res) => {
    connectDb();

    const { address, location } = req.body;
    const photoPaths = req.files.map((file) => file.path);

    try {
        const requestDoc = await Request.create({
            user: req.user._id,
            address,
            location: JSON.parse(location),
            photos: photoPaths,
        });

        res.status(201).json(requestDoc);
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar a requisição" });
    }
});

router.get("/", authenticate, async (req, res) => {
    connectDb();

    try {
        const requests = await Request.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar requisições" });
    }
});

export default router;
