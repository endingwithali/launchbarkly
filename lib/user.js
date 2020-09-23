import {query} from './db.js'
import {hash} from './password.js'


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
    const hashedPassword = await hash(password)
    try{
        const result = await query('INSERT INTO user (email, hashedpassword) VALUES ("'+ email+'", "'+hashedPassword+'")')
        return result;
    } catch (error){
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
export async function findUser(email){
    try{
        const result = await query('SELECT * FROM user WHERE email = "'+email+'"')
        return result[0]
    } catch (error) {
        return null;
    }
}