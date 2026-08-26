sequenceDiagram
    participant browser
    participant server

    Note right of browser: El usuario escribe la nota y hace clic en guardar. e.preventDefault() evita la recarga de la página. El navegador añade la nota localmente y redibuja la interfaz.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (Payload en formato JSON)
    activate server
    Note right of server: El servidor añade la nueva nota a la lista con contenido y fecha
    server-->>browser: HTTP status 201 Created
    deactivate server

    Note right of browser: El navegador permanece en la misma página y no realiza solicitudes adicionales de redirección o recarga.
