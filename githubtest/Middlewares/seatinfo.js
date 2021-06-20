const client = require('../config/db')

exports.seatdata = (req, res, next) => {
    
    const { seats } = req.body
    const movieName = req.query.movieName;
    console.log(seats);
    for (let i = 0; i < seats.length; i++) {
        var seatno = seats[i];
        console.log(seatno)
        client.query(`INSERT INTO SEATDB (moviename , seat ) values ('${movieName}' , '${seatno}');`);
            
    }
    console.log("Sahi chala")
    next();
};