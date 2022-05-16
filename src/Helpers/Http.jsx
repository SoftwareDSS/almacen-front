/* Axios library */
import axios from 'axios';

/* API connection */
const instance = axios.create({
    baseURL: 'http://localhost:8888/almacen'
});

/* AXIOS instance for JSON data */
instance.defaults.headers.post[ 'Content-Type' ] = 'application/json';

/* Object and functions of the helper module */
let http = {

    /**
        * GET requests
        * 
        * @library Axios
        * @param url
        * 
    */
    GET: ( url ) => {

        return instance.get( url );

    },

    /**
        * POST requests
        * 
        * @library Axios
        * @param url
        * @param data
        * 
    */

    POST: ( url, data ) => {

        return instance.post( url, data );

    }

};


export default http;