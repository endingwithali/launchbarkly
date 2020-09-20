import {createUser, findUser} from '../../lib/user.js'
import {withIronSession} from 'next-iron-session'

export default withIronSession(
    async (req, res) =>{
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
                    req.session.set('user', {email: user.email})
                    await req.session.save();
                    res.statusCode = 200;
                    res.json({status: "success"})
                    return;
                } else {
                    res.statusCode = 500;
                    res.json({error: 'failed to add user'})
                }
                return;
            })
        }
    }, {
        cookieName: "LAUNCKBARKLY-TERRIERS",
        password: process.env.APPLICATION_SECRET
    }
)

// export default async (req, res) => {
//     if (req.method=='POST'){
//         const body = JSON.parse(req.body)
//         const user = {
//             email: body.email,
//             password: body.password
//         }
//         await findUser(user.email).then((resp)=>{
//             if (resp){
//                 res.statusCode = 500;
//                 res.json({error: 'user already exists in database'})
//             }
//         })
//         if (res.statusCode==500){
//             return;
//         }
//         await createUser(user).then((resp)=>{
//             if (resp.affectedRows>=1){
//                 res.statusCode = 200;
//                 res.setHeader('Set-Cookie', 'logged-in')
//                 res.json({status: "success"})
//                 return;
//             } else {
//                 res.statusCode = 500;
//                 res.json({error: 'failed to add user'})
//             }
//             return;
//         })
//     }
//   }
  