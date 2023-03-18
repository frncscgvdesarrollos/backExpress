export const register = (req,res)=>{
    res.json({ok:"register"});
};
export const login = (req,res)=>{
    console.log(req.body)
    res.json({ok:"login"})
};