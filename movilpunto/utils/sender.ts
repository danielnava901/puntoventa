import {Constants} from "expo-constants";
import ApiConstants from "@/constants/ApiConstants";

const API_BASE = ApiConstants.apiUrl

type SenderParams = {
    url: string;
    data?: Record<string, any> | null;
    token?: string | null;
    method: string;
};

type SenderResponse<T = any> = T | null;


const sender = async <T = any>({
       url,
       data = null,
       token = null,
       method = "POST",
    }: SenderParams): Promise<SenderResponse<T>> => {
    console.log(`Enviando a: ${url}`);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const requestOptions: RequestInit = {
        headers,
        method,
        body: (method !== "GET" && data !== null) ? JSON.stringify(data) : "",
    };

    try {
        const response = await fetch(`${API_BASE}${url}`, requestOptions);

        if (response.status === 401) {
            // Aquí puedes redirigir con router o limpiar el estado del usuario
            console.warn("Token caducado");
            return null;
        }

        if (!response.ok) {
            console.error("Error al enviar la petición:", response.status);
            return null;
        }

        const json = await response.json();
        console.log({data: json.data})
        return json.data as T;
    } catch (error) {
        console.error("Error en la petición:", error);
        return null;
    }
};

export { sender };
