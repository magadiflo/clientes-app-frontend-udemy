# ClientesApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Origen del proyecto (Udemy)
Angular & Spring Boot: Creando web app full stack

## Transpilando nuestra aplicación angular y preparándonos para el despliegue (SERVIDOR APACHE)

1. Se subirá el proyecto de Angular a un servidor Apache. Para eso en el proyecto
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
2. En el archivo index.html del proyecto transpilado (dist/clientes-app/index.html), ser hará la siguiente modificación
```
<base href="/clientes-app/">
```

3. Dentro del servidor apache modificamos el archivo httpd.conf de None a All

a. Usado por mí: C:\laragon\bin\apache\httpd-2.4.47-win64-VS16\conf\httpd.conf
```
DocumentRoot "C:/laragon/www"
<Directory "C:/laragon/www">
    ........
    AllowOverride All
    ........
</Directory>
```
b. Usado por el del tutorial: C:\Apache24\conf\httpd.conf
```DocumentRoot "${SRVROOT}/htdocs"
<Directory "${SRVROOT}/htdocs">
    ........
	AllowOverride All
    ........
</Directory>

```

4. Copiar el proyecto transpilado en el directorio de Apache
a. Usando por mí (APACHE DESDE LARAGON): 
```
C:/laragon/www
```
Iniciar los servicios de Laragon y verficar en el navegador

b. Usado en el video (APACHE):
```
Apache24\htdocs\clientes-app\
```
Ir por cmd a C:\Apache24\bin
	> .\httpd.exe
Verificar en el navegador

## Se realizaron cambios en el Angular.json