const jwt = require("jsonwebtoken")

function auth(req, res, next) {
    const bearerToken = req.headers["authorization"]
    if (typeof bearerToken === "undefined")
        return res.status(401).json({
            type: "authorization",
            message: "Access denied. Please login to continue."
        })

    jwt.verify(bearerToken.split(" ")[1], process.env.JWT_SECRET, 
        (err, decoded) => {
            if (err) return res.status(401)
            
            req.user = decoded
            next()
        }
    )
}