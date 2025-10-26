        // Función auxiliar para extraer texto entre dos delimitadores.
        // Es un método frágil, pero evita dependencias pesadas para este caso de uso.
        const getSubstring = (str, start, end) => {
            const startIndex = str.indexOf(start);
            if (startIndex === -1) return null;
            const endIndex = str.indexOf(end, startIndex + start.length);
            if (endIndex === -1) return null;
            return str.substring(startIndex + start.length, endIndex);
        };
        
        const title = getSubstring(html, '<h1 class="tt-title">', '</h1>');
        const price = getSubstring(html, '<span class="new-price">', '</span>');
        const imageContainerHtml = getSubstring(html, '<div class="zoomcontainer">', '</div>');
        const imageUrl = imageContainerHtml ? getSubstring(imageContainerHtml, 'src="', '"') : null;

        if (!title || !price || !imageUrl) {
            console.error("Scraping fallido para el código:", barcode, {title, price, imageUrl});
            throw new Error('No se pudo extraer la información del producto. El diseño de la página pudo haber cambiado.');
        }

        const productData = {
            titulo: title.trim(),
            precio: price.trim(),
            imagenUrl: imageUrl.trim()
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
