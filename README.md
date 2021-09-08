# capitulo02
capitulo02 do ignite trilha nodejs

## Requisitos para rodar o projeto:
* Node (na versao mais estavel)
* postgres
* clonar o projeto e na pasta raiz instalar os arquivos (yarn install)
* rodar as migrations (yarn typeorm migration:run)
* consumir a api com algum programa de preferencia (o server starta por padrão na porta 3001)

### Estrutura das pastas
- O Projeto está com uma organização de pastas tentando seguir uma arquitetura limpa, separando por camadas e por responsabilidades
- database (conexão e migrations)
- middlewares (middlewares utilizados dentro da aplicação)
- modules (separando os modulos para organizar melhor o projeto, dentro dos modules tem outras sub-pastas)
- entities (representa uma entidade no nosso banco de dados)
- repositories (faz a parte lógica de como será acessado os dados)
- usecases (regras da aplicação) exemplo: não permitir que seja cadastrado usuarios com o mesmo email
- controller (lidam com as requisições e as respostas)
- routes

#### Documentação (em construção)
* modelagem do banco de dados
![carros01](https://user-images.githubusercontent.com/69086171/131168076-80d5c80a-f720-4fa0-841c-fc41d72c0016.png)
* organização das pastas
![organização](https://user-images.githubusercontent.com/69086171/131168182-efd69f5c-8922-4df1-839a-b5eb0029998b.jpg)

