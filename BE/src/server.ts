import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";
import authRouter from "./routes/authRouter";
import resetPasswordRouter from "./routes/PasswordResetRoutes";
import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";
import avatarRouter from "./routes/avatarRouter";
import commentRouter from "./routes/commentRouter";
import followRouter from "./routes/followRouter";
import "dotenv/config";

class AppServer {
  private app: Application;
  private port: number;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.initializeDatabase();
    this.setMiddlewares();
    this.setRoutes();
  }
  private async initializeDatabase(): Promise<void> {
    try {
      await connectDB();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to Database: ", error);
    }
  }
  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  private setRoutes(): void {
    this.app.use("/api/auth", authRouter);
    this.app.use("/api", resetPasswordRouter);
    this.app.use("/api/post", postRouter);
    this.app.use("/api", userRouter);
    this.app.use("/api", avatarRouter);
    this.app.use("/api", commentRouter);
    this.app.use("/api", followRouter);
  }

  public startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
const app = new AppServer();
app.startServer();
