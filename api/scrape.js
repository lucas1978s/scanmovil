        // Función auxiliar robusta para extraer texto usando expresiones regulares.
        const getMatch = (regex, text) => {
            const match = text.match(regex);
            // Devuelve el primer grupo de captura, eliminando espacios en blanco.
            return match && match[1] ? match[1].trim() : null;
        };
        
        // Expresiones regulares para extraer los datos. La bandera 's' permite que '.' coincida con saltos de línea.
        const title = getMatch(/<h1 class="tt-title">(.*?)<\/h1>/s, html);
        const price = getMatch(/<span class="new-price">(.*?)<\/span>/s, html);
        const imageUrl = getMatch(/<div class="zoomcontainer">.*?<img.*?src="(.*?)"/s, html);

        if (!title || !price || !imageUrl) {
            console.error("Scraping fallido para el código:", barcode, {title, price, imageUrl});
            throw new Error('No se pudo extraer la información. El diseño de la página pudo haber cambiado.');
        }

        const productData = {
            titulo: title,
            precio: price,
            imagenUrl: imageUrl
        };
        
        // Devolver los datos extraídos como JSON
        return new Response(JSON.stringify(productData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message || 'Error interno del servidor' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

