import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import darkly from './LDClient'

/**
 * Hashes the password
 * 
 * @param {string} password 
 * 
 * 
 * @returns {string} password
 */
export function hash(password){
    darkly.once("ready", ()=>{
        darkly.variation("launchbarkly", {"key": "server"}, false,
            (err, show_feature) => {
                if (show_feature) {
                    console.log('showfeature')
                }
                else {
                    console.log('feature off')
                }
            });
    })
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
export function validate(user, password){
    const hash = password;
    return user.hashedpassword === hash;
}
