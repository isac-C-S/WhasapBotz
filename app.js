const express = require("express");
const venom = require("venom-bot");

const app = express();
app.use(express.json());
const port = 3000;


const chat = {};
var processo = 0;

venom
  .create({
    session: "apizap",
    waitForIncomingMessages: true,
    markMessagesRead: false,
  })
  .then((client) => start(client)) // Passa o cliente para a função start
  .catch((error) => {
    console.log(error);
  });

function start(client) { // O nome deve ser "client" para corresponder ao parâmetro passado
  // Rota para enviar mensagens
 
  app.post("/send-message", async (req, res) => {
    const { to, message } = req.body;
    await client.sendText(to + "@c.us", message); // Aqui também use "client"
    res.json("mensagem enviada");
  });
 

  // Lógica para responder automaticamente
  client.onMessage(async (message) => {
    var numero = message.from;
    msg = message.body.trim();
    

    if(!numero.includes("@g.us")){
      
      if(!chat[numero]){
        chat[numero] = true;
       
        timeoutId = setTimeout(async () => {
          console.log("5 minutos se passaram!");
          chat[numero] = false;
          processo = 0;
          console.log("Cronômetro reiniciou");
          await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
        }, 300000); // 300000 ms = 5 minutos

        await client.sendText(numero,
`Olá! 👋 Seja bem-vindo à Addaf! 

Eu sou o assistente virtual.Escolha uma opção:
1️⃣ Informações sobre serviços
2️⃣ Suporte técnico
3️⃣ Dúvidas sobre direitos autorais
4️⃣ Falar com um atendente humano

Digite o número da opção desejada. 🚀

Estamos prontos para te ajudar a brilhar com suas criações! 🌟`

          
            );
       
      } else {
            if (msg === "1" && processo === 0 && chat[numero] === true && numero === message.from) {
              var nome;
              
              clearTimeout(timeoutId);

              console.log("Seja bem-vindo, compositor!");
              console.log(`Mensagem recebida: ${msg} do número: ${numero}`);
              await client.sendText(numero, "Obrigado pelo interesse! 🎵 A Addaf trabalha para proteger e monetizar suas obras artísticas.");
              await client.sendText(numero, "Qual o seu nome?");
              processo = 1;

              timeoutId = setTimeout(async () => {
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 300000); // 300000 ms = 5 minutos
              
            }else if(processo === 1 && chat[numero] === true  && numero === message.from){

              clearTimeout(timeoutId);
              nome= message.body;
              await client.sendText(numero, "Bem vindo " + nome + " Em breve uma atendente ira entrar em contato com voce");
              await client.sendText(numero,"Informe seu CPF para agilizar o atendimento .Por favor");
              processo = 11;


              timeoutId = setTimeout(async () => {
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 300000); // 300000 ms = 5 minutos

            }else if(processo === 11 && chat[numero] === true  && numero === message.from){
              clearTimeout(timeoutId);
              console.log("rodando");
              processo = 111;

              timeoutId = setTimeout(async () => {
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 900000); // 300000 ms = 5 minutos

             
            }else  if (msg === "2" && processo === 0 && chat[numero] === true && numero === message.from) {
              clearTimeout(timeoutId);
              console.log("Mande seu contato para suporte.");
              console.log(`Mensagem recebida: ${msg} do número: ${numero}`);
              await client.sendText(numero, "Qual o seu nome?");
              processo = 2;

              timeoutId = setTimeout(async () => {
                clearTimeout(timeoutId);
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 300000); // 300000 ms = 5 minutos

            }else if(processo === 2 && chat[numero] === true  && numero === message.from){
              clearTimeout(timeoutId);
              var nome = message.body;
              await client.sendText(numero, "Bem vindo " + nome + " Nos de os detalhes sobre o problema.");
              processo = 22;

              timeoutId = setTimeout(async () => {
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 300000); // 300000 ms = 5 minutos

            }else if(processo === 22 && chat[numero] === true  && numero === message.from){
              clearTimeout(timeoutId);
              await client.sendText(numero, "Em breve uma atendente ira entrar em contato");
              console.log("rodando");
              processo = 222;

              timeoutId = setTimeout(async () => {
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 300000); // 300000 ms = 5 minutos
              
            }
              else if (msg === "3" && processo === 0 && chat[numero] === true && numero === message.from) {
                clearTimeout(timeoutId);
                console.log("Dúvidas sobre direitos autorais.");
                console.log(`Mensagem recebida: ${msg} do número: ${numero}`);
                await client.sendText(numero, "Direitos autorais são essenciais para proteger suas obras!");
                await client.sendText(numero, "Diga qual a sua duvida.");
                processo = 3;

                timeoutId = setTimeout(async () => {
                  console.log("5 minutos se passaram!");
                  chat[numero] = false;
                  processo = 0;
                  console.log("Cronômetro reiniciou");
                  await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
                }, 300000); // 300000 ms = 5 minutos

            }else if (processo === 3 && chat[numero] === true  && numero === message.from){
              clearTimeout(timeoutId);
              await client.sendText(numero, "Encaminhando você para um atendente humano. Aguarde um momento, por favor. 🙏");
              processo = 333;

              timeoutId = setTimeout(async () => {
                console.log("5 minutos se passaram!");
                chat[numero] = false;
                processo = 0;
                console.log("Cronômetro reiniciou");
                await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
              }, 900000); // 300000 ms = 5 minutos

            }
            else if (msg === "4" && processo === 0 && chat[numero] === true && numero === message.from) {
                clearTimeout(timeoutId);
                console.log("Encaminhando para um atendente humano.");
                console.log(`Mensagem recebida: ${msg} do número: ${numero}`);
                await client.sendText(numero, "Encaminhando você para um atendente humano. Aguarde um momento, por favor. 🙏");
                processo = 4;

                timeoutId = setTimeout(async () => {
                  console.log("5 minutos se passaram!");
                  chat[numero] = false;
                  processo = 0;
                  console.log("Cronômetro reiniciou");
                  await client.sendText(numero, "Devido à inatividade, o atendimento foi encerrado.");
                }, 900000); // 300000 ms = 5 minutos
                
            } else if(processo === 99){
                console.log("Opção inválida.");
                console.log(`Mensagem inválida recebida: ${msg} do número: ${numero}`);
                await client.sendText(numero, "Desculpe, não entendi sua escolha. Por favor, digite um número de 1 a 4 para continuar.");

            }
          

        }

    }

  });

    
 }

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
  
});


