import {createUser, findUser} from '../../lib/user.js'

export default async (req, res) => {
    if (req.method=='POST'){
        //need to check if username and password exist in body
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
                res.setHeader('Set-Cookie', 'logged-in')
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
  