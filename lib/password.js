

/**
 * Hashes the password
 * 
 * @param {string} password 
 * 
 * 
 * @returns {string} password
 */
export function hash({password}){
    return password;
}

/**
 * Validates password 
 * 
 * @param {string} password
 * @param {object} user  
 * 
 * @returns {boolean} true if same
 */
export function validate({user, password}){
    const hash = password;
    return user.hashed_password === hash;
}
