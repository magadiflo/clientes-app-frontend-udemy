# ClientesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Origen del proyecto (Udemy)
Angular & Spring Boot: Creando web app full stack

## Transpilando nuestra aplicación angular y preparándonos para el despliegue

Se subirá el proyecto de Angular a un servidor Apache. Pra eso en el proyecto
ya transpilado agregamos un archivo .htaccess, con la siguiente configuración

```
RewriteEngine On

# If an existing asset or directory is requested go to it as it is 
  RewriteCond %{REQUEST_FILENAME} -f [OR] 
  RewriteCond %{REQUEST_FILENAME} -d 
  RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html 
  RewriteRule ^ /clientes-app/index.html
```
En el archivo index.html, ser hará la siguiente modificación
```
<base href="/clientes-app/">
```