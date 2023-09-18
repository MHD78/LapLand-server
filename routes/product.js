import express from "express";
import { getEnumValues, addNewProduct, addNewCPU, addNewBrand, addNewCategory, getSingleProduct, addNewProductPic, getProductPics, getAllProducts, getAllCategories, getAllCPUs, getAllBrands, getAllProductsByCategory } from "../database/database.js"
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
    body('category_name', "category_name can not be empty.").notEmpty(),
    body('parent_id', "parent_id can not be empty.").notEmpty(),
], async (req, res) => resolver(req, res, addNewCategory))

productRouter.post("/addNewBrand", validateToken, validateUserAccess, [
    body('brand_name', "brand_name can not be empty.").notEmpty(),
], async (req, res) => resolver(req, res, addNewBrand))


productRouter.post("/addProductPic", validateToken, validateUserAccess, [
    body('product_id', "product_id can not be empty.").notEmpty(),
    body('is_default', "is_default can not be empty.").notEmpty(),
    body('pic_URL', "pic_URL can not be empty.").notEmpty()
], async (req, res) => resolver(req, res, addNewProductPic))

productRouter.post("/addNewProduct", validateToken, validateUserAccess, [
    body('stuck', "stuck can not be empty.").notEmpty(),
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
productRouter.get("/getCategories", async (req, res) => getResolver(req, res, getAllCategories))
productRouter.get("/getCPUs", async (req, res) => getResolver(req, res, getAllCPUs))
productRouter.get("/getBrands", async (req, res) => getResolver(req, res, getAllBrands))
productRouter.get("", async (req, res) => getResolver(req, res, getAllProducts))
productRouter.get("/getAllProductsBycategory/:category_id", async (req, res) => getResolver(req, res, getAllProductsByCategory))

export default productRouter