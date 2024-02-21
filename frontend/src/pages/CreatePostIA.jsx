import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import JoditEditor from 'jodit-react'
import { set } from "mongoose";



function CreatePostIA() {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState("")
    const [categories, setCategories] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState("")
    const navigate = useNavigate()

    const autor = localStorage.getItem('_id')

    const handleDesc = (e) => {
        setDesc(e)
    }

    const editor = useRef(null)
    const config = {
        placeholder: "Descripción del post"
    }

    useEffect(() => {
        fetch("http://localhost:2023/Api/v1/categorias")
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const sendTopic = (e) => {
        e.preventDefault()
    
        const newTopic = {
            prompt
        }
    
        setLoading(true)
    
    fetch('http://localhost:2023/Api/v1/consultasIa/chat', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTopic)
    })
    .then(response => response.json())
        .then(data => {
            console.log(data);
            

            // Expresión regular para buscar el primer h2
            let regex = /<h2>(.*?)<\/h2>/;
            let resultado = data.match(regex);

            let textoSinH2 = data.replace(regex, ''); // Elimina las etiquetas <h2> y </h2>

            setDesc(textoSinH2);

            if (resultado) {
                let textoExtraido = resultado[1]; // El grupo de captura (.*?) captura el texto dentro de las etiquetas <h2>
                setTitle(textoExtraido);
                console.log(textoExtraido); // Esto imprimirá: "Deliciosos patacones: una receta fácil y sabrosa"
            } else {
                console.log("No se encontraron etiquetas <h2> en el texto.");
            }

            setLoading(false);
    })
    .catch(error => {
          console.error('Error al enviar el tema:', error);
          setLoading(false);
    });

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = {
            title,
            desc,
            photo,
            categories: selectedCategory,
            autor
        }



        setLoading(true)


        fetch("http://localhost:2023/Api/v1/entradas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        }).then(() => {
            console.log("Se agrego el nuevo post")
            setLoading(false)
            console.log(newPost);
            navigate("/dashboard/posteos")
        })

        
    }

    return (
        <>
            <div className="container create-post-section">
                <h1 className="text-center py-5 fw-bold">Crear Post con IA</h1>
                <form action="#" onSubmit={sendTopic} method="POST">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9">
                            <label className="form-label w-100">
                                <span className="small">Tema</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />
                            </label>

                            {
                                !loading &&
                                <button type="submit" className="btn btn-success mt-3 mb-3 py-2 w-100">
                                    Crear Tema
                                </button>
                            }
                            {
                                loading &&
                                <button type="submit" className="btn btn-success mt-3 py-2 w-100">
                                    Creando Tema
                                </button>
                            }
                        </div>
                    </div>
                </form>
                <form action="#" onSubmit={handleSubmit} method="POST">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9">
                            <label className="form-label w-100">
                                <span className="small">Título</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <label className="form-label w-100">
                                <span className="small">Descripción</span>
                                <JoditEditor
                                    ref={editor}
                                    value={desc}
                                    config={config}
                                    onBlur={handleDesc}
                                >
                                    
                                </JoditEditor>
                            </label>
                            <label className="form-label w-100">
                                <span className="small">Imagen de Portada (URL)</span>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    value={photo}
                                    onChange={(e) => setPhoto(e.target.value)}
                                />
                            </label>
                            <label className="form-label w-100 mt-3">
                                <span className="small me-2">Seleccionar Categoria</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Seleccione una categoría
                                    </option>
                                    {categories.categorias?.map((cat) => (
                                        <option value={cat._id} key={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            {
                                !loading &&
                                <button type="submit" className="btn btn-primary mt-3 mb-3 py-2 w-100">
                                    Crear Post
                                </button>
                            }
                            {
                                loading &&
                                <button type="submit" className="btn btn-primary mt-3 py-2 w-100">
                                    Creando Post
                                </button>
                            }
                            <Link to={'/dashboard/posteos'} className='btn btn-warning py-2 w-100 mb-5'>
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreatePostIA