import {findUser} from '../../lib/user.js'
import {validate} from '../../lib/password.js'

export default async (req, res) => {
    if (req.method=='POST'){
        //need to check if username / password exist in body
        const body = JSON.parse(req.body)
        const user = {
            email: body.email,
            password: body.password
        }
        const result = await findUser(user.email)
        console.log('meow')
        if (!result){
            res.statusCode = 500;
            res.json({error: "user not found"}) 
            return;
        }
        const equality =  validate(result, user.password)
        console.log('a')
        if (equality){
            console.log('here')
            res.statusCode = 200
            res.json({message: "success"})
            console.log('here')
            return;
        } else {
            res.statusCode = 500;
            res.json({error: "invalid password"})
        }
    }
  }
  