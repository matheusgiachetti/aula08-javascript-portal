/* ==========================================================
   Portal do Estudante - Script principal
   Tarefa 08 - Web Design (Facens)
   Aula: JS - Sintaxe, Variáveis e Estruturas
   ========================================================== */

// Mensagem no console para confirmar que o script externo foi carregado
console.log("Script carregado");

/* ==========================================================
   1. Dark mode (modo escuro)
   ========================================================== */

// Pega o botão de modo escuro pelo id
const botaoDark = document.getElementById("toggle-dark");

// Ao clicar no botão, liga ou desliga o modo escuro
botaoDark.addEventListener("click", function () {
    // toggle: adiciona a classe "dark" no body se não tiver, ou remove se já tiver
    document.body.classList.toggle("dark");

    // Verifica se o body está com a classe "dark" (resultado true ou false)
    const modoEscuroAtivo = document.body.classList.contains("dark");

    // Operador ternário: se o modo escuro estiver ativo, o botão oferece voltar ao claro
    botaoDark.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
});

/* ==========================================================
   2. Botão voltar ao topo
   ========================================================== */

// Pega o botão de voltar ao topo pelo id
const botaoTopo = document.getElementById("back-to-top");

// Toda vez que a página é rolada, verifica a posição da rolagem
window.addEventListener("scroll", function () {
    // window.scrollY = quantos pixels a página já foi rolada para baixo
    if (window.scrollY > 200) {
        // Passou de 200px: mostra o botão (classe .visivel do CSS)
        botaoTopo.classList.add("visivel");
    } else {
        // Está perto do topo: esconde o botão
        botaoTopo.classList.remove("visivel");
    }
});

// Ao clicar no botão, rola a página de volta ao topo com animação suave
botaoTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================================
   3. Efeito de digitação (typewriter)
   ========================================================== */

// Pega o span do título do banner onde o texto será "digitado"
const elementoDigitacao = document.getElementById("typewriter");

// Texto que será escrito letra por letra
const textoDigitacao = "Bem-vindo ao Portal do Estudante!";

// Posição da letra atual (começa na primeira, índice 0)
let index = 0;

// Velocidade da digitação em milissegundos (tempo entre uma letra e outra)
const velocidade = 100;

// Função que escreve uma letra por vez
function digitar() {
    // Enquanto ainda houver letras para escrever...
    if (index < textoDigitacao.length) {
        // charAt pega a letra na posição atual e ela é adicionada ao texto do span
        elementoDigitacao.textContent += textoDigitacao.charAt(index);

        // Avança para a próxima letra
        index++;

        // Chama a própria função de novo depois do tempo definido em "velocidade"
        setTimeout(digitar, velocidade);
    }
}

// Inicia o efeito de digitação assim que o script é carregado
digitar();

/* ==========================================================
   4. Modal (pop-up)
   ========================================================== */

// Pega o modal, o botão que abre e o botão que fecha
const modal = document.getElementById("modal");
const botaoAbrirModal = document.getElementById("open-modal");
const botaoFecharModal = document.getElementById("close-modal");

// Ao clicar em "Saiba mais", adiciona a classe .aberto e o modal aparece
botaoAbrirModal.addEventListener("click", function () {
    modal.classList.add("aberto");
});

// Ao clicar no "X", remove a classe .aberto e o modal some
botaoFecharModal.addEventListener("click", function () {
    modal.classList.remove("aberto");
});

// Ao clicar no fundo escuro (fora da caixa branca), o modal também fecha
modal.addEventListener("click", function (e) {
    // e.target é o elemento que recebeu o clique;
    // se for o próprio fundo do modal (e não a caixa de dentro), fecha
    if (e.target === modal) {
        modal.classList.remove("aberto");
    }
});

/* ==========================================================
   5. Calculadora de média
   ========================================================== */

// Pega os campos de nota, o botão e o parágrafo do resultado
const campoNota1 = document.getElementById("nota1");
const campoNota2 = document.getElementById("nota2");
const botaoCalcular = document.getElementById("btn-calcular");
const resultadoMedia = document.getElementById("resultado-media");

// Função que recebe as duas notas e devolve (return) a média
function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}

// Arrow function que recebe a média e devolve a situação do aluno
const classificar = (media) => {
    if (media >= 9) {
        return "Excelente";
    } else if (media >= 7) {
        return "Aprovado";
    } else {
        return "Reprovado";
    }
};

// Ao clicar em "Calcular", lê as notas, calcula e mostra o resultado
botaoCalcular.addEventListener("click", function () {
    // Remove as cores do cálculo anterior antes de aplicar a nova
    resultadoMedia.classList.remove("excelente", "aprovado", "reprovado", "aviso");

    // Se algum campo estiver vazio (operador lógico ||), mostra um aviso e para
    if (campoNota1.value === "" || campoNota2.value === "") {
        resultadoMedia.textContent = "Preencha as duas notas para calcular a média.";
        resultadoMedia.classList.add("aviso");
        return; // sai da função sem calcular
    }

    // .value sempre vem como texto (string); Number() converte para número
    const nota1 = Number(campoNota1.value);
    const nota2 = Number(campoNota2.value);

    // Mostra no console o tipo do dado antes e depois da conversão
    console.log(typeof campoNota1.value, typeof nota1); // "string" "number"

    // Se alguma nota estiver fora do intervalo de 0 a 10, mostra um aviso e para
    if (nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
        resultadoMedia.textContent = "As notas devem estar entre 0 e 10.";
        resultadoMedia.classList.add("aviso");
        return;
    }

    // Chama as funções: calcula a média e descobre a situação
    const media = calcularMedia(nota1, nota2);
    const situacao = classificar(media);

    // Mostra o resultado com template string (toFixed(2) deixa 2 casas decimais)
    resultadoMedia.textContent = `Média: ${media.toFixed(2)} - ${situacao}`;

    // Muda a cor do resultado de acordo com a situação
    if (situacao === "Excelente") {
        resultadoMedia.classList.add("excelente");
    } else if (situacao === "Aprovado") {
        resultadoMedia.classList.add("aprovado");
    } else {
        resultadoMedia.classList.add("reprovado");
    }
});

/* ==========================================================
   6. Lista de tarefas
   ========================================================== */

// Pega o campo de texto, o botão de adicionar, a lista e o contador
const campoTarefa = document.getElementById("nova-tarefa");
const botaoAdicionarTarefa = document.getElementById("btn-adicionar-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");

// Array de objetos: cada tarefa tem um texto e se está concluída (boolean)
let tarefas = [
    { texto: "Estudar variáveis e tipos de dados", concluida: false },
    { texto: "Montar o layout com Flexbox", concluida: true },
    { texto: "Revisar condicionais e laços de repetição", concluida: false }
];

// Filtro escolhido no momento: "todas", "pendentes" ou "concluidas"
let filtroTarefas = "todas";

// Função que desenha a lista na tela a partir do array de tarefas
function mostrarTarefas() {
    // Apaga os itens antigos para desenhar a lista de novo
    listaTarefas.innerHTML = "";

    // Percorre cada tarefa do array (forEach recebe a tarefa e a posição dela)
    tarefas.forEach(function (tarefa, posicao) {
        // Pula as tarefas que não combinam com o filtro escolhido
        if (filtroTarefas === "pendentes" && tarefa.concluida) {
            return; // dentro do forEach, return passa para a próxima tarefa
        }
        if (filtroTarefas === "concluidas" && !tarefa.concluida) {
            return;
        }

        // Cria o <li> da tarefa e adiciona a classe de estilo
        const item = document.createElement("li");
        item.classList.add("tarefa");

        // Se a tarefa estiver concluída, adiciona a classe que deixa o texto riscado
        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        // Cria o texto da tarefa
        const texto = document.createElement("span");
        texto.classList.add("tarefa-texto");
        texto.textContent = tarefa.texto;

        // Clique no texto: inverte a situação (operador lógico ! = "não")
        texto.addEventListener("click", function () {
            tarefa.concluida = !tarefa.concluida;
            mostrarTarefas(); // desenha a lista de novo com a mudança
        });

        // Cria o botão "×" de remover
        const botaoRemover = document.createElement("button");
        botaoRemover.classList.add("tarefa-remover");
        botaoRemover.textContent = "×";

        // Clique no "×": filter cria um novo array sem a tarefa desta posição
        botaoRemover.addEventListener("click", function () {
            tarefas = tarefas.filter(function (t, i) {
                return i !== posicao;
            });
            mostrarTarefas();
        });

        // Coloca o texto e o botão dentro do <li> e o <li> dentro da lista
        item.appendChild(texto);
        item.appendChild(botaoRemover);
        listaTarefas.appendChild(item);
    });

    // Se o filtro escondeu todas as tarefas, avisa na própria lista
    if (listaTarefas.innerHTML === "" && tarefas.length > 0) {
        listaTarefas.innerHTML = '<li class="tarefa">Nenhuma tarefa neste filtro.</li>';
    }

    // Conta as concluídas com filter e length
    const concluidas = tarefas.filter((t) => t.concluida).length;

    // Mostra o resumo; o ternário escolhe singular ou plural
    if (tarefas.length === 0) {
        contadorTarefas.textContent = "Nenhuma tarefa";
    } else {
        const palavra = tarefas.length === 1 ? "tarefa" : "tarefas";
        contadorTarefas.textContent = `${tarefas.length} ${palavra}, ${concluidas} concluída(s)`;
    }
}

// Ao clicar em "Adicionar", cria uma tarefa nova com o texto digitado
botaoAdicionarTarefa.addEventListener("click", function () {
    // .value pega o texto digitado no campo
    const textoNovo = campoTarefa.value;

    // Não deixa adicionar tarefa vazia
    if (textoNovo === "") {
        alert("Digite uma tarefa antes de adicionar.");
        return;
    }

    // Adiciona um novo objeto no fim do array (a próxima posição livre é o length)
    tarefas[tarefas.length] = { texto: textoNovo, concluida: false };

    // Limpa o campo e desenha a lista de novo
    campoTarefa.value = "";
    mostrarTarefas();
});

// Pega os três botões de filtro da lista de tarefas
const filtroTodas = document.getElementById("filtro-todas");
const filtroPendentes = document.getElementById("filtro-pendentes");
const filtroConcluidas = document.getElementById("filtro-concluidas");

// Arrow function que troca o filtro: destaca o botão clicado e redesenha a lista
const escolherFiltro = (botao, filtro) => {
    // querySelectorAll pega todos os botões de filtro; tira o destaque de cada um
    document.querySelectorAll(".tarefas-filtros .btn-filtro").forEach(function (b) {
        b.classList.remove("ativo");
    });
    botao.classList.add("ativo");

    filtroTarefas = filtro;
    mostrarTarefas();
};

// Cada botão chama a função com o seu próprio filtro
filtroTodas.addEventListener("click", () => escolherFiltro(filtroTodas, "todas"));
filtroPendentes.addEventListener("click", () => escolherFiltro(filtroPendentes, "pendentes"));
filtroConcluidas.addEventListener("click", () => escolherFiltro(filtroConcluidas, "concluidas"));

// Desenha a lista inicial assim que a página carrega
mostrarTarefas();

/* ==========================================================
   7. Notas da turma (array, forEach, filter e length)
   ========================================================== */

// Pega a lista, o resumo e os dois botões de filtro
const listaNotas = document.getElementById("lista-notas");
const resumoNotas = document.getElementById("resumo-notas");
const botaoNotasTodas = document.getElementById("btn-notas-todas");
const botaoNotasAprovadas = document.getElementById("btn-notas-aprovadas");

// Array de objetos com o nome do aluno e a nota final
const notasTurma = [
    { nome: "Ana", nota: 9.5 },
    { nome: "Bruno", nota: 6.0 },
    { nome: "Carla", nota: 7.5 },
    { nome: "Diego", nota: 4.5 },
    { nome: "Elisa", nota: 8.0 },
    { nome: "Felipe", nota: 6.5 },
    { nome: "Gabriela", nota: 10 },
    { nome: "Henrique", nota: 7.0 }
];

// Função que mostra na tela qualquer array de notas que receber
function mostrarNotas(lista) {
    // Limpa a lista antes de mostrar
    listaNotas.innerHTML = "";

    // forEach: cria um <li> para cada aluno do array
    lista.forEach(function (alunoTurma) {
        const item = document.createElement("li");
        item.classList.add("nota-item");

        // Classe de cor: verde se aprovado, vermelho se reprovado (ternário)
        item.classList.add(alunoTurma.nota >= 7 ? "aprovado" : "reprovado");

        // innerHTML para montar o nome e a nota em negrito
        item.innerHTML = `<span>${alunoTurma.nome}</span><strong>${alunoTurma.nota}</strong>`;
        listaNotas.appendChild(item);
    });
}

// Função que calcula a média de um array de notas com um laço for
function mediaDaTurma(lista) {
    let soma = 0; // acumulador

    for (let i = 0; i < lista.length; i++) {
        soma += lista[i].nota; // acessa cada aluno pelo índice
    }

    // Evita divisão por zero se o array estiver vazio
    return lista.length > 0 ? soma / lista.length : 0;
}

// Mostra a turma inteira e a média geral
function mostrarTodasAsNotas() {
    // Destaca o botão "Todas" e tira o destaque do outro
    botaoNotasTodas.classList.add("ativo");
    botaoNotasAprovadas.classList.remove("ativo");

    // Mostra o array completo e calcula a média geral
    mostrarNotas(notasTurma);
    const media = mediaDaTurma(notasTurma);

    // Resumo com a quantidade (length) e a média com 2 casas decimais
    resumoNotas.textContent = `${notasTurma.length} alunos na turma - média geral: ${media.toFixed(2)}`;
}

// Botão "Todas"
botaoNotasTodas.addEventListener("click", mostrarTodasAsNotas);

// Botão "Só aprovados": filter cria um novo array só com nota >= 7
botaoNotasAprovadas.addEventListener("click", function () {
    // Destaca o botão "Só aprovados" e tira o destaque do outro
    botaoNotasAprovadas.classList.add("ativo");
    botaoNotasTodas.classList.remove("ativo");

    // Arrow function no filter: fica só quem tem nota maior ou igual a 7
    const aprovados = notasTurma.filter((alunoTurma) => alunoTurma.nota >= 7);

    // Mostra só o array filtrado
    mostrarNotas(aprovados);
    // length informa quantos alunos ficaram depois do filtro
    resumoNotas.textContent = `${aprovados.length} de ${notasTurma.length} alunos aprovados`;
});

// Mostra todas as notas ao carregar a página
mostrarTodasAsNotas();

/* ==========================================================
   8. Cartão do aluno (objeto com método e this)
   ========================================================== */

// Objeto aluno com propriedades e métodos
const aluno = {
    nome: "Aluno Visitante",
    idade: 19,
    curso: "Engenharia de Computação",
    ra: "000000",
    semestre: 2,

    // Método que monta uma frase de apresentação; this aponta para o próprio objeto
    apresentar: function () {
        return `Olá! Eu sou ${this.nome}, tenho ${this.idade} anos e curso ${this.curso} (${this.semestre}º semestre).`;
    },

    // Método que devolve a primeira letra do nome (para o avatar do cartão)
    inicial: function () {
        return this.nome.charAt(0);
    }
};

// Pega os elementos do cartão que mostram os dados
const cartaoNome = document.getElementById("aluno-nome");
const cartaoInicial = document.getElementById("aluno-inicial");
const cartaoIdade = document.getElementById("aluno-idade");
const cartaoCurso = document.getElementById("aluno-curso");
const cartaoRa = document.getElementById("aluno-ra");
const cartaoSemestre = document.getElementById("aluno-semestre");
const cartaoMensagem = document.getElementById("cartao-mensagem");

// Função que copia os dados do objeto para o cartão na tela
function atualizarCartao() {
    cartaoNome.textContent = aluno.nome;
    cartaoInicial.textContent = aluno.inicial();
    cartaoIdade.textContent = `${aluno.idade} anos`;
    cartaoCurso.textContent = aluno.curso;
    cartaoRa.textContent = aluno.ra;
    cartaoSemestre.textContent = `${aluno.semestre}º`;
}

// Botão "Mostrar dados": exibe na página o retorno do método apresentar()
document.getElementById("btn-mostrar-dados").addEventListener("click", function () {
    cartaoMensagem.textContent = aluno.apresentar();
});

// Botão "Alterar nome": pede o nome com prompt e atualiza o objeto e o cartão
document.getElementById("btn-alterar-nome").addEventListener("click", function () {
    const novoNome = prompt("Digite o seu nome:", aluno.nome);

    // prompt devolve null se o usuário cancelar; também não aceita nome vazio
    if (novoNome === null || novoNome === "") {
        cartaoMensagem.textContent = "O nome não foi alterado.";
        return;
    }

    // confirm pergunta antes de alterar (true = OK, false = Cancelar)
    if (confirm(`Alterar o nome para "${novoNome}"?`)) {
        aluno.nome = novoNome; // altera a propriedade do objeto
        atualizarCartao();
        cartaoMensagem.textContent = `Nome alterado para ${aluno.nome}.`;
    }
});

// Preenche o cartão com os dados do objeto ao carregar a página
atualizarCartao();

/* ==========================================================
   9. Tabuada (laço for)
   ========================================================== */

// Pega o campo do número, o botão e a lista do resultado
const campoTabuada = document.getElementById("numero-tabuada");
const botaoTabuada = document.getElementById("btn-tabuada");
const resultadoTabuada = document.getElementById("resultado-tabuada");

// Ao clicar em "Gerar tabuada", monta as 10 linhas
botaoTabuada.addEventListener("click", function () {
    // Limpa o resultado anterior
    resultadoTabuada.innerHTML = "";

    // Se o campo estiver vazio, mostra um aviso e para
    if (campoTabuada.value === "") {
        resultadoTabuada.innerHTML = '<li class="tabuada-vazia">Digite um número para gerar a tabuada.</li>';
        return;
    }

    // Converte o texto do campo em número
    const numero = Number(campoTabuada.value);

    // Laço for: repete de 1 até 10, criando uma linha a cada volta
    for (let i = 1; i <= 10; i++) {
        const linha = document.createElement("li");
        linha.textContent = `${numero} x ${i} = ${numero * i}`;
        resultadoTabuada.appendChild(linha);
    }
});

/* ==========================================================
   10. Formulário de contato (validação e contador)
   ========================================================== */

// Pega os campos, o contador, o botão e o parágrafo de retorno
const campoNome = document.getElementById("contato-nome");
const campoEmail = document.getElementById("contato-email");
const campoAssunto = document.getElementById("contato-assunto");
const campoMensagem = document.getElementById("contato-mensagem");
const contadorCaracteres = document.getElementById("contador-caracteres");
const botaoEnviar = document.getElementById("btn-enviar");
const retornoFormulario = document.getElementById("form-retorno");

// Limite de caracteres da mensagem (o mesmo do maxlength no HTML)
const limiteMensagem = 300;

// Função que atualiza o contador "x / 300"
function atualizarContador() {
    const quantidade = campoMensagem.value.length;
    contadorCaracteres.textContent = `${quantidade} / ${limiteMensagem}`;

    // Perto do limite (90% ou mais), o contador fica vermelho
    if (quantidade >= limiteMensagem * 0.9) {
        contadorCaracteres.classList.add("limite");
    } else {
        contadorCaracteres.classList.remove("limite");
    }
}

// Evento "input": dispara a cada letra digitada ou apagada
campoMensagem.addEventListener("input", atualizarContador);

// Função que verifica se o e-mail tem "@" e um "." depois dele, letra por letra
function emailValido(email) {
    let temArroba = false;
    let temPonto = false;

    for (let i = 0; i < email.length; i++) {
        const letra = email.charAt(i);

        // Espaço não é permitido em e-mail
        if (letra === " ") {
            return false;
        }
        // Achou o "@": marca e passa para a próxima letra
        if (letra === "@") {
            temArroba = true;
            continue;
        }
        // Achou um "." depois do "@": já tem tudo, então sai do laço
        if (letra === "." && temArroba) {
            temPonto = true;
            break;
        }
    }

    // Válido só se tiver os dois (operador lógico &&)
    return temArroba && temPonto;
}

// Função que mostra a mensagem de retorno com a cor certa
function mostrarRetorno(texto, tipo) {
    retornoFormulario.classList.remove("sucesso");
    retornoFormulario.classList.remove("erro");
    retornoFormulario.classList.add(tipo);
    retornoFormulario.textContent = texto;
}

// Ao clicar em "Enviar mensagem", valida tudo antes de "enviar"
botaoEnviar.addEventListener("click", function () {
    const nome = campoNome.value;
    const email = campoEmail.value;
    const assunto = campoAssunto.value;
    const mensagem = campoMensagem.value;

    // Algum campo vazio? (operador lógico ||)
    if (nome === "" || email === "" || assunto === "" || mensagem === "") {
        mostrarRetorno("Preencha todos os campos antes de enviar.", "erro");
    } else if (!emailValido(email)) {
        mostrarRetorno("Digite um e-mail válido, como nome@email.com.", "erro");
    } else if (mensagem.length < 10) {
        mostrarRetorno("A mensagem precisa ter pelo menos 10 caracteres.", "erro");
    } else {
        // Tudo certo: mostra a confirmação (o site é fictício, nada é enviado)
        mostrarRetorno(`Obrigado, ${nome}! Sua mensagem foi enviada.`, "sucesso");

        // Limpa os campos e zera o contador
        campoNome.value = "";
        campoEmail.value = "";
        campoAssunto.value = "";
        campoMensagem.value = "";
        atualizarContador();
    }
});

/* ==========================================================
   11. Alterar o texto de boas-vindas com botão (JS + DOM)
   ========================================================== */

// Pega o parágrafo do banner e o botão que troca a mensagem
const mensagemBoasVindas = document.getElementById("mensagem-boas-vindas");
const botaoTrocarMensagem = document.getElementById("btn-trocar-mensagem");

// Array com as mensagens que vão se revezar
const mensagens = [
    "Organize seus estudos, acompanhe suas notas e conheça as disciplinas do semestre.",
    "Bons estudos! Cada aula conta para a sua aprovação.",
    "Não esqueça de conferir o quadro de horários desta semana.",
    "Dica: use a lista de tarefas para não perder nenhuma entrega.",
    "Programar é praticar: teste o código no console sempre que puder!"
];

// Posição da mensagem que está na tela agora
let mensagemAtual = 0;

// A cada clique, mostra a próxima mensagem do array
botaoTrocarMensagem.addEventListener("click", function () {
    // Avança uma posição; o % (resto da divisão) volta para 0 depois da última
    mensagemAtual = (mensagemAtual + 1) % mensagens.length;

    // textContent troca o texto do parágrafo na tela
    mensagemBoasVindas.textContent = mensagens[mensagemAtual];
});

/* ==========================================================
   12. Mural de avisos (marcar todos como lidos)
   ========================================================== */

// Pega o contador de avisos e o botão "Marcar todos como lidos"
const contadorAvisos = document.getElementById("contador-avisos");
const botaoAvisosLidos = document.getElementById("btn-avisos-lidos");

// Ao carregar, o contador mostra quantos avisos têm a classe .nao-lido (length)
contadorAvisos.textContent = document.querySelectorAll(".nao-lido").length;

// Ao clicar, todos os avisos passam a ser lidos
botaoAvisosLidos.addEventListener("click", function () {
    // querySelectorAll devolve todos os avisos não lidos
    const avisosNaoLidos = document.querySelectorAll(".nao-lido");

    // forEach: tira a classe .nao-lido de cada aviso (a borda azul some)
    avisosNaoLidos.forEach(function (aviso) {
        aviso.classList.remove("nao-lido");
    });

    // Zera o contador na tela
    contadorAvisos.textContent = 0;
});

/* ==========================================================
   13. Quadro de horários (destacar o dia escolhido)
   ========================================================== */

// Pega o texto abaixo da tabela
const horariosInfo = document.getElementById("horarios-info");

// Função que recebe o dia ("seg", "ter"...), o nome do dia e o botão clicado
function destacarDia(dia, nomeDia, botao) {
    // Tira o destaque de todas as células da tabela
    document.querySelectorAll(".tabela-horarios th, .tabela-horarios td").forEach(function (celula) {
        celula.classList.remove("destaque");
    });

    // Destaca as células da coluna do dia (ex.: ".col-seg")
    document.querySelectorAll(`.col-${dia}`).forEach(function (celula) {
        celula.classList.add("destaque");
    });

    // Tira o .ativo de todos os botões de dia e coloca só no botão clicado
    document.querySelectorAll(".horarios-filtros .btn-filtro").forEach(function (b) {
        b.classList.remove("ativo");
    });
    botao.classList.add("ativo");

    // Monta a lista das aulas do dia, juntando os textos das células do corpo da tabela
    let aulas = "";
    document.querySelectorAll(`.tabela-horarios tbody .col-${dia}`).forEach(function (celula, i) {
        // Antes da segunda aula em diante, coloca " e " para separar (ternário)
        aulas += (i > 0 ? " e " : "") + celula.textContent;
    });

    // Mostra o resumo do dia abaixo da tabela
    horariosInfo.textContent = `${nomeDia}: ${aulas}.`;
}

// Array de objetos com o código e o nome de cada dia da semana
const diasDaSemana = [
    { dia: "seg", nome: "Segunda-feira" },
    { dia: "ter", nome: "Terça-feira" },
    { dia: "qua", nome: "Quarta-feira" },
    { dia: "qui", nome: "Quinta-feira" },
    { dia: "sex", nome: "Sexta-feira" }
];

// Para cada dia, pega o botão pelo id (ex.: "btn-dia-seg") e registra o clique
diasDaSemana.forEach(function (item) {
    const botaoDia = document.getElementById(`btn-dia-${item.dia}`);
    botaoDia.addEventListener("click", function () {
        destacarDia(item.dia, item.nome, botaoDia);
    });
});

/* ==========================================================
   14. Depoimentos (navegar com as setas)
   ========================================================== */

// Pega todos os depoimentos, as setas e o texto da posição
const depoimentos = document.querySelectorAll(".depoimento");
const botaoDepoimentoAnterior = document.getElementById("depoimento-anterior");
const botaoDepoimentoProximo = document.getElementById("depoimento-proximo");
const posicaoDepoimentoTexto = document.getElementById("depoimento-posicao");

// Posição do depoimento que está aparecendo (começa no primeiro, índice 0)
let posicaoDepoimento = 0;

// Função que esconde o depoimento atual e mostra o da nova posição
function mostrarDepoimento(novaPosicao) {
    // Tira o .ativo do depoimento atual (o CSS esconde)
    depoimentos[posicaoDepoimento].classList.remove("ativo");

    // Guarda a nova posição e coloca .ativo no novo depoimento (o CSS mostra)
    posicaoDepoimento = novaPosicao;
    depoimentos[posicaoDepoimento].classList.add("ativo");

    // Atualiza o texto da posição, ex.: "2 / 5" (o índice começa em 0, por isso o + 1)
    posicaoDepoimentoTexto.textContent = `${posicaoDepoimento + 1} / ${depoimentos.length}`;
}

// Seta da direita: vai para o próximo; depois do último, volta ao primeiro
botaoDepoimentoProximo.addEventListener("click", function () {
    let proxima = posicaoDepoimento + 1;
    if (proxima >= depoimentos.length) {
        proxima = 0;
    }
    mostrarDepoimento(proxima);
});

// Seta da esquerda: vai para o anterior; antes do primeiro, vai para o último
botaoDepoimentoAnterior.addEventListener("click", function () {
    let anterior = posicaoDepoimento - 1;
    if (anterior < 0) {
        anterior = depoimentos.length - 1;
    }
    mostrarDepoimento(anterior);
});

// Mostra a posição inicial correta (ex.: "1 / 5") ao carregar a página
mostrarDepoimento(0);

/* ==========================================================
   15. Perguntas frequentes (abrir e fechar respostas)
   ========================================================== */

// Pega todas as perguntas e todos os itens do FAQ (as duas listas têm a mesma ordem)
const perguntasFaq = document.querySelectorAll(".faq-pergunta");
const itensFaq = document.querySelectorAll(".faq-item");

// forEach: registra o clique em cada pergunta, usando o índice para achar o item dela
perguntasFaq.forEach(function (pergunta, i) {
    pergunta.addEventListener("click", function () {
        // toggle: abre a resposta se estiver fechada e fecha se estiver aberta
        itensFaq[i].classList.toggle("aberto");
    });
});
