import bcrypt from 'bcrypt';
import sha256 from 'sha256';

/**
 * Hashes the password by first checking the status endpoint, and then using the hash algorithm based off that result 
 * 
 * @param {string} password
 * 
 * 
 * @returns {string} password
 */
export async function hash(password) {
  const method = await fetch(process.env.PASSWORD_SERVER, {
    method: 'get',
  }).then((result) => {
    return result.json();
  }).then((values) => {
    return values.type;
  })
  if (method === 'bcrypt') {
    return await bcrypt.hash(password, 10);
  } else {
    return sha256(password);
  }
}

/**
 * Validates password
 * 
 * @param {string} user's password to compare
 * @param {string} hashedpassword
 * 
 * @returns {boolean} true if same
 */
export async function validate(password, hashedPassword) {
  const method = await fetch(process.env.PASSWORD_SERVER, {
    method: 'get',
  }).then((result) => {
    return result.json();
  }).then((values) => {
    return values.type;
  });
  if (method === 'bcrypt') {
    return await bcrypt.compareSync(password, hashedPassword);
  } else {
    return hashedPassword == sha256(password);
  }  
}