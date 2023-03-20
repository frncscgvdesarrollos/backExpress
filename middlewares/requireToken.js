import jwt from 'jsonwebtoken'

//token por cookie
// export const requireToken = (req, res, next) => {
//     try {
//         let token = req.cookie.token;
//         if(!token) throw new Error("no existe el token");
//         // token = token.split(" ")[1]
//         const {uid} = jwt.verify(token, process.env.JWT_SECRET)
//         req.uid = uid
//         next()
//     } catch (error) {

//         const TokenVerificationResponse={
//             "invalid signature":"la firma no es valida",
//             "jwt expired":"expiro la sesion",
//             "invalid token": "debe volver a loguearse",
//             "No Bearer":"Utiliza formato Bearer",
//             "jwt malformed":"jwt en formato invalido"
//         }
//         console.log(error)
//         return res.status(401)
//         .json({error: TokenVerificationResponse[error.message]})
//     }
// }

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if(!token) throw new Error("no existe el token");
        token = token.split(" ")[1]
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        next()
    } catch (error) {
        const TokenVerificationResponse={
            "invalid signature":"la firma no es valida",
            "jwt expired":"expiro la sesion",
            "invalid token": "debe volver a loguearse",
            "No Bearer":"Utiliza formato Bearer",
            "jwt malformed":"jwt en formato invalido"
        }
        console.log(error)
        return res.status(401)
        .json({error: TokenVerificationResponse[error.message]})
    }
}
