const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../config/db')

//  const tempdata = [
//     {
// username : "Dronzer",
// email : "Dronzer@gmail.com",
// password: "123456",
// },
// {
// username : "firestorm",
// email : "firestorm@gmail.com",
// password: "123456",
// },
// {
// username : "harsh",
// email : "harsh@gmail.com",
// password: "123456",
// }
    
// ]

exports.signUp = (req, res) => {
//     {
//         username = Dronzer,
//             email = Dronzer@gmail.com,
//         password= 123456
// }
    
    
    
    const { username, email, password } = req.body;
    console.log(username, " ", email, " ", password);
    //NOTE: check for exeistance of username and email
// const valid = tempdata.findIndex((ele) => ( ele.email === email));

  client.query(`select * from users where email = '${email}'`)
      .then((data) => {
            // console.log(data);
          const valid = data.rows;
            if (valid.length != 0) {
                res.status(400).json({
                    error: "Email already exist"
                });
          }
            else {
                
                // console.log(token);
                
                    //NOTE: Hash password
                
                    bcrypt.hash(password, 12, (err, hash) => {
                
                        if (err) {
                            res.status(500).json({
                                error: "Internal server error"
                            })
                        }
                        const user = {
                            username,
                            email,
                            password: hash,
                        };
                        client.query(`INSERT INTO USERS (username, email, password) VALUES('${user.username}', '${user.email}', '${user.password}')`)
                            .then((data) => {
                                console.log(data);
                                var token = jwt.sign({
                                    username: username,
                                    email: email,
                                    
                                },
                                    process.env.SECRET_KEY
                                );
                                res.status(200).json({
                                    message: "User added successfully",
                                    token: token,
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({                                    
                                    error: "Database Error! "
                                })
                            })

                        // tempdata.push(user);
                        // console.log(tempdata);
                        // res.status(200).send(hash);
                        // Store hash in your password DB.
                    });
                    //NOTE:Generate token
                 
                    
                    
                
          }
                
            
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: "Database Error! "
            })
        });

    //NOTE : send response to user along with token .

   
};

// --------------------------------------------------------------------------------------------------------

exports.signIn = (req, res) => {
       const { email, password } = req.body;
  
        client.query(`SELECT * FROM users WHERE email = '${email}';`)
      .then((data) => {
        userData = data.rows;
        
  
         if (userData.length === 0) {
        
          res.status(400).json({
            error: "User does not exist, signup instead!",
          });
        } else {
          
          bcrypt.compare(password, userData[0].password, (err, result) => {
            if (err) {
              
              res.status(500).json({
                error: "Server error!",
              });
            } else if (result === true) {
              
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );
              res.status(200).json({
                message: "User signed in successfully",
                token: token,
              });
            } else {
             
              res.status(400).json({
                error: "Enter correct password!",
              });
            }
          });
        }
      })
      .catch((err) => {
       
          res.status(500).json({
              error: "Database error occurred!",
          });
        });
    };

// exports.signIn = (req, res) => {

//     const { email, password } = req.body;
//     console.log(email, " ", password);
//     //NOTE: check for exeistance of username and email
// // const valid = tempdata.findIndex((ele) => ( ele.email === email));

//   client.query(`select * from users where email = '${email}'`)
//       .then((data) => {
//             // console.log(data);
//           const userData = data.rows;
//             if (userData.length == 0) {
//                 res.status(400).json({
//                     error: "Email does not exist , Try sign up "
//                 });
//           }
//             else {
                
//                 // console.log(token);
                
//                     //NOTE: Hash password
                
//                 bcrypt.compare(password, userData.password, (err, result) => {
                    
//                         // result == true
//                 });
                    
                        
//                         client.query(`INSERT INTO USERS (username, email, password) VALUES('${user.username}', '${user.email}', '${user.password}')`)
//                             .then((data) => {
//                                 console.log(data);
//                                 var token = jwt.sign({
//                                     username: username,
//                                     email: email,
                                    
//                                 },
//                                     process.env.SECRET_KEY
//                                 );
//                                 res.status(200).json({
//                                     message: "User added successfully",
//                                     token: token,
//                                 })
//                             })
//                             .catch((err) => {
//                                 console.log(err);
//                                 res.status(500).json({                                    
//                                     error: "Database Error! "
//                                 })
//                             })

//                         // tempdata.push(user);
//                         // console.log(tempdata);
//                         // res.status(200).send(hash);
//                         // Store hash in your password DB.
//                     });
//                     //NOTE:Generate token
                 
                    
                    
                
//           }
                
            
            
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json({
//                 error: "Database Error! "
//             })
//         });
// };

