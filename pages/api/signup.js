import {createUser, findUser} from '../../lib/user.js'
import jsHttpCookie from 'cookie';

export default async (req, res) => {
    if (req.method=='POST'){
        const body = JSON.parse(req.body)
        const user = {
            email: body.email,
            password: body.password
        }
        await findUser(user.email).then((resp)=>{
            if (resp){
                res.statusCode = 500;
                res.json({error: 'user already exists in database'})
            }
        })
        if (res.statusCode==500){
            return;
        }
        await createUser(user).then((resp)=>{
            if (resp.affectedRows>=1){
                res.statusCode = 200;
                res.setHeader(
                    'Set-Cookie',  //i should work on this to make sure it actually sets the cokoies to a value
                    jsHttpCookie.serialize('barkToken',process.env.APPLICATION_SECRET), 
                    { 
                        maxAge: 10000000000, 
                        sameSite: 'none' 
                    }
                )
                res.json({status: "success"})
                return;
            } else {
                res.statusCode = 500;
                res.json({error: 'failed to add user'})
            }
            return;
        })
    }
  }
  