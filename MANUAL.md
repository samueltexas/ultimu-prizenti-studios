# Manual do site - Ultimu Prizenti Studios

Versão de 9 de Novembro de 2026.
O arquivo completo contém o site, as cópias web, os originais e a documentação.

## 1. Guardar e abrir no VS Code

1. Guarda o ZIP completo e uma segunda cópia noutro disco.
2. Extrai o ZIP. Abre no VS Code apenas a pasta ultimu-prizenti-website.
3. Instala Node.js 24 LTS de https://nodejs.org se ainda não estiver instalado.
4. No VS Code, abre Terminal > New Terminal e executa:

```sh
npm run dev
```

Abre http://localhost:3001/pt/. Mantém o terminal aberto. Para terminar, usa Ctrl+C.
Não é necessário npm install. Não abras index.html por duplo clique: o site precisa
do servidor local para resolver os caminhos. A porta 3000 fica reservada ao outro
projecto. Se 3001 já estiver ocupada, usa a prévia existente ou termina apenas o
terminal desse projecto. Existem também atalhos ABRIR-NO-MAC e ABRIR-NO-WINDOWS.

## 2. Editar sem perder trabalho

Edita src e public, nunca dist. Guarda o ficheiro, abre um segundo terminal e executa:

```sh
npm run check
```

Depois actualiza a página no navegador. O comando reconstrói e verifica o site;
não publica na Internet. Os comentários principais estão em português.

- Contactos e preços: src/data/site.mjs.
- Textos de interface: src/data/translations.mjs.
- História do estúdio: src/data/story.mjs.
- Capas, filmes e ordem da homepage: src/data/projects.mjs.
- Catálogo fotográfico: src/data/photos.json.
- Estrutura das páginas: src/pages.
- Cabeçalho e rodapé: src/components/layout.mjs.
- Testemunho aprovado: src/components/shared.mjs e translations.mjs.
- Apresentação: public/assets/styles.css.
- Comportamentos: public/assets/main.js.

As fotografias têm versões 640, 1600 e 2400. Os vídeos usam MP4 Full HD. Mantém os
originais separados; nunca substituas um master por uma cópia comprimida.

## 3. Colocar o projecto no GitHub

O repositório previsto é samueltexas/ultimu-prizenti-studios. Se já estiver publicado,
podes obtê-lo com os comandos seguintes, numa pasta diferente da prévia existente:

```sh
git clone https://github.com/samueltexas/ultimu-prizenti-studios.git
cd ultimu-prizenti-studios
npm run dev
```

Se trabalhares na pasta extraída do ZIP e ainda não tiveres repositório local,
cria no GitHub um repositório público vazio com esse nome. Não cries outro se ele
já existir. Na pasta do site, executa:

```sh
git init -b main
git add .
git commit -m "Launch Ultimu Prizenti Studios website"
git remote add origin https://github.com/samueltexas/ultimu-prizenti-studios.git
git push -u origin main
```

Podes usar GitHub Desktop para a autenticação e os commits. Usa Git ou GitHub Desktop,
não o upload de ficheiros pelo navegador: os vídeos ultrapassam o limite desse upload.
A conta deve estar autenticada. Nunca coloques tokens ou palavras-passe no código.

O .gitignore exclui dist, ficheiros de ambiente e docs/private. Inclui as cópias web
para a Netlify construir o site completo. Os masters e o ZIP não pertencem ao GitHub.
O repositório é público para consulta profissional; a licença reserva os direitos
sobre o código, a marca e os conteúdos. Não é um modelo de reutilização livre.

## 4. Publicar na Netlify sem mensalidade obrigatória

1. Cria a tua conta em https://app.netlify.com e escolhe o plano Free.
2. Importa um projecto existente do GitHub e selecciona ultimu-prizenti-studios.
3. Autoriza acesso apenas ao repositório necessário.
4. Confirma build command npm run build e publish directory dist. A raiz é a pasta
   onde estão package.json e netlify.toml; Node.js 24 está definido no ficheiro.
5. Publica. Receberás um endereço gratuito terminado em .netlify.app.
6. Abre o endereço e verifica páginas, idiomas, imagens e reprodução de vídeo.

Não precisas de comprar domínio, activar upgrades ou adicionar serviços pagos.
O plano gratuito tem limites; consulta o painel Usage & billing. Vídeo pode consumir
tráfego rapidamente. Quando quiseres, liga um domínio comprado à parte.

A Netlify disponibiliza o endereço público no build. Para um domínio próprio,
define SITE_URL com o endereço HTTPS completo e publica novamente. Não incluas
uma barra no fim. O build gera sitemap e ligações para os motores de pesquisa.

## 5. Activar contactos e testemunhos

1. No painel Netlify, abre Forms e activa a detecção de formulários.
2. Executa uma nova publicação para detectar contact e testimonials.
3. Em Submission notifications, adiciona notificações por email para
   ultimuprizenti@gmail.com em ambos os formulários.
4. Faz um envio de teste identificado em cada formulário no site publicado.
5. Confirma os pedidos no painel Forms e no email, incluindo a pasta de spam.

Localhost não envia mensagens e não simula sucesso. O site não está pronto para
receber pedidos reais enquanto a recepção não for confirmada. Sem JavaScript,
a Netlify apresenta a confirmação padrão do formulário.

Os testemunhos recebidos ficam privados: revê o texto e a autorização antes de
acrescentares uma avaliação ao conteúdo público. O email do cliente nunca deve
ser publicado. Aprovar no teu processo não altera o site sozinho: é necessário
editar o conteúdo e publicar novamente. Não há painel administrativo próprio.

## 6. Actualizações e recuperação

Antes de publicar alterações, executa npm run check e revê a prévia. Depois:

```sh
git add .
git commit -m "Describe the change"
git push
```

Com a ligação Git activa, a Netlify constrói uma nova versão. Verifica o resultado
no painel. Se falhar, a versão anterior pode continuar publicada; consulta o log.
Podes recuperar uma publicação anterior no painel Netlify. Para alterações de código,
usa um commit de reversão em vez de apagar o histórico.

Guarda regularmente um ZIP do projecto e os originais em dois locais. O GitHub não
substitui a cópia de segurança dos masters. O arquivo entregue inclui um inventário
SHA-256 e é testado após extracção numa pasta independente.

## 7. O que está e não está incluído

Inclui 66 páginas por idioma somadas, entrada inicial e 404; 53 fotografias em três
tamanhos; sete filmes; serviços, história, contactos e testemunhos. O mesmo visual
é servido localmente e na Netlify, salvo diferenças normais de navegador e ecrã.

Não inclui pagamentos, contas de clientes, CMS, analytics ou entrega privada de
fotografias. A galeria digital privada prometida nos pacotes deve ser entregue
por um processo externo definido por ti. O domínio e eventuais contas são teus.

O documento docs/PROJECT.pdf explica a arquitectura e sugere uma ordem de estudo.
O README apresenta o projecto aos visitantes do GitHub. A publicação efectiva,
o endereço final e a recepção de email devem ser confirmados separadamente.
