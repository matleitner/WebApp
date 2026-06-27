# WebApp
Small project where I explore Web Technologies, the WebApp is about HelpDesk Schedule  

# Obejctives: 

- [ ] Making a Server/Client App, where Server handles Databases, and data exchanges
- [ ] Front-End, more into understand and leveraging Bootstrapi, and the Client perspective on interacting with the App;
- [ ] Back-End, going deep, on understanding what's necessary to have a Server that "serves" data to a Client request

# Príncipais end-points da API

| Pedido | EndPoint |
| ------ | -------- | 
| Autenticar |  POST signin|
| Registar | POST helpdesk/1/participants/{email}| 
| Registar Autor | POST authors| 
| Associar Autor  | POST helpdesk/1/author/{authorID}| 
| Atualizar  Autor | PUT helpdesk/1/author/{authorID}|  
| Obter Autores | GET helpdesk/1/author | 
| Remover Autor | DELETE helpdesk/1/author/{authorID}| 
| Obter Sponsors |  helpdesk/1/sponsors | 
| Enviar Mensagem | POST contacts/emails | 



# Progress
### Client side
- Construção de um barra de navegação responsiva, com bootstrap;
- Um cabeçalho;
- Secção Sobre;
- Secção Autores;
- Secção Sponsors;
- Secção de contactos;
- Mapa de Localização;


### Admin side

- Página de gestão de participantes
- Gestão de Membros/Autores
- Gestão de Sponsors

Nada funciona ainda porque falta por o back-end a funcionar...







Fun fact, I started doing this Project on a Ancient, Prehistoric PC once from my grandma, booting vscode is an Adventure. So I did some things on Vim. Don't hate me. 