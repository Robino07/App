// funcion para verificar que alguno de los campos esta lleno, y luego enviar 
document.getElementById("predictionForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = document.getElementById("textInput").value;
    const imageFile = document.getElementById("imageInput").files[0];

    // Verificar que al menos uno de los campos esté lleno
    if (text === "" && !imageFile) {
        alert("Please add text or select an image.");
        return;
    }

    // Preparar los datos para enviar al servidor
    const formData = new FormData();
    if (text !== "") formData.append("text", text);
    if (imageFile) formData.append("file", imageFile);

    // Configurar la solicitud
    const response = await fetch('/predict', {
        method: 'POST',
        body: formData
    });

    // Obtener y mostrar la respuesta
    if (response.ok) {
        const result = await response.json();
        document.getElementById("resultText").textContent = result.predictions;
        document.getElementById("predictionResult").style.display = 'block';
    } else {
        alert("Error: " + response.statusText);
    }

    // Leer y mostrar la imagen cargada
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("uploadedImage").src = e.target.result;
            document.getElementById("imagePreview").style.display = 'block'; // Mostrar el contenedor de la imagen
            document.getElementById("uploadedImage").hidden = false;
        }
        reader.readAsDataURL(imageFile); // Convertir la imagen a Data URL para mostrarla
    }
    else {
        document.getElementById("imagePreview").style.display = 'none'; // Ocultar el contenedor de la imagen si no hay archivo
    }
});

// Puedes agregar un listener para el input de la imagen para mostrar la imagen tan pronto se seleccione
document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("uploadedImage").src = e.target.result;
            document.getElementById("imagePreview").style.display = 'block'; // Mostrar el contenedor de la imagen
            document.getElementById("uploadedImage").hidden = false;
        }
        reader.readAsDataURL(file); // Convertir la imagen a Data URL para mostrarla
    }
    else {
        document.getElementById("imagePreview").style.display = 'none'; // Ocultar el contenedor de la imagen si se elimina el archivo
        document.getElementById("predictionForm").reset();
    }
});

// Validación del formato de archivo
document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        // Verificar el formato del archivo
        const validFormats = ['image/jpeg', 'image/png'];
        if (!validFormats.includes(file.type)) {
            alert("Please select an image with JPG or PNG extension.");
            event.target.value = ''; // Limpiar el campo de archivo
            document.getElementById("imagePreview").style.display = 'none';
            document.getElementById("uploadedImage").hidden = false;
            document.getElementById("predictionForm").reset();
        }
    }
});


// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function () {
    // Obtiene los elementos de radio y los campos
    var modelText = document.getElementById('modelText');
    var modelImage = document.getElementById('modelImage');
    var modelBoth = document.getElementById('modelMultiModal');
    var textField = document.getElementById('textField');
    var imageField = document.getElementById('imageField');

    // Función para actualizar la visibilidad de los campos


    // Llama a la función de actualización al inicio para establecer el estado inicial
});

document.getElementById("clearDataButton").addEventListener("click", function(event) {
    // Ocultar la imagen y el contenedor de la imagen
    document.getElementById("uploadedImage").src = '';
    document.getElementById("uploadedImage").hidden = true;
    document.getElementById("imagePreview").style.display = 'none';
    document.getElementById("textInput").value = "";
    document.getElementById("resultText").textContent = '';

    // Opcional: Restablecer el formulario completamente
    document.getElementById("predictionForm").reset();
});
