const client = require('../config/db')

exports.seatdata = (req, res, next) => {
    
    const { seats } = req.body
    const movieName = req.query.movieName;

    for (let i = 0; i <= seats.length; i++) {
    
        client.query(`INSERT INTO SEATDB (moviename , seat ) values ('${movieName}' , '${seats[i]}');`)
            
    }
    console.log("Sahi chala")
    next();
}