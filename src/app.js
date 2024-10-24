import express from "express";
import env from "dotenv";
import path from "path";
import mongoose from "mongoose";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { dirname } from "path";

import router from "./routes/index.js";
import session from "express-session";
import RedisStore from "connect-redis";

import { connectToRedis, getRedis } from "./utils/redis.js";
import { initializeLoginWithGoogleService } from "./utils/google.js";
import passport from "passport";

const app = express();
env.config();

const PORT = process.env.PORT || 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.set("layout extractScripts", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeSession = (redisClient) => {
    app.use(
        session({
            store: new RedisStore({ client: redisClient }),
            secret: process.env.SESSION_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
        })
    );
};

(async () => {
    try {
        // Connect to Redis and initialize session
        await connectToRedis();
        const redisClient = getRedis();
        initializeSession(redisClient);

        // Connect to MongoDB
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);

        console.log("Database connected 🚀");

        // Middleware to pass session to views
        app.use((req, res, next) => {
            res.locals.session = req.session;
            next();
        });

        // Use routes after session is initialized
        app.use(router);

        // Initialize Google login
        initializeLoginWithGoogleService();
        app.use(passport.initialize());
        app.use(passport.session());

        app.get("/", (req, res) => {
            res.render("index");
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Error:", error.message);
        process.exit(1);
    }
})();
