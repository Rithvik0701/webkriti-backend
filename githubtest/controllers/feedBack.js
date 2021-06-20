const client = require('../config/db');
var { feedVerify , rate } = require('../Middlewares/feedback');


exports.addfeedback = (req, res) => {
  console.log("Inside controllers");
  // console.log(Rate.valueOf());
  const movieName = req.query.movieName;
  const { email, stars, feedbackText } = req.body;
  // console.log(rate);
  // console.log(querystring.parse(url));
  if (rate === 0) {
    
    client.query(`SELECT MAX(ratingcounter)  FROM FEEDBACK  WHERE movieName = '${movieName}';`)
    
      .then((data) => {
        let count =data.rows[0].max;
    count = count + 1;
        const {max} = data.rows[0]
        // client.query(`INSERT INTO FEEDBACK (movieName , email , ratingCounter , stars, feedbackText) values('${movieName}','${email}','${count}','${stars}' , '${feedbackText}');`)
        // console.log(max)
        // res.send({
        //   max
        // })
       
        res.status(200).json({
          message: "Feedback successfully Submitted"
          })
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error Submitting Feedback"
        })
      })

    
    
      
  }
  else {
    
    let count = 1 ;
    // client.query(`INSERT INTO FEEDBACK (movieName , email , ratingCounter , stars , feedbackText ) values('${movieName}','${email}','${count}','${stars}' , '${feedbackText}');`)
 
 
    res.send(data.rows)
 
 
 
    res.status(200).json({
      message: "Feedback successfully Submitted"
      })
  }
};


exports.addfeedback2 = (req, res) => {

  console.log(req.query.movieName)
  console.log(querystring.parse(url));
}