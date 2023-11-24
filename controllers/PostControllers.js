import {Post} from '../models/Post.js';


export const entradas = async (req, res) => {
    const posts = await Post.find();
    res.json({
        seccess: true,
        posts
    });
};

export const entradasPorId = async (req, res) => {
    try{
        const { id } = req.params;
        const post = await Post.findById(id);
        res.json(post);
    }catch(error){
        res.status(404).json({Estado: "No se pudo encontrar la entrada"});
    }
}

export const nuevaEntrada = async (req, res) => {
    try {
        const { title, desc, autorId } = req.body;

        console.log("nombre: " + autorId);
        console.log("title: " + title);
        console.log("desc: " + desc);

        let post = new Post({
            title: title,
            desc: desc,
            autorId: autorId,
        });

        await post.save();


        res.status(200).json({Estado: "Posteo creado correctamente", post});
    } catch (error) {
        res.status(404).json({Estado: "No se pudo crear la entrada"});
    }
};

export const eliminarEntrada = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json(
            {Estado: "Posteo eliminado correctamente",
            id: id
        }
            );
    } catch (error) {
        res.status(404).json({Estado: "No se pudo eliminar la entrada"});
    }
}  

export const editarEntrada = async (req, res) => {  
    try {
        const { id } = req.params;
        const { title, desc } = req.body;
        const post = await Post.findByIdAndUpdate(id, {title, desc});

        res.status(200).json({Estado: "Posteo actualizado correctamente", post});
        
    } catch (error) {
        res.status(404).json({Estado: "No se pudo actualizar la entrada"});
    }
}