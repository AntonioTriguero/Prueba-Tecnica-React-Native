#!/bin/bash

# Compila los archivos de código fuente
echo "Compilando los archivos de código fuente..."
node_modules/.bin/tsc -p .

# Coloca los archivos compilados en el directorio de artefactos
echo "Colocando los archivos compilados en el directorio de artefactos..."
cp -rf lib/ .bob/artifact/
