# App Pague Facil
## Iniciar projeto

 - Clone o repositório no endereço: https://github.com/AlanFerreiraDev/pague-facil;
 - Para rodar o projeto voce precisa rodar o comando ``` yarn start ou npm start ```;
 - Não esquecendo que voce precisa ter o node, npm e yarn instalados na sua máquina, além de uma IDE, eu recomendo o VSCODE.

## Tecnologias, Banco de dados e Bibliotecas instaladas
 - Foram utilizados nesse projeto, React e Sass.
 - Banco de Dados -> Firebase = Comandos para instalação ``` yarn add firebase ou npm install firebase ```;
 - Rotas -> React Router DOM = Comandos para instalação ``` yarn add react-router-dom ou nom install react-router-dom ```;
 - Alertas -> Toastify = Comandos para instalação ``` npm install react-toastify ou yarn ass react-toastify ```;
 - Ícones -> React Icons = Comandos para instalação ``` npm install react-icons ou yarn add react-icons ```;
 - Datas -> date-fns = Comandos para instalação ``` npm install date-fns ou yarn add date-fns ```;
- Form -> Unform = Comandos para instalação ``` npm install @unform/core @unform/web ou yarn add @unform/core @unform/web ```;
- Validação -> Yup = Comandos para instalação ``` npm install yup ou yarn add yup ```;

## O Projeto contém 05 Páginas
 ### - Sigin
 A página de Login, com os campos email e password, nela temos na lógica de guardar os dados de email e password em um useState, esse UseState é repassado ao contexto que vai fazer a parte de autenticação e gravação no Firebase;

### - Signup 
A página de Cadastro que da mesma forma que a Signin tem um form com 03 campos e usa também o Hook useState, para salvar os valores nele e logo repassamos ao contexto para também realizar o cadastro, a autenticação e a gravação no Firebase;

### - Digital 
Seria nossa Carteira Digital onde temos o Header com os Links para a própria carteira, e a parte de Configurações do seu perfil. Na parte de Operações temos alguns hooks: 

    ``` bash
      const [pagamentos, setPagamentos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [loadingMore, setLoadingMore] = useState(false);
      const [isEmpty, setIsEmpty] = useState(false);
      const [lastDocs, setLastDocs] = useState();
      const [showPostModal, setShowPostModal] = useState(false);
      const [detail, setDetail] = useState(); 
    ```
    - pagamentos, guarda o valor e seta, começando com um array vazio; <br>
    - loading, para fazer o efeito do texto Procurando Pagamentos enquanto a página carrega; <br>
    - loadingMore, é em relação ao botão de Mais Pagamentos, quando voce tem mais de 5 registrados; <br>
    - isEmpty, para saber se está vazia lista, aí fiz uma condicional que faz o Texto de Nenhum chamado aparecer ou não setado a partir do estado; <br>
    - lastDocs, para quando ele for procurar mais pagamentos, ele não replicar o último.
    - showPostModal, que começa como false, e como é um toggle, toda vez que eu clicar vai mudar o estado, para fazer a tela de resumo do pagamento.
    - detail, relacionado ao conteúdo do Modal também.

  - Logo depois utilizo um hook Useeffect com funções assincronas, para fazer operações no Banco de dados, de loading, pagamentos e defino uma pesquisa de 5 pagamentos por vez.
  - Verifico em outra função assincrona, o estado da lista de pagamentos, se está veazia ou não e então seto em um array todos os dados coletados do Banco de dados, para usar posteriormete na renderização na tela.
  - mais uma função assíncrona para o Botão de mais chamados, onde ele busca de 5 em 5 também.
  - E por fim o Modal que simplesmente pega os dodos da tabela e mostra em um card na tela, operaçõ síncrona, e a renderização do loading também logo abaixo.
  - Por fim faço o return dos dados para renderização na página.

  ### - New
  A página de New é aberta através de um Link dentro da paǵina Digital, e onde voce vai registrar seus pagamentos.
  - Lá temos os cmapos Tipo, Recebedor, Boleto se necessário, e Valor.
  - Existe uma validação se os campos estiverem vazios e uma mensagem vai aparecer através de uma biblioteca chamado tostify.
  - Tenho um hook de useState para cada item do form, e todos começam com o valor inicial como uma string vazia, exceto o Tipo que contém o Pix.
  - Tenha uma função assíncrona para acessar os dados do Banco de Dados e adicionar o registro de pagamento.
  - Logo após o retorno com o JSX em tela.

  ### - Profile
  A página Profile que é acessada através do Link no Header, configurações que gerencia suas informações pessoais, como foto, nome e email.
   - A única informação que voce não pode modificar é o email, já que o mesmo é seu id de entrada para a aplicação.
   - Lá existem alguns imports de imagens e ícones do react-icons.
   - Uma função assíncrona para fazer o preview da imagem de perfil, outro módulo do Firebase para guardar imagens.
   - Essa função salva a Imagem e conseguimos fazer um preview da imagem buscando pela url no FireStore.
   - Em seguida, outra função assíncrona para para Ediatr o nome e Salvar a imagem, no FireStore que é outra função do Firebase que guarda imagens.
   - Logo em seguida o retorno para a renderiação em tela.

   ### - assets
   Diretório com as imagens do APP.

   ### - componentes
  - Form <br>
    Tentei fazer umm form para utilizar o yup como Validação de Campos, mas não consegui encaixar na minha lógica. COnsegui fazer sem precisar salvar no Banco de Dados, mas não no projeto para entrega, ACEITO SUGESTÔES E AJUDA kkk
  - Header <br>
    O Componente Header pega do contexto o user para utilizar os dados casatrados, Foto.
    Possui um Link para Configurações e Carteira Digital e ao diminuir a tela, como responsividade ele passa o Header para o topo da Tela e retira foto.
  - Title <br>
    Recebe duas props de Profile, children = todo o conteúdo da página Profile, e name para renderizar em tela.
  - Modal <br>
    Recebe duas props de digital, conteudo, e close que é a função para fechar o Modal, e renderizo em tela o conteúdo recebido de digital.js.

   ### - services
   Tenho a conexão com o Firebase, e uma condicioanl no final que verifica se existem conexões ativas, para não ficar abrindo conexões a todo momento.

   ### - globalstyles
   Toda estilização CSS Geral

   ### - routes
   Tenho dois arquivos para confiração de rotas.
    - Route.js = Configura toda estratégia de usuários logados e páginas privadas.
    - index.js
       - Aqui eu utilizo o react-router-dom e importo o Route.
       - Importo todas as pages.
       - Utlizo o Route exact para manter sempre o endereço exato, e não cair em outras rotas.
       - Seto os componentes de cada rota e defino as páginas isPrivate (páginas que o user śo irá acessar se estiver logado). 

  ### - contexts
  Diretório de Contextos do contextAPI, com o arquivos auth.js.
    - O arquivo auth.js, tem o contexto geral criado.
    - 
    




