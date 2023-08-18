import express from "express";
import { getEnumValues, addNewProduct, addNewCPU, addNewBrand, addNewCategory, getSingleProduct, addNewProductPic, getProductPics } from "../database/database.js"
import validateUserAccess from "../utils/userAccess.js";
import { validateToken } from "../utils/JWT.js";
import { body, validationResult } from "express-validator";
import resolver, { getResolver } from "../utils/requestResolver.js";
const productRouter = express.Router()

productRouter.post("/addNewCPU", validateToken, validateUserAccess, [
    body('CPU_brand', "CPU_brand can not be empty.").notEmpty(),
    body('CPU_serie', "CPU_serie can not be empty.").notEmpty(),
    body('CPU_gen', "CPU_gen can not be empty.").notEmpty(),
], async (req, res) => resolver(req, res, addNewCPU))

productRouter.post("/addNewCategory", validateToken, validateUserAccess, [
    body('cayegory_name', "cayegory_name can not be empty.").notEmpty(),
    body('parent_id', "parent_id can not be empty.").notEmpty(),
], async (req, res) => resolver(req, res, addNewCategory))

productRouter.post("/addNewBrand", validateToken, validateUserAccess, [
    body('brand_name', "brand_name can not be empty.").notEmpty(),
    body('brand_logo', "brand_logo can not be empty.").notEmpty(),
], async (req, res) => resolver(req, res, addNewBrand))


productRouter.post("/addProductPic", validateToken, validateUserAccess, [
    body('product_id', "product_id can not be empty.").notEmpty(),
    body('is_default', "is_default can not be empty.").notEmpty(),
    body('pic_URL', "pic_URL can not be empty.").notEmpty()
], async (req, res) => resolver(req, res, addNewProductPic))

productRouter.post("/addNewProduct", validateToken, validateUserAccess, [
    body('stuck', "bstuck can not be empty.").notEmpty(),
    body('name', "name can not be empty.").notEmpty(),
    body('description', "description can not be empty.").notEmpty(),
    body('price', "price can not be empty.").notEmpty(),
    body('weight', "weight can not be empty.").notEmpty(),
    body('GPU_brand', "GPU_brand can not be empty.").notEmpty(),
    body('GPU_vRAM', "GPU_vRAM can not be empty.").notEmpty(),
    body('GPU_name', "GPU_name can not be empty.").notEmpty(),
    body('storage_type', "storage_type can not be empty.").notEmpty(),
    body('storage_capacity', "storage_capacity can not be empty.").notEmpty(),
    body('RAM_capacity', "RAM_capacity can not be empty.").notEmpty(),
    body('RAM_type', "RAM_type can not be empty.").notEmpty(),
    body('screen_size', "screen_size can not be empty.").notEmpty(),
    body('screen_type', "screen_type can not be empty.").notEmpty(),
    body('CPU_id', "screen_size can not be empty.").notEmpty(),
    body('category_id', "screen_type can not be empty.").notEmpty(),
], async (req, res) => resolver(req, res, addNewProduct))

productRouter.get("/getProduct/:product_id", async (req, res) => getResolver(req, res, getSingleProduct))
productRouter.get("/getProductPics/:product_id", async (req, res) => getResolver(req, res, getProductPics))

export default productRouter