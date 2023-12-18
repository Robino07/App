# A Deep Learning Approach to detected FAke News

This project aims to detect Fake News. We considered three types of model.
- Only Text
- Only Image
- hybrid (support text and image)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Deployment](#deployment)
- [Future Work](#future-work)
- [License](#license)

## Introduction

Fake news is one of the most common desiformation in the world and early detection is crucial for successful treatment. This project focuses on the detection of fake news, using a deep learning-based approach.

The model used in this project is a convolutional neural network (CNN), which is trained on a dataset of skin images. The CNN can take an image of a skin lesion as input and output the probability of the lesion being one of the three types of skin cancer.

## Installation
 
You must have Docker Desktop installed:

For windows:

https://docs.docker.com/desktop/install/windows-install

For Linux:

https://docs.docker.com/desktop/install/linux-install/

For Mac

https://docs.docker.com/desktop/install/mac-install/

Once Docker is installed, download the project from:

download the project from https://github.com/Robino07/App

Open the windows console and run the following commands in the same path where the Dockerfile is located.

 - docker build -t api_model . --no-cache
 - docker run -p 5000:5000 api_model

To test go to:

http://localhost:5000

## Dataset
The dataset used in this project is a dataset, gave for the teacher.
The dataset was preprocessed and split into training, validation, and test sets. The images were resized and normalized to improve the performance of the model.


## Model Architecture
The model architecture used in this project is a CNN with the following layers:

- Input layer
- Data preprocessing layer (resizing and rescaling)
- Convolutional layers
- Max-pooling layers
- Flatten layer
- Fully connected layers
- Clip de OpenAI


## Deployment
The Fake News detection system was deployed using a FastAPI web application, which allows users to upload images and text of news. The model was packaged as a Python module and loaded into the FastAPI server. The server returns the prediction. The code was committed to GitHub. The model was deployed successfully, and the API is accessible from a public URL.


## Future Work
There are several areas where this project can be extended in the future:

- Better score
- Train the model on larger datasets to improve performance.
- Develop a user-friendly interface for the system.

## License
This project is licensed under the Apache License - see the LICENSE file for details.

#proyecto_aplicado
