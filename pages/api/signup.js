import {createUser, findUser} from '../../lib/user.js'

export default async (req, res) => {
    if (req.method=='POST'){
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        await findUser(user.email).then((resp)=>{
            if (resp){
                res.statusCode = 500;
                res.json({error: 'User already exists in database'})
            }
        })
        if (res.statusCode==500){
            return;
        }
        await createUser(user).then((resp)=>{
            if (resp.affectedRows>=1){
                res.statusCode = 200;
                res.json({status: "success"})
                return;
            } else {
                res.statusCode = 500;
                res.json({error: 'Failed to add user, try again'})
            }
            return;
        })
    }
  }
  