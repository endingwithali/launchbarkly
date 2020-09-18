import {query} from './db.js'
import {hash} from './password.js'
import moment from 'moment'


/**
 * Creates new users in database 
 * 
 * @param {string} email
 * @param {string} password
 * 
 * @returns {string} user object if sucess
 * @returns {null} if creation fails
 */
export async function createUser({email, password}){
    const hashedPassword = hash(password)
    const user = {
        creationTime: moment.format('YYYY-MM-DD HH:mm:ss'),
        email, 
        hashedPassword
    }

    try{
        const result = await query({
            query: 'INSERT INTO users (creationTime, email, hashedPassword), VALUES(?, ?, ?)',
            values: [user.creationTime, user.email, user.hashedPassword]
        });
        console.log(result)
        return user;
    } catch (error){
        console.log(error)
        return null;
    }
}


/**
 * Looks up user in DB 
 * @param {string} email 
 * 
 * @returns {object} user object if user found??? 
 * @returns {null} if no user found????
 * 
 * @todo 
 */
export async function findUser({email}){
    try{
        const result = await query({
            query: 'SELECT * FROM users WHERE email = ?',
            values: [email]
        })
        return result[0]
    } catch (error) {
        console.log(error)
        return null;
    }
}