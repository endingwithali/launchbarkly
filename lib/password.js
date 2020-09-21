import darkly from './LDClient.js'

/**
 * Hashes the password
 * 
 * @param {string} password 
 * 
 * 
 * @returns {string} password
 */
export async function hash(password){
    // await darkly.once("ready",() =>{
    //     darkly.variation("launchbarkly", {"key": "server"}, false,
    //     (err, show_feature) => {
    //         if (show_feature) {
    //             console.log('showfeature')
    //         }
    //         else {
    //             console.log('feature off')
    //         }
    //     });
    // })
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
export async function validate(user, password){
    const hash = await hash(password);
    return user.hashedpassword === hash;
}


/*
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
*/