import {findUser} from '../../lib/user.js'
import {validate} from '../../lib/password.js'
import { resolve } from 'path'
import { resetWarningCache } from 'prop-types'
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
            res.setHeader(
                'Set-Cookie', 
                jsHttpCookie.serialize('token',process.env.APPLICATION_SECRET), 
                { 
                    maxAge: 10000000000, 
                    sameSite: 'none' 
                }
            )
            
            res.statusCode = 200
            res.json({message: "success"})

            return;
        } else {
            res.statusCode = 500;
            res.json({error: "invalid password"})
        }
    }
  }
  