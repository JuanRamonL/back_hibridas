import { Categorias } from "../models/Categorias.js";

export const categorias = async (req, res) => {
    const categorias = await Categorias.find();

    res.json({
        seccess: true,
        categorias
    });
}

export const categoriasPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const categoria = await Categorias.findById(id);

        if (!categoria) {
            return res.status(404).json({ Estado: "No se pudo encontrar la categoria" });
        }

        //console.log(categoria);
        res.status(200).json(categoria);
    } catch (error) {
        console.error("Error al buscar la categoria por ID:", error);
        res.status(500).json({ Estado: "Error interno del servidor" });
    }
}

export const nuevaCategoria = async (req, res) => {
    try {
        const { name } = req.body;

        console.log("name: " + name);

        let categoria = new Categorias({
            name,
        });

        await categoria.save();

        res.status(200).json({ Estado: "Categoria creada correctamente", categoria });
    } catch (error) {
        res.status(404).json({ Estado: "No se pudo crear la categoria" });
    }
}


export const modificarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        console.log("name: " + name);

        let categoria = await Categorias.findByIdAndUpdate(id, {
            name,
        });

        await categoria.save();

        res.status(200).json({ Estado: "Categoria modificada correctamente", categoria });
    } catch (error) {
        res.status(404).json({ Estado: "No se pudo modificar la categoria" });
    }
}

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        await Categorias.findByIdAndDelete(id);
        res.status(200).json(
            {
                Estado: "Categoria eliminada correctamente",
                id: id
            }
        );
    } catch (error) {
        res.status(404).json({ Estado: "No se pudo eliminar la categoria" });
    }
}