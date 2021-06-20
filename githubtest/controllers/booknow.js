const client = require('../config/db');
//email from token 

exports.bookNow = (req, res) => {
  
    
    const { seats, date, persons, email } = req.body;
    const movieName = req.query.movieName;
    
    // const seatobj = JSON.stringify(seats);
    // const seatobj  =JSON.stringify(Object.assign({}, seats))


        console.log(movieName, " ", seats, " ", date, " ", persons)
        
    

    client.query(`INSERT INTO BOOKINGSDB (movieName ,email, seats,date ) values('${movieName}' , '${email}' ,  '{${seats}}' , '${date}') ;`)
        .then(
            res.status(200).json({
                message: "Movie booked succesfully"
            })
        ).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Error Submitting Feedback"
            })
        });
    
    

};
