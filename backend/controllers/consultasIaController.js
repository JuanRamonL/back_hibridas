import OpenAI from "openai";

const apiKey = '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'

const openai = new OpenAI({
    apiKey: apiKey
});

export const respuestaIa = async (req, res) => {

    try{
        const { prompt } = req.body;

        const content = `Necesito una entrada para blog sobre ${prompt}, necesito que esté escrito en lenjuage html .ejemplo: <h1>titulo</h1> <p>texto</p>. No necesita la esctructura completa ya que lo voy a pegar sobre un contenedor div que ya tengo en mi blog. no son necesarias las etiquetas body y head. agregar en cada seccion una imagen con la url de la imagen y un link a la pagina de wikipedia del juego. Los saltos de linea  no son necesarios. solo dame la info que te pido son despedirte ni saludar. solo necesito que respondas con codigo html. este lo voy a pegar directamente en mi blog, si lo que pego no está dentro de una etiqueta html se podria romper. gracias.`
            
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": content
                }
            ],
            max_tokens: 2560,
            temperature: 0.7,
        });

        res.send(response.choices[0].message.content)

        console.log(response.choices[0].message.content)
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }


}