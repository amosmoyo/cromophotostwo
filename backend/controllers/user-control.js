const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../model/user-schema');

exports.signupUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });

    user.save()
    .then(document => {
      res.status(200).json({
        message: 'New user has been added to the database',
        document: document
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "the email you are using aready exits"
      })
    })
  })

}


exports.loginUser = (req, res, next) => {
  let user;
  User.findOne({email: req.body.email})
  .then(document => {
    if (!document) {
      res.status(401).json({
        message: "you do not have an account signup to create one"
      })
    }

    user = document;

    console.log(user);

    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      res.status(401).json({
        message: "Oops... enter correct password."
      })
    }

    const token = jwt.sign(
      {email: user.email, id: user._id, name:user.name},
       process.env.jwt_key,
      {expiresIn: "1h"}
    )

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      creatorId: user.id,
      creatorName: user.name,
    })
  })
  .catch( err => {
    res.status(500).json({
      message: "Authetification failed amos"
    })
  })
}
