# Usar una imagen base de Python oficial.
FROM python:3.10-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo de requisitos primero para aprovechar la caché de la capa de Docker
COPY requirements.txt .

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
#CMD ["python", "src/app.py"]
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "5000"]
