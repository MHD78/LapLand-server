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