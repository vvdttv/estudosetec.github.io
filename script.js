// --- BANCO DE DADOS DE PERGUNTAS ---
// Perguntas extraídas dos PDFs da ETEC
const quizData = [
    {
        subject: "História",
        question: "Na civilização ____, onde se originaram várias sociedades orientais, as artes plásticas eram utilizadas para demonstrar religiosidade e o poder dos governantes.",
        options: ["Mesopotâmica", "Grega", "Egípcia", "Romana"],
        answer: "Mesopotâmica"
    },
    {
        subject: "História",
        question: "Qual fator geográfico possibilitou o desenvolvimento da civilização egípcia na antiguidade?",
        options: ["As florestas densas", "O clima chuvoso", "A existência do Rio Nilo", "A proximidade com Roma"],
        answer: "A existência do Rio Nilo"
    },
    {
        subject: "Geografia",
        question: "A rosa dos ventos aponta os pontos cardeais e colaterais. Qual dos seguintes é um ponto colateral?",
        options: ["Norte", "Oeste", "Sudeste", "Leste"],
        answer: "Sudeste"
    },
    {
        subject: "Geografia",
        question: "Qual é a linha imaginária que divide a Terra em Hemisfério Norte e Hemisfério Sul?",
        options: ["Meridiano de Greenwich", "Trópico de Câncer", "Círculo Polar Ártico", "Linha do Equador"],
        answer: "Linha do Equador"
    },
    {
        subject: "Matemática",
        question: "Com os algarismos 1, 2, 3, 4 e 5, quantos números pares de 3 algarismos (distintos ou não) podem ser formados?",
        options: ["40", "60", "25", "50"],
        answer: "50"
    },
    {
        subject: "Matemática",
        question: "Um terreno retangular tem 6 km de comprimento e 4 km de largura. Para cercar o terreno com duas voltas de arame, quantos metros de arame são necessários?",
        options: ["40.000 m", "20.000 m", "48.000 m", "24.000 m"],
        answer: "40.000 m"
    },
    {
        subject: "Física",
        question: "Um projétil atinge 60 m/s para penetrar a pele. Considerando a gravidade g=10 m/s², de que altura mínima ele deve ser abandonado em queda livre para atingir essa velocidade?",
        options: ["180 m", "120 m", "360 m", "60 m"],
        answer: "180 m"
    },
    {
        subject: "Física",
        question: "Qual é a unidade de medida de Força no Sistema Internacional (SI)?",
        options: ["Joule (J)", "Watt (W)", "Newton (N)", "Pascal (Pa)"],
        answer: "Newton (N)"
    },
    {
        subject: "Química",
        question: "Como foi inicialmente concebido o átomo de acordo com o modelo proposto por Dalton?",
        options: ["Como partícula esférica, maciça e indivisível", "Com um núcleo central rodeado por elétrons", "Como uma nuvem difusa de elétrons", "Com partículas subatômicas em órbitas"],
        answer: "Como partícula esférica, maciça e indivisível"
    },
    {
        subject: "Química",
        question: "A mudança de estado físico quando o vapor de água se transforma em água líquida é chamada de:",
        options: ["Ebulição", "Sublimação", "Evaporação", "Condensação"],
        answer: "Condensação"
    },
    {
        subject: "Biologia",
        question: "Em ecologia, o conjunto de condições e recursos que permitem a uma espécie sobreviver e se reproduzir no ambiente é chamado de:",
        options: ["Ecossistema", "Habitat", "Nicho ecológico", "Bioma"],
        answer: "Nicho ecológico"
    },
    {
        subject: "Biologia",
        question: "Qual dos seguintes ciclos biogeoquímicos é dividido nas etapas de fixação, nitrificação e desnitrificação?",
        options: ["Ciclo do Carbono", "Ciclo da Água", "Ciclo do Nitrogênio", "Ciclo do Oxigênio"],
        answer: "Ciclo do Nitrogênio"
    },
    {
        subject: "Português",
        question: "Na tirinha do Calvin, a fala '...as relações afetivas estão agonizando, Joana!'. A vírgula foi usada para separar um:",
        options: ["Vocativo", "Aposto", "Sujeito", "Predicado"],
        answer: "Vocativo"
    },
    {
        subject: "Português",
        question: "Em uma campanha de trânsito, a frase: '...sair de um acidente em alta velocidade pelo vidro da frente' indica uma:",
        options: ["Solução", "Prevenção", "Causa", "Consequência"],
        answer: "Consequência"
    }
];

// --- ELEMENTOS DO DOM ---
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const subjectSelection = document.getElementById('subject-selection');
const subjectTitle = document.getElementById('subject-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');

const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// --- VARIÁVEIS DE ESTADO DO QUIZ ---
let currentSubject = '';
let subjectQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// --- FUNÇÕES ---

// Inicializa o quiz, criando os botões de matéria
function initializeQuiz() {
    // Reseta o estado caso esteja voltando do início
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    subjectSelection.innerHTML = ''; // Limpa botões antigos

    // Pega todas as matérias únicas do banco de dados
    const subjects = [...new Set(quizData.map(q => q.subject))];
    
    subjects.forEach(subject => {
        const button = document.createElement('button');
        button.innerText = subject;
        button.classList.add('subject-btn');
        button.addEventListener('click', () => startSubjectQuiz(subject));
        subjectSelection.appendChild(button);
    });
}

// Inicia o quiz para uma matéria específica
function startSubjectQuiz(subject) {
    currentSubject = subject;
    // Filtra apenas as perguntas da matéria selecionada e embaralha
    subjectQuestions = quizData.filter(q => q.subject === subject).sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    loadQuestion();
}

// Carrega a pergunta atual
function loadQuestion() {
    resetState();
    const question = subjectQuestions[currentQuestionIndex];
    
    // Atualiza cabeçalho
    subjectTitle.innerText = currentSubject;
    progressText.innerText = `Questão ${currentQuestionIndex + 1} de ${subjectQuestions.length}`;
    progressBar.style.width = `${((currentQuestionIndex + 1) / subjectQuestions.length) * 100}%`;

    // Carrega pergunta e opções
    questionText.innerText = question.question;

    // Embaralha as opções
    const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        if (option === question.answer) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(button);
    });
}

// Reseta o estado entre as perguntas (limpa botões, cores, etc.)
function resetState() {
    nextBtn.classList.add('hidden');
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Chamada quando o usuário seleciona uma resposta
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';

    if (isCorrect) {
        score++;
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('incorrect');
    }

    // Mostra a resposta correta e desabilita todos os botões
    Array.from(optionsContainer.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextBtn.classList.remove('hidden');
}

// Mostra os resultados finais
function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    const scorePercent = Math.round((score / subjectQuestions.length) * 100);
    scoreText.innerText = `Você acertou ${score} de ${subjectQuestions.length} questões de ${currentSubject}! (${scorePercent}%)`;

    // Feedback simples
    if (scorePercent >= 80) {
        feedbackText.innerText = "Excelente! Você está muito bem preparado!";
    } else if (scorePercent >= 50) {
        feedbackText.innerText = "Bom trabalho! Continue revisando.";
    } else {
        feedbackText.innerText = "Não desanime! Continue estudando e tente novamente.";
    }
}

// --- EVENT LISTENERS ---

// Botão "Próxima Questão"
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < subjectQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// Botão "Tentar Novamente" (na tela de resultados)
restartBtn.addEventListener('click', () => {
    resultsScreen.classList.add('hidden');
    startSubjectQuiz(currentSubject); // Reinicia o quiz da mesma matéria
});

// Botão "Voltar ao Início" (na tela de resultados)
homeBtn.addEventListener('click', initializeQuiz);

// Inicia o aplicativo quando a página carregar
document.addEventListener('DOMContentLoaded', initializeQuiz);
