Quiz Preparatório ETEC

Este é um aplicativo web simples (HTML, CSS e JavaScript) criado para ajudar estudantes a se prepararem para a prova da ETEC. O aplicativo funciona como um quiz interativo, com perguntas baseadas nos materiais de estudo fornecidos.

Funcionalidades

Seleção de Matéria: O usuário pode escolher qual matéria deseja praticar (História, Geografia, Matemática, etc.).

Quiz Interativo: Perguntas de múltipla escolha com feedback visual imediato (correto/incorreto).

Barra de Progresso: Mostra ao usuário quantas questões já foram respondidas.

Tela de Resultados: Exibe a pontuação final e um feedback de desempenho.

Responsivo: Funciona em celulares, tablets e computadores.

Estrutura dos Arquivos

O projeto é dividido em três arquivos principais, conforme solicitado:

index.html: Contém a estrutura básica da página, incluindo as telas de início, do quiz e de resultados.

style.css: Contém todos os estilos visuais para tornar a aplicação amigável e fácil de usar.

script.js: Contém toda a lógica do quiz, o "banco de dados" de perguntas e as funções para carregar questões, verificar respostas e mostrar resultados.

Como Usar

Existem duas formas principais de utilizar este quiz:

1. Localmente (No seu computador)

Faça o download dos três arquivos (index.html, style.css, script.js) e coloque-os na mesma pasta.

Abra o arquivo index.html em qualquer navegador de internet (como Chrome, Firefox ou Edge).

Pronto! O quiz será carregado.

2. No GitHub (GitHub Pages)

Crie um novo repositório no seu GitHub.

Faça o upload dos três arquivos (index.html, style.css, script.js) para este repositório.

No seu repositório, vá em Settings (Configurações) > Pages (Páginas).

Na seção "Branch", selecione a branch main (ou master) e a pasta /root. Clique em Save.

Aguarde alguns minutos e o GitHub irá gerar um link público (ex: seunome.github.io/nome-do-repositorio) onde o quiz estará funcionando online.

Como Adicionar Mais Perguntas

O "banco de dados" de perguntas está localizado diretamente no arquivo script.js, na variável quizData. Para adicionar novas perguntas dos PDFs:

Abra o arquivo script.js em um editor de texto.

Encontre a constante quizData.

Adicione um novo objeto ({ }) dentro do array ([ ]), seguindo o formato:

{
    subject: "Nome da Matéria", // Ex: "Química"
    question: "O texto da sua pergunta aqui...",
    options: ["Opção A", "Opção B", "Opção C", "Opção D"],
    answer: "Opção C" // O texto exato da resposta correta
},


Basta adicionar quantos objetos de pergunta desejar. O aplicativo irá carregar as novas perguntas automaticamente na matéria correspondente.
