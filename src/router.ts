import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator"
import { handleInputErrors } from "./modules/middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/updates";

const router = Router();

/* PRODUCT */
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put("/product/:id", body('name').exists().isString(), handleInputErrors, updateProduct);
router.post("/product", body('name').exists().isString(), handleInputErrors, createProduct);
router.delete("/product/:id", deleteProduct);

/* UPDATE */
router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put("/update/:id", 
body('title').optional(), 
body('body').optional(),
body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
body('version').optional(), 
handleInputErrors, 
updateUpdate);
router.post("/update",
body('title').exists().isString(),
body('body').exists().isString(),
body('version').optional(),
body('asset').optional(), 
handleInputErrors, 
createUpdate);
router.delete("/update/:id", deleteUpdate);

/* UPDATE POINT */
router.get("/updatepoints", () => {});
router.get("/updatepoints/:id", () => {});
router.put("/updatepoints/:id", 
body('name').optional().isString(), 
body('description').optional().isString(), 
handleInputErrors, 
() => {});
router.post("/updatepoints", 
body('name').exists().isString(), 
body('description').exists().isString(),
body('updteId').exists().isString(),
handleInputErrors, 
() => {});
router.delete("/updatepoints/:id", () => {});

/* USER */
router.get("/user", () => {});
router.get("/user/:id", () => {});
router.put("/user/:id", () => {});
router.post("/user", () => {});
router.delete("/user/:id", () => {});

export default router;
