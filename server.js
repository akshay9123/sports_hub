import express from "express";
import connectDb from "./dbConn/dbConn.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();

// Routes
import useroutes from "./routes/user.routes.js";
import customerRoutes from "./routes/customer.routes.js"
import salesList from "./routes/salesPriceList.routes.js"

// Database Connection
connectDb();

const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));



// this is the routes mapping
app.get("/", (req, res) => {
  res.send("This is testing");
});

app.use("/api/user", useroutes);
app.use("/api/customer", customerRoutes)
app.use("/api/sales_list", salesList)


// server starting
app.listen(PORT, () => {
  console.log(`Listing on port no ${PORT}`);
});
