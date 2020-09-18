import {findUser} from '../../lib/user.js'

export default (req, res) => {
    if (req.method=='POST'){
        console.log(req.body)
    }
    res.statusCode = 200
    res.json({ name: 'John Doe' })
  }
  