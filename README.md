# Red Social Tecla
- Bienvenidos al respositorio de Red Social Tecla -
By Brandon R. Contreras
A continuación encontraras una guía con los pasos a seguir para correr el proyecto de manera local:

Descarga el repo en tu PC (.zip)
Extrae el proyecto de la carpeta .zip
Abre la carpeta del proyecto en visual studio

Genera un nuevo archivo ".ENV" e ingresa los siguientes valores:
HOST = 'localhost' PORT = 3000  LISTABLANCA = ['http://localhost:5500','http://127.0.0.1','http://localhost:3000'] DB_HOST = 'localhost' DB_PORT = 1433 DB_USER = 'sa' DB_PASS = '(Tu contraseña)'
SECRET_KEY= 'NuestraClaveSecretaTecla'

Ingresar a la ruta: /db/SQLSCRIPT y ejecutar el script para crear la Base de datos.
Con ayuda de la terminal y ejecuta el comando "npm i" para descargar todos los módulos necesarios
Para correr el ´proyecto ejecuta el comando "npm run dev"

Listo! puedes interactuar con la página en http://localhost:3000/login

