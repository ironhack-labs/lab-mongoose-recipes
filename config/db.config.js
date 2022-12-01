//AQUI VÃO AS CONFUGURAÇÕES DO BANCO DE DADOS

//importar o mongoose
import mongoose from "mongoose";

//O Mongoose é ima biblioteca de programação orientada a objeros JAvascript que cria uma conexão entre o MongoDB e o ambiente de execução NodeJS. Cria uma solução baseada em esquemas para modular os dados da aplicação. Possui sistema de conversão de tipos, validação, criação de consultas e hooks para lógica de negóscios. Ou seja, é um tradutor entre objetos no código e a representação desses objetos no MongoDB

//criar função assíncrona de conexão (porque vai sair do server, ir até o banco de dados e depois voltar - retornará uma promise, e temos que aguardar o retorno dela)
async function connect() {
  try {
    //para se conectar ao banco de dados através do mongoose, usando o método .connect() do próprio mongoose
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the database: ${dbConnection.connection.name}`);
  } catch (error) {
    console.error(error);
  }
}

//exportar a função de conexão, para invocá-la no momento em que a aplicação for executada, ou seja, no index.js!
export default connect;
