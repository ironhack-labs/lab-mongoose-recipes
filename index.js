//ARQUIVO PRINCIPAL

//1. importar o EXPRESS - framework para Node.js que fornece recursos mínimos para construção de servidores web.
import express from "express";

//2. importar DOT ENV - pacote leve do nom que carrega automaticamente as variáveis de ambiente de um arquivo .env
import * as dotenv from "dotenv"; //pq a documentação manda importar dessa maneira se usar modules do ES6

//9. importar as rotas
import recipeRoute from "./routes/recipe.routes.js";

//3. habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//4. instanciar (invocar, fazer com que a função rode ao menos uma vez) a variável que vai ficar responsável pelo nosso servidor - por padrão é app
const app = express();

//5. configurar o servidor para aceitar enviar e receber arquivos em JSON (se não fizer essa configuração, o servidor não vai entender JSON!!)
//.use() é um middleware
app.use(express.json());

//7. importando o connect
import connect from "./config/db.config.js";

//8. conectando com o banco de dados:
connect();

//10. CRIAR AS ROTAS NA PASTA ROUTE E IMPORTAR:
app.use("/recipe", recipeRoute);

//NO FINAL DO ARQUIVO
//6. Servirdor subindo para o ar: .listen() recebe dois parâmetros: 1. porta (que está definida no .env: process.env entra no arquivo .env, e PORT é a key do arquivo), 2. callback com console.log
app.listen(process.env.PORT, () => {
  console.log(
    `App up and running on port http://localhost:${process.env.PORT}`
  );
});
