# Restaurant ApiREST

## Tarea 2 Taller de Integracion - Alfonso Aguirrebeña

Bienvenido a la Hamburgueseria

- Uso - Se recomienda utilizar un programa como Postman para utilizar las funciones [POST], [DELETE], [PATCH] y [PUT] de la api.

### Consultas que se pueden realizar:

- Hamburguesas
  - [GET] Obtener todas las hamburguesas: "/hamburguesa"
  - [GET] Obtener una hamburguesas by id: "/hamburguesa"
  - [POST] Crear una hamburguesa nueva by id: "/hamburguesa/id",
  - [DELETE] Eliminar una hamburguesa by id: "/hamburguesa/id",
  - [PATCH] Modificar una hamburguesa by id: "/hamburguesa/id",
  - [PUT] Agregar ingrediente a una hamburguesa: "/hamburguesa/{id_hamburguesa}/ingrediente/{id_ingrediente}"
  - [DELETE] Eliminar ingrediente de una hamburguesa: "/hamburguesa/{id_hamburguesa}/ingrediente/{id_ingrediente}"
                      
- Ingredientes
  - [GET] Obtener todas los ingredientes: "/ingrediente"
  - [GET] Obtener un ingrediente by id: "/ingrediente/id"
  - [POST] Crear un ingrediente nuevo by id: "/ingrediente/id"
  - [DELETE] Eliminar un ingrediente by id: "/ingrediente/id"

Se puede iniciar de maner locar clonando repositrorio y ejecutando en la terminal y en orden:

`npm i sqlite`

`npm run dev`

O bien se puede ingresar a través del siguiente [link][blog].

[blog]: https://mortyrickapp.herokuapp.com/
