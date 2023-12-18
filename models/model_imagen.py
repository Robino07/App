from keras.models import load_model
import numpy as np

# Cargar el modelo Keras
keras_model = load_model('/app/trained_models/mi_modelo_caso2.h5')


def predict_image(model, image):
    # Procesar la imagen como lo hiciste durante el entrenamiento
    processed_image = image.resize((128, 128))  # Asegúrate de que esto coincida con lo que hiciste en el entrenamiento
    processed_image = np.array(processed_image) / 255.0  # Normalización
    processed_image = processed_image.reshape(1, 128, 128,
                                              3)  # Cambiar la forma para que coincida con las expectativas del modelo

    # Hacer la predicción
    prediction = model.predict(processed_image)
    return prediction


def predice(processed_image):
    result = ""
    print("================ PREDICT =========")
    # Hacer la predicción con la imagen
    prediction = predict_image(keras_model, processed_image)
    print(f"prediction: {prediction}")
    # Obtener la clase con la mayor probabilidad
    predicted_class = np.argmax(prediction)
    print(f"PREDICCION: {predicted_class}")

    prediction_value = prediction[0][predicted_class]
    formatted_prediction = "{:.2%}".format(prediction_value)
    if predicted_class == 0:
        result = f"Es un Fake News con una probabilidad del: {formatted_prediction}"
    elif predicted_class == 1:
        result = f"No es un Fake News con una probabilidad del: {formatted_prediction}"
    return result
