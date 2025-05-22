# Virtuoso.Ai API 🤖

## ✨ Descripción General

Virtuoso.Ai es una aplicación web de aprendizaje de idiomas potenciada por inteligencia artificial. Permite a los estudiantes practicar conversaciones en contextos específicos y generar pruebas de gramática con retroalimentación inmediata, mejorando así la experiencia de aprendizaje y la efectividad en el dominio de un nuevo idioma.

Este repositorio contiene el **backend** de Virtuoso.Ai, el cual es responsable de la gestión y organización de toda la funcionalidad del sitio. Está desarrollado utilizando **Node.js** y **Express**, y emplea **MongoDB** como base de datos. Además, se integra con la **API de OpenAI (ChatGPT-4)** para proporcionar capacidades avanzadas de inteligencia artificial. El uso de estas tecnologías permite una experiencia fluida y escalable tanto en la gestión de datos como en las interacciones con los usuarios.

![image](https://github.com/user-attachments/assets/0759f40b-48ea-446d-be7b-72d3703c2f02)

## 🖼️ Vistas de la Aplicación

A continuación, se muestran algunas capturas de pantalla de la aplicación cliente que interactúa con este backend:

#### Página Principal
![Captura de pantalla 2024-09-15 234950](https://github.com/user-attachments/assets/a934534a-8522-43b9-9c98-0372fbf8228e)

#### Selección de Nivel y Temas de Conversación
![Captura de pantalla 2024-09-15 235008](https://github.com/user-attachments/assets/c1d6f408-a4e3-4e4e-af74-964eb6394b68)

#### Chat de Interacción con Virtuoso.Ai
![Captura de pantalla 2024-09-15 235059](https://github.com/user-attachments/assets/5cf19ad4-64b2-463b-ac43-13a84432841a)

## 🔗 Enlace

Visita la aplicación web desplegada en: ***[Virtuoso.Ai](https://virtuoso-ai.vercel.app/)***.

## 🚀 Características Principales

La función principal del backend es servir como puente entre la aplicación frontend y la API de OpenAI (ChatGPT). Gestiona las solicitudes de los usuarios, procesa la lógica de negocio y se comunica con el modelo de lenguaje para:

*   Facilitar conversaciones interactivas y dinámicas.
*   Generar ejercicios de gramática personalizados.
*   Proveer retroalimentación instantánea sobre el desempeño del usuario.
*   Almacenar y recuperar datos relevantes del usuario y su progreso (utilizando MongoDB).

## 🚀 Endpoints de la API

A continuación se describen los principales endpoints disponibles en esta API:

### 1. Endpoint de Completado de OpenAI

*   **Ruta:** `/completions`
*   **Método:** `GET`
*   **Descripción:** Obtiene respuestas de la API de OpenAI (GPT-4o-mini) en formato stream. Se utiliza para enviar mensajes de chat y recibir las respuestas del modelo de lenguaje.
*   **Parámetros de Consulta (Query Params):**
    *   `messages` (stringified JSON): Un array de objetos de mensaje que sigue el formato de la API de OpenAI.
        *   Ejemplo: `[{"role": "user", "content": "Hola"}, {"role": "assistant", "content": "¡Hola! ¿Cómo puedo ayudarte?"}]`
*   **Formato del Cuerpo de la Solicitud:** N/A (los datos se envían por query params).
*   **Respuestas Posibles:**
    *   `200 OK`:
        *   **Content-Type:** `text/event-stream`
        *   **Cuerpo:** Stream de eventos SSE. Cada evento es un JSON con el fragmento de la respuesta de OpenAI. El stream finaliza con un evento `data: [DONE]`.
    *   `400 Bad Request`:
        *   **Cuerpo:** `{"error": "Invalid messages format"}` (si el JSON de `messages` es inválido)
        *   **Cuerpo:** `{"error": "<Error de OpenAI API>"}` (si la API de OpenAI devuelve un error)
    *   `500 Internal Server Error`:
        *   **Cuerpo:** `{"error": "Something went wrong"}` (para errores generales del servidor)
        *   **Cuerpo:** `{"error": "Stream error"}` (si ocurre un error durante el streaming)

### 2. Crear un Nuevo Chat

*   **Ruta:** `/chat`
*   **Método:** `POST`
*   **Descripción:** Crea una nueva sesión de chat con un título y mensajes iniciales.
*   **Formato del Cuerpo de la Solicitud (JSON):**
    ```json
    {
      "title": "Título del Chat",
      "messages": [
        {"role": "user", "content": "Mensaje inicial del usuario"},
        {"role": "assistant", "content": "Respuesta inicial del asistente"}
      ]
    }
    ```
*   **Respuestas Posibles:**
    *   `201 Created`:
        *   **Cuerpo:** El objeto del chat creado, incluyendo su `_id`, `title`, `messages`, y `createdAt`/`updatedAt`.
    *   `400 Bad Request`:
        *   **Cuerpo:** `{"error": "<Mensaje de error de validación>"}`

### 3. Obtener un Chat Específico

*   **Ruta:** `/chat/:chatId`
*   **Método:** `GET`
*   **Descripción:** Recupera los detalles de un chat específico utilizando su ID.
*   **Parámetros de Ruta:**
    *   `chatId`: El ID del chat a obtener.
*   **Formato del Cuerpo de la Solicitud:** N/A
*   **Respuestas Posibles:**
    *   `200 OK`:
        *   **Cuerpo:** El objeto del chat.
    *   `404 Not Found`:
        *   **Cuerpo:** `{"message": "Chat no encontrado"}`
    *   `500 Internal Server Error`:
        *   **Cuerpo:** `{"message": "Error al buscar el chat", "error": "<mensaje de error>"}`

### 4. Actualizar Mensajes de un Chat

*   **Ruta:** `/chat/:chatId/messages`
*   **Método:** `PUT`
*   **Descripción:** Actualiza la lista de mensajes de un chat existente. Reemplaza todos los mensajes del chat con la nueva lista proporcionada.
*   **Parámetros de Ruta:**
    *   `chatId`: El ID del chat a actualizar.
*   **Formato del Cuerpo de la Solicitud (JSON):**
    ```json
    {
      "messages": [
        {"role": "user", "content": "Nuevo mensaje del usuario"},
        {"role": "assistant", "content": "Nueva respuesta del asistente"}
      ]
    }
    ```
*   **Respuestas Posibles:**
    *   `200 OK`:
        *   **Cuerpo:** El objeto del chat actualizado.
    *   `400 Bad Request`:
        *   **Cuerpo:** `{"message": "Se requiere un arreglo de mensajes válido"}`
    *   `404 Not Found`:
        *   **Cuerpo:** `{"message": "Chat no encontrado"}`
    *   `500 Internal Server Error`:
        *   **Cuerpo:** `{"message": "Error al actualizar los mensajes", "error": "<mensaje de error>"}`

### 5. Eliminar un Chat

*   **Ruta:** `/chat/:chatId`
*   **Método:** `DELETE`
*   **Descripción:** Elimina un chat específico utilizando su ID.
*   **Parámetros de Ruta:**
    *   `chatId`: El ID del chat a eliminar.
*   **Formato del Cuerpo de la Solicitud:** N/A
*   **Respuestas Posibles:**
    *   `200 OK`:
        *   **Cuerpo:** `{"mensaje": "Chat eliminado con éxito", "chat": "<objeto del chat eliminado>"}`
    *   `404 Not Found`:
        *   **Cuerpo:** `{"mensaje": "Chat no encontrado"}`
    *   `500 Internal Server Error`:
        *   **Cuerpo:** `{"mensaje": "Error al eliminar el chat", "error": "<mensaje de error>"}`

## ⚙️ Detalles de Implementación

El backend de Virtuoso.ai está construido con Node.js y Express.js, proporcionando una base robusta y eficiente para manejar las solicitudes de la API. MongoDB se utiliza como base de datos NoSQL para almacenar la información de los chats, como títulos y mensajes.

**Arquitectura General:**

*   **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
*   **Express.js:** Framework web minimalista para Node.js, utilizado para definir las rutas de la API y manejar las solicitudes HTTP.
*   **MongoDB:** Base de datos orientada a documentos donde se almacenan las conversaciones. Cada chat se guarda como un documento que incluye un título y un array de mensajes. La conexión se gestiona a través de Mongoose.
*   **API de OpenAI (GPT-4o-mini):** Integrada para potenciar las capacidades de chat inteligente. El backend se comunica con la API de OpenAI para enviar los mensajes del usuario y recibir las respuestas generadas por el modelo de lenguaje.

**Flujo de Datos Principales:**

1.  **Inicio de un Chat (`POST /chat`):**
    *   El cliente envía un título y, opcionalmente, mensajes iniciales.
    *   El servidor crea un nuevo documento en MongoDB con esta información.
    *   Se devuelve el chat creado al cliente.

2.  **Obtención de Respuestas de IA (`GET /completions`):**
    *   El cliente envía el historial de mensajes actual como parámetro de consulta.
    *   El backend formatea esta solicitud y la envía al endpoint `chat/completions` de la API de OpenAI.
    *   La respuesta de OpenAI se recibe como un *stream* (Server-Sent Events). El backend retransmite este stream directamente al cliente, permitiendo que las palabras aparezcan una por una en la interfaz de usuario, simulando una conversación en tiempo real.

3.  **Guardado de Conversaciones (`PUT /chat/:chatId/messages`):**
    *   Después de que el usuario interactúa con la IA, el cliente envía la conversación actualizada (incluyendo los mensajes del usuario y las respuestas de la IA) a este endpoint.
    *   El backend actualiza el documento correspondiente en MongoDB con los nuevos mensajes.

**Manejo de Errores:**
El backend incluye manejo de errores para validar las entradas de las solicitudes y para gestionar problemas que puedan surgir durante la comunicación con la base de datos o la API de OpenAI. Se devuelven códigos de estado HTTP apropiados y mensajes de error en formato JSON.

## 📦 Dependencias del Proyecto

El backend utiliza las siguientes dependencias principales:

*   `cors`: Para habilitar el Cross-Origin Resource Sharing.
*   `dotenv`: Para gestionar variables de entorno.
*   `express`: Framework web para Node.js, utilizado para construir la API.
*   `node-fetch`: Para realizar solicitudes HTTP (si es necesario para comunicarse con otros servicios, aunque `openai` ya maneja su propia comunicación).
*   `openai`: Cliente oficial de Node.js para la API de OpenAI.

Además, la infraestructura se apoya en **MongoDB** como sistema de gestión de base de datos NoSQL.

## 🛠️ Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el backend de Virtuoso.Ai en tu entorno local:

###### 1. Clona el Repositorio del Backend:
Este repositorio contiene todo el código fuente del backend. Para obtenerlo, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/Jonas4899/virtuoso-ai.git
cd virtuoso-ai
```
Es importante trabajar dentro del directorio `virtuoso-ai` para los siguientes pasos.

###### 2. Instala las Dependencias del Proyecto:
Una vez dentro del directorio del proyecto, ejecuta el siguiente comando para instalar todas las dependencias necesarias definidas en el archivo `package.json`:

```bash
npm install
```

###### 3. Configura las Variables de Entorno:
Para que la aplicación funcione correctamente, es crucial configurar las variables de entorno. Crea un archivo llamado `.env` en la raíz del proyecto (dentro de la carpeta `virtuoso-ai`).

Este archivo contendrá las claves y configuraciones sensibles. Añade las siguientes variables, reemplazando los valores de ejemplo con tu propia configuración:

```env
OPENAI_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MONGO_URI=mongodb://localhost:27017/virtuoso-ai
PORT=3000
CLIENT_URL=http://localhost:5173
```

**Descripción de las variables:**

*   `OPENAI_KEY`: Tu clave API secreta de OpenAI para acceder a los modelos de lenguaje.
*   `MONGO_URI`: La cadena de conexión a tu instancia de base de datos MongoDB. Asegúrate de que la base de datos `virtuoso-ai` exista o que tu configuración permita la creación automática.
*   `PORT`: El puerto en el que se ejecutará el servidor backend. El valor por defecto es `3000` si no se especifica.
*   `CLIENT_URL`: La URL base de la aplicación frontend que consumirá esta API. Es fundamental para la configuración de CORS (Cross-Origin Resource Sharing) y permitir las solicitudes desde el cliente.

**Nota:** No compartas tu archivo `.env` ni subas tus claves secretas a repositorios públicos.

###### 4. Inicia la Aplicación en Modo de Desarrollo:
Una vez configuradas las variables de entorno y las dependencias instaladas, puedes iniciar el servidor backend con el siguiente comando:

```bash
npm run dev
```
Este comando (generalmente definido en `package.json`) iniciará el servidor, y deberías ver un mensaje en la consola indicando que está corriendo en el puerto especificado (ej. `Servidor corriendo en el puerto 3000`).

Ahora el backend de Virtuoso.Ai debería estar listo para recibir solicitudes.

## 🧑‍💻 Autores

*   Jonathan Salcedo 😊
*   Silvana Gonzales 😎
*   Kevin David Rueda 👽
