import {findUser} from '../../lib/user.js'
import {validate} from '../../lib/password.js'

export default async (req, res) => {
    if (req.method=='POST'){
        //need to check if username / password exist in body
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const result = await findUser(user.email)
        if (!result){
            res.statusCode = 500;
            res.json({error: "user not found"}) 
            return;
        }
        const equality = await validate(user.password, result.hashedpassword)
        if (equality){
            res.statusCode = 200
            res.json({message: "success"})
            return;
        } else {
            res.statusCode = 500;
            res.json({error: "invalid password"})
        }
    }
  }
  