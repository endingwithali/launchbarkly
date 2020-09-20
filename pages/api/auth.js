import {findUser} from '../../lib/user.js'
import {validate} from '../../lib/password.js'
import jsHttpCookie from 'cookie';

export default async (req, res) => {
    if (req.method=='POST'){
        //need to check if username / password exist in body
        const body = JSON.parse(req.body)
        const user = {
            email: body.email,
            password: body.password
        }
        const result = await findUser(user.email)
        if (!result){
            res.statusCode = 500;
            res.json({error: "user not found"}) 
            return;
        }
        if (validate(result, user.password)){
            res.statusCode = 200
            res.json({message: "success"})

            return;
        } else {
            res.statusCode = 500;
            res.json({error: "invalid password"})
        }
    }
  }
  