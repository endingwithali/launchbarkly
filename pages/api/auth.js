import {findUser} from '../../lib/user.js'
import {validate} from '../../lib/password.js'

export default async (req, res) => {
    if (req.method=='POST'){
        console.log(req.body)
        //need to check if username / password exist in body
        const body = JSON.parse(req.body)
        console.log(body)
        const user = {
            email: body.email,
            password: body.password
        }
        console.log(user)
        const result = await findUser(user.email)
        console.log('meow')
        console.log(result)
        if (!result){
            console.log('result')
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
  