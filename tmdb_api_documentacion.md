# Documentación de la API de TMDb (The Movie Database)

Esta documentación reúne todos los endpoints, parámetros, propiedades clave y ejemplos útiles para trabajar con la API de TMDb, especialmente enfocado en el uso de imágenes para un carrusel y el desarrollo de apps con React Native o web.

---

## 🔐 Autenticación

Puedes autenticarte de dos formas:

### Opcion 1: API Key

- Pasar como parámetro de consulta:

```
?api_key=TU_API_KEY
```

### Opcion 2: Token Bearer

- Incluir en el header:

```
Authorization: Bearer TU_TOKEN_DE_ACCESO
```

## Para eso tengo las dos variables en .env TMDB_API_KEY, TMDB_ACCESS_TOKEN

## 🔧 Configuración global

**Endpoint:**

```
GET /configuration
```

**Ejemplo:**

```
https://api.themoviedb.org/3/configuration?api_key=TU_API_KEY
```

### Respuesta importante:

```json
{
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    "profile_sizes": ["w45", "w185", "h632", "original"],
    "still_sizes": ["w92", "w185", "w300", "original"]
  }
}
```

### Construcción de URLs de imagen:

```
https://image.tmdb.org/t/p/{tamaño}/{file_path}
```

Ejemplo:

```
https://image.tmdb.org/t/p/w780/abc123.jpg
```

---

## 🎬 Endpoints comunes de películas

### 🔢 Listado de películas populares

```
GET /movie/popular
```

Parámetros:

- `language=en-US`
- `page=1`
- `region=US`

### 📈 Top rated / Upcoming / Now playing

```
GET /movie/top_rated
GET /movie/upcoming
GET /movie/now_playing
```

Mismos parámetros que `/popular`

### 🔍 Buscar películas

```
GET /search/movie
```

Parámetros:

- `query=nombre`
- `year=2023`

### 🔎 Descubrir películas

```
GET /discover/movie
```

Parámetros opcionales:

- `with_genres`
- `with_cast`
- `primary_release_year`
- `sort_by=popularity.desc`

---

## 📃 Detalles completos de una película

```
GET /movie/{movie_id}
```

Parámetros extra:

```
append_to_response=credits,videos,images
```

### Campos importantes devueltos:

- `title`, `overview`, `release_date`, `vote_average`
- `poster_path`, `backdrop_path`
- `runtime`, `genres`, `production_countries`
- `videos.results`: lista de trailers y clips (ej. `key` de YouTube)
- `credits.crew`: buscar director por `job: "Director"`
- `images.backdrops` y `images.posters`

---

## 📹 Trailers y videos

```
GET /movie/{movie_id}/videos
```

Devuelve:

```json
{
  "results": [
    {
      "name": "Official Trailer",
      "key": "SUXWAEX2jlg",
      "site": "YouTube",
      "type": "Trailer"
    }
  ]
}
```

### URL completa del video:

```
https://www.youtube.com/watch?v={key}
```

---

## 👤 Cast & Crew (Créditos)

```
GET /movie/{movie_id}/credits
```

Filtrar por:

- `crew[job === "Director"]`
- `cast[]` contiene actores y personajes

---

## 🗂️ Ejemplo de flujo en código

```js
const config = await fetch('/configuration?api_key=...').then(res =>
  res.json(),
);
const list = await fetch('/movie/popular?api_key=...').then(res => res.json());

const posterUrl = `${config.images.secure_base_url}${config.images.poster_sizes[4]}${list.results[0].poster_path}`;
```

---

## 📁 Recursos adicionales

- Documentación oficial: [https://developer.themoviedb.org](https://developer.themoviedb.org)
- Explorador de API interactivo: [https://developer.themoviedb.org/reference](https://developer.themoviedb.org/reference)

---

## 🔗 Recomendaciones

- Usa `original` en tamaños si quieres la mejor calidad (pero cuidado con el peso).
- Evita múltiples llamadas por película, usa `append_to_response`.
- Documenta tus endpoints y campos clave para evitar buscar cada vez.
- Usa Postman o `requests.http` en VSCode para pruebas rápidas.

---

Este archivo se puede mantener en la raíz de tu proyecto como referencia de desarrollo.
