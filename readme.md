# Desafio Node Pleno do curso B7Web

## Perguntas teóricas

### 1 - Explique o que é o Node.js e por que ele é amplamente utilizado no desenvolvimento de aplicações web? Explique a arquitetura baseada em eventos do Node.js e como ela permite o processamento assíncrono eficiente.

**Resposta:**

Node é uma implementação baseada no V8, o mesmo utilizado pelo Chrome para interpretar o Javascript no navegador. Foi feito para que se possa rodar Javascript no lado do servidor.
O event loop do Node é responsável por gerenciar o fluxo de execução do programa. Ele recebe eventos de entrada, como solicitações HTTP, e os distribui para os handlers correspondentes. Os handlers são então executados de forma assíncrona, o que significa que eles não bloqueiam o event loop de aceitar mais eventos.

Isso permite que o Node processe várias solicitações de entrada ao mesmo tempo, sem precisar criar novos processos.

### 2 - Descreva o ciclo de vida de uma requisição HTTP em uma aplicação Node.js, incluindo os principais componentes envolvidos e as etapas que ocorrem desde o recebimento da requisição até o envio da resposta ao cliente.

**Resposta:**

* Recebimento da Requisição:
Quando um cliente faz uma requisição HTTP para o servidor a aplicação recebe a requisição.

* Roteamento:
O servidor direciona a requisição para a rota correspondente com base no método HTTP (GET, POST, etc.) e no caminho (URL) especificados na requisição.

* Middlewares:
Eventualmente poderá passar por um middleware para validar a autenticação, autorização etc.

* Manipulação de Requisição:
Uma vez que a rota e os middlewares são tratados, a aplicação processa o conteúdo da requisição, como parâmetros, corpo (payload) e cabeçalhos.

* Execução da Lógica de Negócio:
Nesta etapa, a aplicação executa a lógica específica da rota, que pode envolver interações com banco de dados, serviços externos ou cálculos.

* Construção da Resposta:
Com os resultados das operações disponíveis, a aplicação constrói a resposta HTTP, definindo cabeçalhos, status e conteúdo.

* Envio da Resposta:
A resposta é enviada de volta ao cliente por meio da conexão HTTP estabelecida. O cliente recebe os dados e pode processar a resposta, geralmente por meio de dados JSON.

* Encerramento da Requisição:
Após a resposta ser enviada, a conexão é encerrada e a requisição é considerada concluída. Recursos temporários, como memória alocada para a requisição, são liberados e vida que segue \o/

### 3- Quais são as diferenças entre o Node.js e o JavaScript em um navegador web? O que o Node.js adiciona ao ambiente de execução JavaScript?

**Resposta:**

* O Javascript no navegador é executado totalmente no lado do client, ou seja, não tem recursos de segurança. É feito para manipular o DOM.

* Já o Node foi feito para ser executado no lado do servidor, dando acesso ao SO, criação de arquivos, possibilidade de criação de API's. Tudo isso, com segurança, uma vez que o usuário não consegue (ou não deveria conseguir) alterar nada do que está sendo executado no servidor.

### 4- Explique o conceito de programação assíncrona no Node.js e como ela é implementada usando callbacks, Promises e async/await

**Resposta:**

O assíncronismo é uma forma de executar um código demorado sem que isso trave a execução principal da call stack.

* Callback é uma função que é executada após a finalização de uma certo trecho de código.

* Promise é um objeto futuro. Onde usarmos temos que, por meio do encadeamento, chamar .then(), um método que devolverá a resposta (se passado como argumento no resolve), caso a promessa tenha sido resolvida com sucesso. E .catch para capturar um possível erro.

* O async/await é um recurso novo que nos permite, em vez de encadear chamada com o .then, já esperar a resposta. Usar async await é recomendável usar um try catch para que possamos capturar o erro e devolver ao client.

### 5- Quais são as principais diferenças entre os módulos CommonJS e os módulos ECMAScript (ES) no Node.js?

**Resposta:**

#### Módulos CommonJS:

* Carregamento Síncrono: Os módulos CommonJS são carregados de forma síncrona, o que significa que o código espera até que um módulo seja totalmente carregado antes de continuar.

* require e module.exports: A sintaxe require é usada para importar módulos, e module.exports é usada para exportar funcionalidades de um módulo.

#### Módulos ECMAScript (ES):

* Carregamento Assíncrono: Os módulos ES são carregados de forma assíncrona, o que permite que outros processos continuem enquanto os módulos são carregados.

* import e export: A sintaxe import é usada para importar módulos, e export é usada para exportar funcionalidades de um módulo.

* Suporte a Árvore de Módulos: Os módulos ES suportam uma árvore de módulos mais eficiente, permitindo o carregamento de apenas os módulos necessários.

### 6- O que é o npm? Como você pode usar o npm para gerenciar pacotes e dependências em um projeto Node.js? Descreva a finalidade do npm, como ele auxilia no gerenciamento de pacotes e dependências, e explique brevemente os principais comandos e funcionalidades do npm para instalar, atualizar e remover pacotes em um projeto Node.js.
**Resposta:**

NPM é um gerenciador de pacote padrão do Node. Com ele, podemos adicionar códigos de terceiros em nosso projeto. Como vários pacotes poden estar utilizando vários outros pacotes que outros utilizam, o NPM fica também responsável por linkar isso a apenas uma pasta da node_modules, fazendo com que diminua drasticamente a quantidade de arquivos que seriam baixados para cada pacote.

* npm init: inicia o package.json em um projeto Node.
* npm run {comando}: um facilitador para rodar comandos especificados na chave "script" do package.json.
* npm install {pacote} {argumentos}: adiciona um pacote ao projeto. O argumento mais utilizado é o --save-dev
* npm uninstall {pacote}: remove um pacote ao projeto.
* npm update {pacote}: faz o update de um pacote. Se não passar o pacote, tentará atualizar todos.

### 7- Explique o que é o Event Loop no Node.js e como ele funciona para lidar com operações assíncronas.
**Resposta:**

O Event Loop é o mecanismo que permite que o Node.js lide com tarefas assíncronas sem travar o programa.

**Como Funciona:**

* O código assíncrono é delegado.
* Callbacks são colocados na fila de tarefas.
* O Event Loop pega callbacks da fila e executa.
* Microtarefas (Promises) têm alta prioridade e são processadas antes.
* O ciclo se repete.

### 8- Quais são as melhores práticas para lidar com erros e exceções em uma aplicação Node.js?
**Resposta:**

Usando try catch. Assim, podemos devolver pro client uma mensagem personalizada em vez de um erro genérico estourado pelo JS. É recomendável usar o throw em uma classe personalizada para exceções que sejam esperadas, assim mantemos a rastrabilidade dos erros e as mensagens com um grau maior de personalização.

### 9- Descreva as principais características e recursos do framework Express.js e como ele é utilizado no desenvolvimento de aplicações web em Node.js.
**Resposta:**

* Extremamente leve e minimalista
* Possibilidade de criar rotas facilmente
* Permite usar middlewares
* Pode mandar respostas, status codes, definir cabeçalhos, etc

Ele é utilizado geralmente para fazer API's, onde terã um rota, com seu verbo, e devolverá uma resposta. Esse é o caso de uso mais comum.

Pode ser usado apenas como um serviço de Broker também.

### 10- Quais são as principais estratégias de autenticação e autorização em uma aplicação Node.js? Cite alguns exemplos de bibliotecas e frameworks utilizados para implementar essas estratégias.
**Resposta:**

A forma mais comum é usando JWT. JWT é um token gerado apartir de uma chave pública/privada, e contém os dados do usuário autenticado no payload.

A autorização pode ser feita por meio de ACL, que é a lista de controle de quais recursos tão usuário tem acesso. Aí que entra também os middlewares. Em rotas que  precise de autorização, é importante validar antes se tal usuário tem a devidade permissão.

Para o JWT pode ser utilizado a biblioteca jsonwebtoken. Para ACL, pode ser feito normalmente na mão, pois não é complexo, mas já vi usarem a node-acl. Passport.js é um framework que já tem vários recursos prontos sobre JWT, OAuth, ACL etc.


## Como rodar?

Abra o termina e rode o comando `docker compose up`