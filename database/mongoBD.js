import mongoose from "mongoose";
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog');
}

main()
    .then(() => console.log('Conectado a la base de datos 💦💦'))
    .catch(err => console.log("Ta' re quebrado tu codigo 🤬🤬🤬"));
