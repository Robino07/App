import io
import sys
print(sys.path)
import uvicorn
from PIL import Image
from fastapi import File, UploadFile
from fastapi import Form
from fastapi.responses import HTMLResponse
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from models.model_multifuncional import predice as predice_multifuncional
from models.model_texto import predice as predice_texto
from models.model_imagen import predice as predice_imagen


app = FastAPI()

# Configurar el directorio para servir archivos estáticos
app.mount('/static', StaticFiles(directory='src/static', html=True), name='static')
@app.get("/", response_class=HTMLResponse)
async def index():
    with open("src/static/index.html", "r") as file:
        return file.read()

@app.post("/predict")
async def predict(text: str = Form(None), file: UploadFile = File(None)):
    print(f"sys.path: {sys.path}")
    print("================ PREDICT =========")

    if not text and not file:
        return {"error": "Debe enviar texto o imagen"}

    print("TEXT: ", text)
    print("IMAGE:", file)
    pred = ""
    try:
        if file and text:
            print("======== IMAGEN y TEXto")
            contents = await file.read()
            image_file = io.BytesIO(contents)
            processed_image = Image.open(image_file).convert('RGB')
            prediction = predice_multifuncional(text, processed_image)
        elif file:
            print("======== SOLO imagen")
            contents = await file.read()
            image_file = io.BytesIO(contents)
            processed_image = Image.open(image_file)
            # Procesa la imagen aquí
            prediction = predice_imagen(processed_image)
        # Procesa el texto aquí
        elif text:
            print("======== SOLO TEXTO")
            prediction = predice_texto(text)

        return {'predictions': prediction}

    except Exception as e:
        print(f"Error during prediction: {e}")
        return {"error": "Error processing the request"}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8003)