# Portal do Estudante

Site fictício de um portal acadêmico, criado na **Tarefa 08** da disciplina de **Web Design** (Facens).
A página reúne um mural de avisos, calculadora de média, notas da turma, disciplinas, cartão do aluno, quadro de horários, lista de tarefas, tabuada, depoimentos, perguntas frequentes e um formulário de contato.
Toda a interatividade é feita com **JavaScript puro**, aplicando os conteúdos da aula **"JS: Sintaxe, Variáveis e Estruturas"**.

## Objetivo da atividade

- Praticar a sintaxe básica do JavaScript: variáveis, tipos de dados, operadores e estruturas de controle.
- Manipular o DOM para deixar a página interativa (eventos, textos, classes CSS e criação de elementos).
- Recriar os exemplos vistos em aula: dark mode, botão voltar ao topo, efeito de digitação, pop-up (modal) e alterar texto com botão.
- Usar arrays, objetos e laços de repetição em funcionalidades reais da página.
- Manter o JavaScript em um arquivo externo, separado do HTML e do CSS.
- Aproveitar o layout com Flexbox e a responsividade estudados na aula anterior.

## Tecnologias

- **HTML5**: estrutura da página com tags semânticas (`header`, `nav`, `main`, `section`, `article`, `footer`), tabela e formulário.
- **CSS3**: variáveis de cor no `:root`, Flexbox, `hover`, `transition` e `@media` para celular.
- **JavaScript (ES6)**: puro, sem frameworks, bibliotecas ou CDN.
- **Git e GitHub**: versionamento com um commit por etapa.

## Como abrir o projeto

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/matheusgiachetti/aula08-javascript-portal.git
   ```
2. Abra a pasta do projeto.
3. Dê dois cliques no arquivo `index.html` para abrir no navegador (não precisa de servidor).
4. Para ver as mensagens do JavaScript, abra o console do navegador com **F12** > aba **Console**.
   Ao carregar a página deve aparecer a mensagem `Script carregado`.

## Estrutura de arquivos

```
aula08-javascript-portal/
├── index.html   # estrutura da página (HTML semântico)
├── style.css    # estilos, Flexbox, modo escuro e responsividade
├── script.js    # todas as funcionalidades em JavaScript
├── README.md    # documentação do projeto
└── .gitignore   # arquivos que não vão para o Git
```

O `script.js` é ligado no final do `body` com `<script src="script.js"></script>`, para que o HTML já exista quando o script rodar.
Não há JavaScript inline nem atributos `onclick` no HTML: todos os eventos são registrados com `addEventListener`.

## Funcionalidades

### 1. Dark mode (modo escuro)

**O que faz:** o botão "Modo escuro" do cabeçalho troca o tema da página entre claro e escuro, e o texto do botão muda para indicar a próxima ação.

**Como funciona:** o CSS define as cores em variáveis no `:root`; a classe `.dark` no `body` redefine essas variáveis, então o site inteiro muda de cor de uma vez.

**Conceitos de JS:** `const`, `getElementById`, `addEventListener`, `classList.toggle`, operador ternário e `textContent`.

```js
document.body.classList.toggle("dark");
const modoEscuroAtivo = document.body.classList.contains("dark");
botaoDark.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
```

### 2. Botão voltar ao topo

**O que faz:** um botão redondo com uma seta aparece no canto inferior direito depois que a página é rolada mais de 200 pixels. Ao clicar, a página volta ao topo com animação suave.

**Conceitos de JS:** evento `scroll`, `window.scrollY`, comparação `>`, `if/else`, `classList.add/remove` e `window.scrollTo` com um objeto de opções.

```js
if (window.scrollY > 200) {
    botaoTopo.classList.add("visivel");
} else {
    botaoTopo.classList.remove("visivel");
}
window.scrollTo({ top: 0, behavior: "smooth" });
```

### 3. Efeito de digitação (typewriter)

**O que faz:** o título do banner é escrito letra por letra ao abrir a página.

**Conceitos de JS:** `let` (o índice muda), `length`, `charAt`, `+=`, `index++`, `if` e `setTimeout`.

```js
function digitar() {
    if (index < textoDigitacao.length) {
        elementoDigitacao.textContent += textoDigitacao.charAt(index);
        index++;
        setTimeout(digitar, velocidade);
    }
}
```

### 4. Pop-up (modal)

**O que faz:** o botão "Saiba mais" abre uma janela de boas-vindas. Ela fecha pelo botão "×" ou ao clicar fora da caixa.

**Conceitos de JS:** `addEventListener`, `classList.add/remove`, objeto do evento (`e.target`) e igualdade estrita `===`.

```js
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.remove("aberto");
    }
});
```

### 5. Calculadora de média

**O que faz:** lê duas notas, mostra a média e a situação com uma cor diferente para cada caso. Avisa se algum campo estiver vazio ou se a nota estiver fora de 0 a 10.

| Média        | Situação  | Cor      |
|--------------|-----------|----------|
| 9 ou mais    | Excelente | azul     |
| de 7 a 8,99  | Aprovado  | verde    |
| menor que 7  | Reprovado | vermelho |

**Conceitos de JS:** `.value`, `Number()`, `typeof`, operadores aritméticos, `||`, `function` com `return`, arrow function, `if / else if / else`, template string e `classList`.

```js
function calcularMedia(nota1, nota2) {
    return (nota1 + nota2) / 2;
}
```

### 6. Lista de tarefas

**O que faz:** o usuário digita uma tarefa e clica em "Adicionar". Clicar no texto marca a tarefa como concluída (texto riscado) e clicar no "×" remove o item. Os filtros mostram todas, só as pendentes ou só as concluídas, e um contador resume a lista.

**Como funciona:** as tarefas ficam em um **array de objetos** (`{ texto, concluida }`). A função `mostrarTarefas()` limpa a lista com `innerHTML = ""` e cria cada item de novo com `createElement` e `appendChild`. Remover uma tarefa é criar um novo array sem ela, usando `filter`.

**Conceitos de JS:** array de objetos, `forEach`, `filter`, `length`, `createElement`, `appendChild`, `.value`, operador lógico `!`, `alert`, `querySelectorAll` e arrow functions.

```js
const item = document.createElement("li");
item.classList.add("tarefa");
item.appendChild(texto);
item.appendChild(botaoRemover);
listaTarefas.appendChild(item);

tarefas = tarefas.filter(function (t, i) {
    return i !== posicao;
});
```

### 7. Notas da turma

**O que faz:** mostra as notas de 8 alunos (borda verde para aprovados e vermelha para reprovados) com a média geral. O botão "Só aprovados" exibe apenas quem tirou 7 ou mais e informa quantos são.

**Conceitos de JS:** array, `forEach` para exibir, `filter` para selecionar os aprovados, `length` para contar, laço `for` com acumulador para a média e ternário para a cor.

```js
const aprovados = notasTurma.filter((alunoTurma) => alunoTurma.nota >= 7);
mostrarNotas(aprovados);
resumoNotas.textContent = `${aprovados.length} de ${notasTurma.length} alunos aprovados`;
```

### 8. Cartão do aluno

**O que faz:** uma carteirinha digital mostra os dados de um objeto `aluno`. "Mostrar dados" exibe uma frase de apresentação e "Alterar nome" pede um novo nome com `prompt`, confirma com `confirm` e atualiza o cartão (inclusive a inicial do avatar).

**Conceitos de JS:** objeto com propriedades e métodos, `this`, template string, `prompt`, `confirm`, `null` e `textContent`.

```js
const aluno = {
    nome: "Aluno Visitante",
    idade: 19,
    curso: "Engenharia de Computação",
    apresentar: function () {
        return `Olá! Eu sou ${this.nome}, tenho ${this.idade} anos e curso ${this.curso}.`;
    }
};
```

### 9. Tabuada

**O que faz:** o usuário digita um número e a tabuada de 1 a 10 aparece na tela, em duas colunas.

**Conceitos de JS:** laço `for`, `Number()`, operador `*`, template string, `createElement` e `appendChild`.

```js
for (let i = 1; i <= 10; i++) {
    const linha = document.createElement("li");
    linha.textContent = `${numero} x ${i} = ${numero * i}`;
    resultadoTabuada.appendChild(linha);
}
```

### 10. Formulário de contato

**O que faz:** valida nome, e-mail, assunto e mensagem antes de "enviar". Mostra a mensagem de erro ou de sucesso em vermelho ou verde, limpa os campos após o envio e tem um contador de caracteres que fica vermelho perto do limite de 300.

**Como funciona:** o e-mail é conferido letra por letra com um laço `for`: `continue` pula para a próxima letra ao achar o "@" e `break` encerra o laço ao achar um "." depois dele.

**Conceitos de JS:** `if / else if / else`, operadores lógicos `||`, `&&` e `!`, evento `input`, `length`, `for`, `break`, `continue` e `textContent`.

```js
campoMensagem.addEventListener("input", atualizarContador);

if (nome === "" || email === "" || assunto === "" || mensagem === "") {
    mostrarRetorno("Preencha todos os campos antes de enviar.", "erro");
}
```

### 11. Alterar o texto de boas-vindas

**O que faz:** o botão "Nova mensagem" do banner troca o texto de boas-vindas, passando por 5 mensagens e voltando à primeira.

**Conceitos de JS:** array, índice, operador `%` (resto da divisão) e `textContent` (exemplo JS + DOM da aula).

```js
mensagemAtual = (mensagemAtual + 1) % mensagens.length;
mensagemBoasVindas.textContent = mensagens[mensagemAtual];
```

### 12. Mural de avisos

**O que faz:** os avisos novos aparecem com uma borda azul e um contador mostra quantos ainda não foram lidos. O botão "Marcar todos como lidos" tira o destaque de todos e zera o contador.

**Conceitos de JS:** `querySelectorAll`, `length` (contagem inicial), `forEach`, `classList.remove` e `textContent`.

```js
document.querySelectorAll(".nao-lido").forEach(function (aviso) {
    aviso.classList.remove("nao-lido");
});
contadorAvisos.textContent = 0;
```

### 13. Quadro de horários

**O que faz:** os botões Segunda a Sexta destacam a coluna do dia na tabela, deixam o botão clicado selecionado e escrevem abaixo da tabela as aulas daquele dia (ex.: "Segunda-feira: Web Design e Algoritmos.").

**Como funciona:** uma única função `destacarDia(dia, nomeDia, botao)` faz todo o trabalho. Os cinco botões são ligados a ela percorrendo um array de objetos com `forEach`, sem repetir código.

**Conceitos de JS:** função com parâmetros, array de objetos, `forEach` com índice, template string no seletor (`.col-${dia}`), `classList.add/remove`, operador `+=` e ternário.

```js
document.querySelectorAll(`.col-${dia}`).forEach(function (celula) {
    celula.classList.add("destaque");
});
horariosInfo.textContent = `${nomeDia}: ${aulas}.`;
```

### 14. Depoimentos

**O que faz:** mostra um depoimento por vez. As setas avançam e voltam, e o texto do meio mostra a posição (ex.: "2 / 5"). Depois do último, a seta da direita volta ao primeiro; antes do primeiro, a da esquerda vai ao último.

**Conceitos de JS:** variável `let` de posição, `if` para voltar ao início/fim, índice e `length` da lista de depoimentos, `classList` e template string.

```js
let proxima = posicaoDepoimento + 1;
if (proxima >= depoimentos.length) {
    proxima = 0;
}
mostrarDepoimento(proxima);
```

### 15. Perguntas frequentes (FAQ)

**O que faz:** as respostas começam escondidas. Clicar em uma pergunta abre a resposta (o "+" gira e vira "×") e clicar de novo fecha.

**Conceitos de JS:** `querySelectorAll`, `forEach` com índice e `classList.toggle`.

```js
perguntasFaq.forEach(function (pergunta, i) {
    pergunta.addEventListener("click", function () {
        itensFaq[i].classList.toggle("aberto");
    });
});
```

## Conceitos da aula aplicados

- **Variáveis:** `const` para valores fixos (elementos do DOM, arrays, o objeto `aluno`) e `let` para o que muda (índices, lista de tarefas, filtro atual, acumulador da média).
- **Tipos de dados:** string, number, boolean (`concluida`, `temArroba`), `null` (retorno do `prompt` cancelado), arrays e objetos. O `typeof` mostra no console que `.value` é `"string"` e, depois do `Number()`, vira `"number"`.
- **Operadores aritméticos:** `+`, `/`, `*` e `%` (média, tabuada e rodízio das mensagens).
- **Operadores de comparação:** `>`, `>=`, `<`, `<=`, `===` e `!==`.
- **Operadores lógicos:** `||` (algum campo vazio), `&&` (e-mail com "@" e ".") e `!` (inverter a tarefa concluída).
- **Operadores de atribuição:** `=`, `+=` e `++`.
- **Condicionais:** `if/else`, `if / else if / else` e o operador ternário.
- **Repetição:** laços `for` na tabuada, na média da turma e na validação do e-mail, com `break` e `continue`.
- **Funções:** declaração com `function`, arrow function, parâmetros, `return` e funções como callback dos eventos.
- **Arrays:** índice, `length`, `forEach` e `filter` (tarefas, notas, mensagens, dias da semana e as listas do `querySelectorAll`).
- **Objetos:** o objeto `aluno` com propriedades, métodos e `this`, e os objetos das tarefas e das notas.
- **Caixas de diálogo:** `alert` (tarefa vazia), `prompt` e `confirm` (alterar nome).
- **DOM:** `getElementById`, `querySelector`, `querySelectorAll`, `addEventListener`, `textContent`, `innerHTML`, `value`, `classList`, `createElement` e `appendChild`.
- **Tempo e rolagem:** `setTimeout`, `window.scrollY` e `window.scrollTo`.

## Responsividade

- O layout usa **Flexbox** em todas as seções: cabeçalho, banner, cards, notas, cartão, tarefas, tabuada, depoimentos, FAQ, formulário e rodapé.
- Cards, notas e colunas do rodapé usam `flex-wrap: wrap` com largura base e se reorganizam sozinhos.
- A tabela de horários fica dentro de uma área com rolagem horizontal para não quebrar o layout no celular.
- Em telas de até **768px**: cabeçalho, avisos, formulários e rodapé ficam em coluna, a tabuada passa para uma coluna e os espaçamentos diminuem.
- Em telas de até **400px**: o título do banner diminui mais e os dados do cartão ficam um embaixo do outro.

## Melhorias e novos recursos

Além dos cinco exemplos da aula (funcionalidades 1 a 5), o projeto recebeu:

- **Dez novos recursos em JavaScript (6 a 15):** lista de tarefas, notas da turma, cartão do aluno, tabuada, formulário de contato, troca da mensagem de boas-vindas, mural de avisos, quadro de horários, depoimentos e perguntas frequentes.
- **Novas seções no HTML:** cada recurso tem sua própria seção semântica, com links no menu e no rodapé.
- **Visual:** `hover` e `transition` em botões, cards, links e itens de lista; cartão do aluno em degradê; tabela de horários com destaque de coluna; rodapé em três colunas.
- **Modo escuro completo:** todas as seções novas usam as mesmas variáveis de cor, então também mudam de tema.
- **Validações:** avisos para campos vazios, notas fora de 0 a 10, e-mail inválido e mensagem curta.
- **Código sem repetição:** funções reaproveitadas, como `destacarDia`, `mostrarTarefas`, `mostrarNotas` e `mostrarDepoimento`.
- **Revisão do código:** todo o HTML, CSS e JS comentado em português; console sem erros e todos os ids e classes usados no JS conferidos no HTML.

## Contagem de linhas

| Arquivo    | Linhas |
|------------|--------|
| index.html | 558 |
| style.css  | 1329 |
| script.js  | 769 |
| README.md  | 323 |

## Autor

**Matheus Giachetti**
Facens — Web Design
Prof. Deivison S. Takatu
