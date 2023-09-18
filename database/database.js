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
export const promoteUser = async ({ user_id }) => {
    const result = await pool.query("UPDATE users SET role_id=2 WHERE user_id=? AND is_active=1", [user_id])
    if (result[0].affectedRows) {
        return { code: 200, message: "user promoted to admin." }
    } else {
        throw new Error()
    }
}

export const loginUser = async (email) => {
    const [result] = await pool.query("SELECT password,is_active FROM users WHERE email=?", [email])
    return result[0]
}

export const getUserAddresses = async (user_id) => {
    const [result] = await pool.query("SELECT * FROM addresses WHERE user_id=?", [user_id])
    // console.log(result)
    return result
}
export const addUserAddress = async (user_id, state, city, address, zip_code, house_number) => {
    const [result] = await pool.query("INSERT INTO addresses (user_id,state,city,address,zip_code,house_number) VALUES (?,?,?,?,?,?)", [user_id, state, city, address, zip_code, house_number])
    return result[0]
}

export const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products INNER JOIN product_pictures ON products.product_id = product_pictures.product_id  WHERE product_pictures.is_default=1")
    return result[0]
}
export const getAllProductsByCategory = async ({ category_id }) => {
    const result = await pool.query("SELECT * FROM products INNER JOIN product_pictures ON products.product_id = product_pictures.product_id  WHERE products.category_id=? AND product_pictures.is_default=1 ", [+category_id])
    return result[0]
}

export const getSingleProduct = async ({ product_id }) => {
    const pics = await getProductPics({ product_id })
    const product = await pool.query("SELECT * FROM products INNER JOIN brands ON products.brand_id = brands.brand_id INNER JOIN cpu_data ON products.CPU_id = cpu_data.cpu_id WHERE product_id =?", [product_id])
    if (product[0].length == 0) {
        throw new Error()
    } else {
        const mutatedProduct = product[0].map(product => { return { ...product, pics: [...pics] } })
        return mutatedProduct[0]
    }
}
export const addNewProduct = async ({ stuck, name, description, price, weight, brand_id, GPU_brand, GPU_vRAM, GPU_name, storage_type, storage_capacity, RAM_capacity, RAM_type, screen_size, screen_type, CPU_id, category_id }) => {
    const result = await pool.query("INSERT INTO products (stuck, name, description, price, weight, brand_id, GPU_brand, GPU_vRAM, GPU_name, storage_type, storage_capacity, RAM_capacity, RAM_type, screen_size, screen_type, CPU_id, category_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [stuck, name, description, price, weight, brand_id, GPU_brand, GPU_vRAM, GPU_name, storage_type, storage_capacity, RAM_capacity, RAM_type, screen_size, screen_type, CPU_id, category_id])
    return result[0].insertId
}

export const addNewCPU = async ({ CPU_brand, CPU_serie, CPU_gen }) => {
    const result = pool.query("INSERT INTO CPU_data (CPU_brand, CPU_serie, CPU_gen) VALUES (?,?,?)", [CPU_brand, CPU_serie, CPU_gen])
    return result
}
export const getAllCPUs = async () => {
    const result = await pool.query("SELECT * FROM CPU_data")
    return result[0]
}

export const addNewBrand = async ({ brand_name }) => {
    const result = pool.query("INSERT INTO brands (brand_name) VALUES (?)", [brand_name])
    return result
}
export const getAllBrands = async () => {
    const result = await pool.query("SELECT * FROM brands ")
    return result[0]
}

export const addNewCategory = async ({ category_name, parent_id }) => {
    const result = pool.query("INSERT INTO categories (category_name, parent_id) VALUES (?,?)", [category_name, parent_id])
    return result
}

export const getAllCategories = async () => {
    const result = await pool.query("SELECT * FROM categories")
    return result[0]
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

export const addNewOrder = async (cart) => {
    console.log(cart)
    const [result] = await pool.query("INSERT INTO orders (user_id, address_id) VALUES (?,?)", [cart.metadata.user, cart.metadata.address])
    console.log(result.insertId)
    const realData = Object.values(cart.data)
    console.log(realData)
    realData.map(p => pool.query("INSERT INTO orders_products (order_id, product_id, product_count) VALUES (?,?,?)", [result.insertId, p.product_id, 10]))
    // return result
}


