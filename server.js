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
import priceCategory from './routes/priceCategory.routes.js'
import store from "./routes/store.routes.js"
import salesinvoice from "./routes/salesInvoice.routes.js"
import itemMaster from "./routes/itemMaster.routes.js"
import ItemGroup from "./routes/itemGroup.routes.js"
import Stockunit from "./routes/stockUnit.routes.js"
import gstClassification from "./routes/gstClassification.routes.js"
import itemCategroy from "./routes/itemCategory.routes.js"
import ItemBrand from "./routes/itemBrand.routes.js";
import salesPurchaseGl from "./routes/salesPurchaseGl.routes.js"
import coagroups from './routes/coaGroups.routes.js'
import stockadjustment from './routes/stockAdjustment.routes.js'
import documentcategoryinventroy from "./routes/documentCategoryInventroy.routes.js";
import locationMaster from "./routes/locationMaster.routes.js"
import interbranchtransfer from './routes/interBranchTransfer.routes.js'
import transporter from './routes/transporter.routes.js'
import poscustomermaster from './routes/posCustomerMaster.routes.js'
import posorder from './routes/posOrder.routes.js'
import counter from './routes/counter.routes.js'
import salesexecutive from './routes/salesExecutive.routes.js'

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
app.use("/api/price_category",priceCategory)
app.use("/api/store", store)
app.use("/api/salesinvoice", salesinvoice);
app.use("/api/item_master", itemMaster)
app.use("/api/item", ItemGroup)
app.use("/api/stockunit", Stockunit)
app.use("/api/gstclassification", gstClassification)
app.use("/api/itemcategory", itemCategroy)
app.use("/api/itembrand", ItemBrand)
app.use("/api/salespurchasegl", salesPurchaseGl);
app.use("/api/coagroups", coagroups)
app.use("/api/stockadjustment", stockadjustment)
app.use("/api/documentcategoryinventory", documentcategoryinventroy)
app.use("/api/locationmaster", locationMaster)
app.use("/api/interbranch", interbranchtransfer)
app.use("/api/transporter", transporter)
app.use("/api/poscustomermaster", poscustomermaster)
app.use("/api/posorder", posorder)
app.use("/api/counter",counter)
app.use("/api/salesexecutive", salesexecutive)


// server starting
app.listen(PORT, () => {
  console.log(`Listing on port no ${PORT}`);
});
