import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export const allUsers = async () => {
    const [result] = await pool.query("SELECT * FROM users")
    return result
}

export const createUser = async (email, password, token) => {
    const [result] = await pool.query("INSERT INTO users (email,password,reg_token) VALUES (?,?,?)", [email, password, token])
    return result.insertId
}

export const getUser = async (user_id) => {
    const [result] = await pool.query("SELECT * FROM users WHERE user_id=?", [user_id])
    return result[0]
}
export const getUserByEmail = async (email) => {
    const [result] = await pool.query("SELECT password,email,user_id,role_id,is_active FROM users WHERE email=?", [email])
    return result[0]
}

export const updateUser = async (user_id) => {
    const [result] = await pool.query("UPDATE users SET is_active=1 WHERE user_id=?", [user_id])
    return result
}

export const loginUser = async (email) => {
    const [result] = await pool.query("SELECT password,is_active FROM users WHERE email=?", [email])
    return result[0]
}

export const getUserAddresses = async (user_id) => {
    const [result] = await pool.query("SELECT * FROM addresses WHERE user_id=?", [user_id])
    console.log(result)
    return result
}
export const addUserAddress = async (user_id, state, city, address, zip_code, house_number) => {
    const [result] = await pool.query("INSERT INTO addresses (user_id,state,city,address,zip_code,house_number) VALUES (?,?,?,?,?,?)", [user_id, state, city, address, zip_code, house_number])
    return result[0]
}

export const getAllProducts = async () => {
    const [result] = pool.query("SELECT * FROM products")
    return result
}
export const getSingleProduct = async ({ product_id }) => {
    const result = await pool.query("SELECT * FROM products WHERE product_id=?", [product_id])
    return result[0]
}
export const addNewProduct = async ({ stuck, name, description, price, weight, brand_id, GPU_brand, GPU_vRAM, GPU_name, storage_type, storage_capacity, RAM_capacity, RAM_type, screen_size, screen_type, CPU_id, category_id }) => {
    const result = await pool.query("INSERT INTO products (stuck, name, description, price, weight, brand_id, GPU_brand, GPU_vRAM, GPU_name, storage_type, storage_capacity, RAM_capacity, RAM_type, screen_size, screen_type, CPU_id, category_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [stuck, name, description, price, weight, brand_id, GPU_brand, GPU_vRAM, GPU_name, storage_type, storage_capacity, RAM_capacity, RAM_type, screen_size, screen_type, CPU_id, category_id])
    console.log(result[0])
    // return result
}

export const addNewCPU = async ({ CPU_brand, CPU_serie, CPU_gen }) => {
    const result = pool.query("INSERT INTO CPU_data (CPU_brand, CPU_serie, CPU_gen) VALUES (?,?,?)", [CPU_brand, CPU_serie, CPU_gen])
    return result
}

export const addNewBrand = async ({ brand_name, brand_logo }) => {
    const result = pool.query("INSERT INTO brands (brand_name,logo) VALUES (?,?)", [brand_name, brand_logo])
    return result
}

export const addNewCategory = async ({ cayegory_name, parent_id }) => {
    const result = pool.query("INSERT INTO categories (category_name, parent_id) VALUES (?,?)", [cayegory_name, parent_id])
    return result
}

export const addNewProductPic = async ({ product_id, is_default, pic_URL }) => {
    const result = pool.query("INSERT INTO product_pictures (product_id, is_default, pic_URL ) VALUES (?,?,?)", [product_id, is_default, pic_URL])
    return result
}

export const getProductPics = async ({ product_id }) => {
    const result = await pool.query("SELECT * FROM product_pictures WHERE product_id=?", [product_id])
    return result[0]
}

export const getEnumValues = async () => {
    const [result] = await pool.query("select COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'store' AND TABLE_NAME = 'products' AND COLUMN_NAME = 'GPU_brand'")
    return result
}

