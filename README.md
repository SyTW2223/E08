# Aplicación MERN - Utopia 
[![Tests FrontEnd](https://github.com/SyTW2223/E08/actions/workflows/frontTests.yml/badge.svg)](https://github.com/SyTW2223/E08/actions/workflows/frontTests.yml)
[![Tests BackEnd](https://github.com/SyTW2223/E08/actions/workflows/backTest.yml/badge.svg)](https://github.com/SyTW2223/E08/actions/workflows/backTest.yml)
[![Coverage Status](https://coveralls.io/repos/github/SyTW2223/E08/badge.svg?branch=main)](https://coveralls.io/github/SyTW2223/E08?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SyTW2223_E08&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SyTW2223_E08)

![Utopia Icon](./client/public/logo192.png "Utopia Logo")

Utopia es un proyecto de red social experimental basada en la publicación de posts para compartir opiniones e ideas.

La red social permite realizar las siguientes acciones:
- Registro e Inicio de sesión.
- Ver posts publicados por los usuarios.
- Apoyar posts mediante me gusta.
- Visualización de la información de cuenta, posts publicados y posts dados me gusta.
- Cambios en la información de cuenta: imagen de perfil, nombre de usuario y descripción.
- Posibilidad de borrar posts publicados.

## Despliegue de la aplicación
Para el despliegue de la aplicación desarrollada, primero se debe de clonar el repositorio.

```bash
https://github.com/SyTW2223/E08.git
```
Una vez se esté situado en la carpeta del proyecto, se debe acceder a las carpetas del backend (server) y frontend (client) para la instalación de las dependencias necesarias.

### Instalación de las dependencias del cliente:
```bash
cd E08/client
npm install
```
### Instalación de las dependencias del servidor:
```bash
cd ../server
npm install
```
Dependiendo del despliegue, se deberán de cambiar las referencias hacia localhost y el puerto deseado dentro de los ficheros de `./server/src/app.ts` y `./client/src/services`, además de la creación de un fichero `.env` en la carpeta `./server` con la definción de las variables de entorno correspondientes:
```
PORT=8000
MONGO_DB_URI=[enlace hacia el cluster de mongodb]
MONGO_DB_URI_TEST=[enlace hacia el cluster de mongodb para los tests]
ACCESS_TOKEN_SECRET=[token para la sesión de usuarios] 
```

## Ejecución de la aplicación
Para el servidor, primero se deberá de compilar:
```bash
tsc
npm start
```

Para el frontend:
```bash
npm start
```
## Enlace al despliegue de la aplicación
Actualmente, la aplicación se encuentra desplegada a través del servicio de Vercel en el siguiente enlace: 
* [https://sytw-frontend-e08.vercel.app/](https://sytw-frontend-e08.vercel.app/)
## Autores:
* Tanausú Falcón Casanova | alu0101320878@ull.edu.es
* Vlatko Jesús Marchán Sekulic | alu0101321141@ull.edu.es
* Jacobo Labrador González | alu0101119663@ull.edu.es

