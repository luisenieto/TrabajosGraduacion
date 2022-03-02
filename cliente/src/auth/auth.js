import axios from 'axios';

const autenticar = (token, callback) => {
    if (typeof window !== "undefined") 
        localStorage.setItem('token', JSON.stringify(token));
    callback();
}
//recibe el token del servidor y una función de callback
//guarda el token en localStorage después de asegurarse que está definida una ventana
//es decir, el código se está ejecutando en un navegador y por lo tanto se tiene acceso a localStorage
//luego ejecuta la función de callback

const estaAutenticado = () => {
    if (typeof window == "undefined") 
        return false;
    if (localStorage.getItem('token'))
        return JSON.parse(localStorage.getItem('token'))
    else 
        return false;
}
//devuelve las credenciales guardadas (si el usuario está logueado) o false (si no está logueado)

const borrarToken = callback => {
    if (typeof window !== "undefined")
        localStorage.removeItem('token');
    const ruta = '/api/auth/logout';
    axios.get(ruta);
    callback();    
}
//se borra el token de localStorage y se desloguea al usuario, con lo cual:
//se le borra el token, se borra la cookie y se envía la respuesta

export {autenticar, estaAutenticado, borrarToken}