import express from "express";
import { config } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler.ts";
import authRoutes from "./routes/authRoutes.ts";

config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
// TODO: Install cookie parser
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(
    "Auth API.\nPlease use POST api/auth/register & POST api/auth/login for authentication"
  );
});

app.use("/api/auth", authRoutes);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(
  cors({
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
