Markdown
# Proyecto YVH Droid Target Selector

Este proyecto tiene como objetivo desarrollar un sistema de selección de objetivos para un droide de combate YVH. Utiliza Node.js con TypeScript, Express, MongoDB Atlas como base de datos y Postman para pruebas de API.

## Tabla de Contenidos
* Requisitos Previos
* Instalación
* Estructura del Proyecto
* Configuración
* Ejecución
* Pruebas

## Requisitos Previos
* Node.js (v14.0.0 o superior)
* Yarn
* Cuenta en MongoDB Atlas para la base de datos
* Postman para las pruebas de API

## Instalación
```bash
git clone [https://github.com/tu_usuario/proyecto-yvh.git](https://github.com/tu_usuario/proyecto-yvh.git)
cd proyecto-yvh
yarn install
```
## Estructura del Proyecto
```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── index.ts
├── testing/
├── .env
├── package.json
├── tsconfig.json
└── yarn.lock
```
## Ejecución

```
yarn dev
```

## Pruebas

Bash
```
./testing/test.sh
```
