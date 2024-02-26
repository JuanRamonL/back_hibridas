import OpenAI from "openai";

const apiKey = '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'

const openai = new OpenAI({
    apiKey: apiKey
});

export const respuestaIa = async (req, res) => {

    try{
        const { prompt } = req.body;

        const content = `Necesito una entrada para blog sobre ${prompt}, esta debe ser de al manos 2000 caracteres, necesito que esté escrito en lenjuage html .ejemplo: <h2>titulo</h2> <p>texto</p>. No necesita la esctructura completa ya que lo voy a pegar sobre un contenedor div que ya tengo en mi blog. no son necesarias las etiquetas body y head. Los saltos de linea  no son necesarios. solo dame la info que te pido son despedirte ni saludar. solo necesito que respondas con codigo html. este lo voy a pegar directamente en mi blog, si lo que pego no está dentro de una etiqueta html se podria romper. gracias.`
            
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": content
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        
        console.log(response.choices[0].message.content)

        return res.status(201).json(response.choices[0].message.content)
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }


}

export const completarTextoIa = async (req, res) => {
    
        try{
            const { prompt } = req.body;
            const TextoAcorregir = `devolveme el mismo texto(En etiquetas de texto h2,h3, p, i ,b html, ), agregá al final del sigueinte texto 50 palabras mas:  "${prompt}"`
    
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "user",
                        "content": TextoAcorregir
                    }
                ],
                max_tokens: 4000,
                temperature: 0.7,
            });
    
            
            console.log(response.choices[0].message.content)
    
            return res.status(201).json(response.choices[0].message.content)
            
        }catch(error){
            console.log(error)
            res.status(500).json({message: 'Error en el servidor'})
        }
}

export const CorregirInfoTextoIa = async (req, res) => {
    
    try{
        const { prompt } = req.body;
        const TextoAcorregir = `corregí el siguiente texto: ${prompt}, necesito que esté escrito en lenjuage html .ejemplo: <h1>titulo</h1> <p>texto</p>. No necesita la esctructura completa ya que lo voy a pegar sobre un contenedor div que ya tengo en mi blog. No son necesarias las etiquetas body y head. Los saltos de linea no son necesarios en el texto que me envias, es devir enviame una etiqueta detras de otra ej:"<h2>titulo</h2><p>texto</p>". solo dame la info que te pido son despedirte ni saludar. solo necesito que respondas con codigo html. este lo voy a pegar directamente en mi blog, si lo que pego no está dentro de una etiqueta html se podria romper. gracias.`

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": TextoAcorregir
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        
        console.log(response.choices[0].message.content)

        return res.status(201).json(response.choices[0].message.content)
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }
}

export const CorregirTextoIa = async (req, res) => {
    
    try{
        const { prompt } = req.body;
        const TextoAcorregir = `corregí la sintaxis del siguiente texto: ${prompt}, el texto puede estár en lenguaje HTML, necesito  que omitas la corrección en las etiquetas y corrijas solo el texto que estas contienen. No son necesarias las etiquetas body y head. Colo dame la info que te pido sin despedirte ni saludar. Solo necesito que respondas con codigo html. No necesitoque corrijas la informacion redactada en las etiquetas, solo la sintaxis.`

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": TextoAcorregir
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        
        console.log(response.choices[0].message.content)

        return res.status(201).json(response.choices[0].message.content)
        
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }
}