let questao = 0;
let dificuldade = 0;
let respostasCorretas = 0;


// Funções
function escolherDificuldade(event) {
    dificuldade = event.target.getAttribute('data-dificuldade');

    mostrarQuestao();
}

function mostrarQuestao() {
    if(quiz[dificuldade].perguntas[questao]) {
        let q = quiz[dificuldade].perguntas[questao];

        document.querySelector('.menu-escolha').style.display = 'none';

        document.querySelector('.area-perguntas').style.display = 'block';

        let pct = (questao / quiz[dificuldade].perguntas.length) * 100;
        document.querySelector('.barra-progresso').style.width = `${pct}%`;
        document.querySelector('.progresso').style.display = 'block';
        document.querySelector('.gol').style.display = 'block';

        document.querySelector('.pergunta').innerHTML = q.questao;
        document.querySelector('.opcoes').innerHTML = '';

        let html = '';

        for(let a in q.alternativas) {
            html += `<div data-opc="${a}" class="alternativa"><span>${parseInt(a) + 1}</span>${q.alternativas[a]}</div>`;
        }

        document.querySelector('.opcoes').innerHTML = html;

        document.querySelectorAll('.alternativa').forEach((item)=>{
            item.addEventListener('click', cliqueBotao);
        });

    } else {
        document.querySelector('.barra-progresso').style.width = `98%`;

        mostrarResultado();
    }
}

function mostrarResultado() {
    document.querySelector('.area-perguntas').style.display = 'none';
    document.querySelector('.area-placar').style.display = 'block';

    if(respostasCorretas < 3) {
        let img = document.querySelector('.placar-imagem div img');
        img.setAttribute('src', 'assests/images/triste.png');

        document.querySelector('.placar-resultado').innerHTML = 'Precisa treinar mais';
        document.querySelector('.placar-descricao').innerHTML = `Você acertou ${respostasCorretas} de ${quiz[dificuldade].perguntas.length}<br>${(respostasCorretas / quiz[dificuldade].perguntas.length) * 100}%`;
    } else if(respostasCorretas >= 3 && respostasCorretas < 7) {
        let img = document.querySelector('.placar-imagem div img');
        img.setAttribute('src', 'assests/images/assustado.png');

        document.querySelector('.placar-resultado').innerHTML = 'Boa';
        document.querySelector('.placar-descricao').innerHTML = `Você acertou ${respostasCorretas} de ${quiz[dificuldade].perguntas.length}<br>${(respostasCorretas / quiz[dificuldade].perguntas.length) * 100}%`;
    } else if(respostasCorretas >= 7) {
        let img = document.querySelector('.placar-imagem div img');
        img.setAttribute('src', 'assests/images/feliz.png');

        document.querySelector('.placar-resultado').innerHTML = 'Lenda Viva';
        document.querySelector('.placar-descricao').innerHTML = `Você acertou ${respostasCorretas} de ${quiz[dificuldade].perguntas.length}<br>${(respostasCorretas / quiz[dificuldade].perguntas.length) * 100}%`;
    }

    switch(dificuldade) {
        case '0':
            document.querySelector('.resultado-iniciante').innerHTML = `${respostasCorretas}/${quiz[dificuldade].perguntas.length}`;
            break;
        case '1':
            document.querySelector('.resultado-amador').innerHTML = `${respostasCorretas}/${quiz[dificuldade].perguntas.length}`;
            break;
        case '2':
            document.querySelector('.resultado-entusiasta').innerHTML = `${respostasCorretas}/${quiz[dificuldade].perguntas.length}`;
            break;
        case '3':
            document.querySelector('.resultado-lenda').innerHTML = `${respostasCorretas}/${quiz[dificuldade].perguntas.length}`;
            break;
    }

    document.querySelector('.continuar').addEventListener('click', limparQuiz);
    document.querySelector('.refazer').addEventListener('click', reiniciarQuiz);
}

function cliqueBotao(event) {
    let alternativaClicada = event.target.getAttribute('data-opc');
    
    if(quiz[dificuldade].perguntas[questao].correta == alternativaClicada) {
        respostasCorretas++;
    }

    questao++;
    mostrarQuestao();
}

function limparQuiz() {
    questao = 0;
    dificuldade = 0;
    respostasCorretas = 0;

    document.querySelector('.menu-escolha').style.display = 'block';
    document.querySelector('.area-placar').style.display = 'none';
    document.querySelector('.progresso').style.display = 'none';
    document.querySelector('.gol').style.display = 'none';
}

function reiniciarQuiz() {
    questao = 0;
    respostasCorretas = 0;

    document.querySelector('.area-placar').style.display = 'none';
    document.querySelector('.area-perguntas').style.display = 'block';

    document.querySelector('.barra-progresso').style.width = '0%';

    mostrarQuestao();
}


// Eventos
document.querySelectorAll('.opcoes-dificuldade').forEach((item)=>{
    item.addEventListener('click', escolherDificuldade);
});