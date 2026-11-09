#!/bin/zsh
# Arranca a partir da pasta onde este ficheiro foi extraído.
cd -- "${0:A:h}"
if ! command -v node >/dev/null 2>&1; then
  echo 'Instala Node.js 22 ou superior a partir de nodejs.org e tenta novamente.'
  read '?Carrega Enter para fechar.'
  exit 1
fi
npm run dev
read '?Carrega Enter para fechar.'
