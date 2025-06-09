import "dotenv/config";
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("conexão deu certo");
    } catch (error) {
        console.log("conexão deu errado", error);
    }

}

