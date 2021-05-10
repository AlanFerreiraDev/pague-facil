# App Pague Facil
## Iniciar projeto

 - Voce precisa ter instalado em sua máquina, o node(npm), yarn (Caso prefira), git, e uma IDE, eu recomendo o VS CODE.
 - Crie uma pasta de sua preferencia e entre nela para rodar o comando ``` git clone https://github.com/AlanFerreiraDev/pague-facil.git ```.
 - Entre na pasta pasta_criada/pague-facil no projeto já clonado.
 - Para instalar as dependencias do Projeto voce precisa rodar dentro dessa pasta o comando ``` npx install ou yarn install ```.
 - Depois de finalizar o processo, voce precisa rodar o comando ``` yarn start ou npm start ```;

## Tecnologias, Banco de dados e Bibliotecas instaladas
 - O projeto foi totalmente desenvolvido em Plataforma Linux (Ubuntu 20.04 LTS), e foi testado em Windows com sucesso.
 - Foram utilizados nesse projeto, React e Sass.
 - Banco de Dados -> Firebase = Comandos para instalação ``` yarn add firebase ou npm install firebase ```;
 - Rotas -> React Router DOM = Comandos para instalação ``` yarn add react-router-dom ou nom install react-router-dom ```;
 - Alertas -> Toastify = Comandos para instalação ``` npm install react-toastify ou yarn ass react-toastify ```;
 - Ícones -> React Icons = Comandos para instalação ``` npm install react-icons ou yarn add react-icons ```;
 - Datas -> date-fns = Comandos para instalação ``` npm install date-fns ou yarn add date-fns ```;
- Form -> Unform = Comandos para instalação ``` npm install @unform/core @unform/web ou yarn add @unform/core @unform/web ```;
- Validação -> Yup = Comandos para instalação ``` npm install yup ou yarn add yup ```;

## O Projeto e sua Base Lógica
 ### - Sigin
 A página de Login, com os campos email e password, nela temos na lógica de guardar os dados de email e password em um useState, esse UseState é repassado ao contexto que vai fazer a parte de autenticação e gravação no Firebase;

### - Signup 
A página de Cadastro que da mesma forma que a Signin tem um form com 03 campos e usa também o Hook useState, para salvar os valores nele e logo repassamos ao contexto para também realizar o cadastro, a autenticação e a gravação no Firebase;

### - Digital 
Seria nossa Carteira Digital onde temos o Header com os Links para a própria carteira, e a parte de Configurações do seu perfil. Na parte de Operações temos alguns hooks: 
    
      const [pagamentos, setPagamentos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [loadingMore, setLoadingMore] = useState(false);
      const [isEmpty, setIsEmpty] = useState(false);
      const [lastDocs, setLastDocs] = useState();
      const [showPostModal, setShowPostModal] = useState(false);
      const [detail, setDetail] = useState(); 
    
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
  - Lá temos os campos Tipo, Recebedor, Boleto e Valor.
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
  Diretório de Contextos do contextAPI, com o arquivos auth.js. <br>
  - O arquivo auth.js, criado o contexto como um objeto vazio. <br>
  - Hook: ``` [user, setUser] = useState(null)  ```, para saber se temos user logado. <br>
  - Hook: ``` [loadingAuth, setLoadingAuth] = useState(false) ```, para controlar o tempo em que o user está logando e fazer aparecer a mensagem Carregando ... <br>
  - Hook: ``` [loading, setLoading] = useState(true) ```, para fazer o conrole no localStore do Browser. <br>

    - Uso um UseEffect para saber se existe user no localStorage e seto o Loading.
    - Duas funções assíncronas para o Login e Cadastro de Users. 
    - Função para salvar uma string(JSON), no localStorage. 
    - Retorno o contexto com todas as informações que vou utilizar.

  ## Pontos e Considerações

   - Acredito que a parte Visual e Fluída, onde temos o CSS utilizando animações, e maior parte de seu conteúdo com display: flex, eu tinha utilizado em alguns momentos display: grid, porém não gostei do resultado no fim.
   - A Organização de pastas está feita de forma clara e objetiva, cada pagina tem seu CSS dentro do mesmo diretório, os componentes que não saõ páginas estão isolados m um diretório separado, assim como as rotas e serviço de conexão com o Firebase.
   - Utilização do Firebase, para mim foi mais tranquilo de mostrar os resultados e uma forma de aprendizado, já que neu não conhecia muito bem a parte de Cloud, mesmo sendo uma base ferramentas de "Back-End" comparada a Google Cloud, mas já foi uma maneira de aprender bastante hehe.
   - Existe uma falha no Banco, que eu queria ajuda inclusive kk. Eu não consegui separar os pagamentos para cada user, então infelizmente todo user vai acabar vendo todos os pagamentos. Sei que é uma falha de segurança, porém eu tentei fazer uma consulta filtrando os pagamentos pelo UserId e consegui, porém na hora de renderizar as informações estavam vazias. SE TIVEREM PALPITES PARA ME AJUDAR, EU AGRADEÇO MUITO hehe.
   
   ## Manual Rápido de utilização

  - Começamos na tela de Login, onde voce irá preencher caso tenha um usuário cadastrado, caso não clique em "Faça parte dos PagLovers uma conta agora".
  - Voce vai para a página de cadastro, onde preencherá suas informações de Nome, email e Senha, e caso tudo esteja de acordo, voce irá automaticamente entrar no APP.
  - Entrando no APP vce pode entrar em COnfigurações e clicar na imagem de Perfil, colocar uma foto e modificar seu nome, clicando em Salvar a imagem e o nome irão ser gravadas no Banco de dados.
  - Clique em Carteira Digital e faça seu primeiro Pagamento, clicando em Novo Pagamento.
  - Nessa página preencha as informações de Tipo, Recebedor, Boleto e Valor e clique em Pagar.
  - A mensagem de pagamentos irá paarecer do lado direito da tela "Pagamento realizado com sucesso, aguarde a compensação do Recebedor"
  - Clique novamente em Carteira Digital e veja seu pagamento na tabela, por ordem de Data decrescente, da maior para menor.
  - Clicando na lupa Azul voce irá ver o resumo do seu pagamento.
  - O Botão de Sair da aplicação está na página de Confirações.




