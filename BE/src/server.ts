import express, { Application } from "express";
import cors from "cors";
import connectDB from "./config/db";

class AppServer {
  private app: Application;
  private port: number;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.initializeDatabase();
    this.setMiddlewares();
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

  public startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}
const app = new AppServer();
app.startServer();
