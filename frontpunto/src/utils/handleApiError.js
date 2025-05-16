export default function handleApiError(error) {
    if (error.response) {
        // Error del servidor (código 4xx o 5xx)
        console.error("API Error:", error.response.status, error.response.data);
        return {
            type: "server",
            status: error.response.status,
            message: error.response.data?.message || "Error en el servidor.",
        };
    } else if (error.request) {
        // No hubo respuesta
        console.error("No response from API:", error.request);
        return {
            type: "network",
            message: "No hay respuesta del servidor. Verifica tu conexión.",
        };
    } else {
        // Otro error
        console.error("Error desconocido:", error.message);
        return {
            type: "unknown",
            message: "Ocurrió un error inesperado.",
        };
    }
}
