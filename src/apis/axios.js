import axios from "axios";
import { keysToCamelCase, serializeKeysToSnakeCase } from "neetocist";
import { evolve } from "ramda";

const responseInterceptors = () =>{
    axios.interceptors.response.use(response => {
        transformResponseKeysToCamelCase(response);
        return response.data;
    });    
};

const setHttpHeaders = () =>{
    axios.defaults.headers = {
        Accept: "application/json",
        "Content-type": "application/json"
    };
};

const requestInterceptors = () => {
    axios.interceptors.request.use(
      evolve(
        { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
    );
  };
  

const transformResponseKeysToCamelCase = response =>{
    if(response.data) response.data = keysToCamelCase(response.data);
}

export default function initializeAxios() {
    axios.defaults.baseURL =
      "https://smile-cart-backend-staging.neetodeployapp.com/";
    setHttpHeaders();
    responseInterceptors();
    requestInterceptors();
  }