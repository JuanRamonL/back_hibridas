
import {Post} from '../models/Post.js';


export const entradas = async (req, res) => {
    
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    let query = {}
    
    try {

        const posts = await Post.find(query)
            .populate({ path: "autor", select: "username" })
            .populate({ path: "categories", select: "name" })
            .sort({ updatedAt: -1 })
            .skip(page * limit)
            .limit(limit)
            .exec()

        const count = await Post.countDocuments()

        res.json({
            posts,
            info: {
                page: page,
                pageSize: posts.length,
                count
            }
        })

    } catch (error) {
        return res.status(500).json({ msg: error })
    }

};

export const entradasPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id).populate({ path: "autor", select: "username" }).populate({ path: "categories", select: "name" });

        if (!post) {
            return res.status(404).json({ Estado: "No se pudo encontrar la entrada" });
        }

        //console.log(post);
        res.status(200).json(post);
    } catch (error) {
        console.error("Error al buscar la entrada por ID:", error);
        res.status(500).json({ Estado: "Error interno del servidor" });
    }
}

export const entradasPorAutor = async (req, res) => {
    try {
        
        const { idAutor } = req.params
        
        const postAutor = await Post.find({ autor: idAutor })
            .populate({ path: "autor", select: "username" })
            .populate({ path: "categories", select: "name" })
            .sort({ updatedAt: -1 })

        if(!postAutor) {
            return res.status(404).json({ Estado: "No se pudieron encontrar las entradas por el autor" })
        }

        res.status(200).json(postAutor)

    } catch (error) {
        res.status(500).json({Estado: "Error al buscar las entrada por Autor", error});
    }
}

export const nuevaEntrada = async (req, res) => {
    try {
        const { title, desc, photo, autor, categories } = req.body;

        console.log("nombre: " + autor);
        console.log("title: " + title);
        console.log("desc: " + desc);
        console.log("photo: " + photo);
        console.log("categories: " + categories);

        let post = new Post({
            title,
            desc,
            photo,
            autor,
            categories,
        });

        await post.save();


        res.status(201).json({Estado: "Posteo creado correctamente", post});
    } catch (error) {
        res.status(404).json({Estado: "No se pudo crear la entrada, verifique que el usuario y la categoria existan"});
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
        const { title, desc, photo } = req.body;
        const post = await Post.findByIdAndUpdate(id, {title, desc, photo});

        await post.save();

        res.status(200).json({Estado: "Posteo actualizado correctamente", post});
        
    } catch (error) {
        res.status(404).json({Estado: "No se pudo actualizar la entrada"});
    }
}