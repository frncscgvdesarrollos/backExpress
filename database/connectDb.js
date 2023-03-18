import mongoose from "mongoose";
try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("connect with db is OK")
} catch (error) {
    console.log("hubo un error con la base de datos")
}