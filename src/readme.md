**RF** => REQUISITOS FUNCIONAIS (funcionalidades da aplicação)
**RNF** => REQUISITOS NÃO FUNCIONAIS (bibliotecas, qual banco utilizar, qual framework etc)
**RN** => REGRAS DE NEGOCIOS (regras de negocio da nossa aplicação)

#Cadastro de carros

**RF**
Deve ser possivel cadastrar um carro
**RNF**

**RN**
Não deve ser possivel cadastrar carros com a mesma placa
Não deve ser possivel alterar uma placa de um carro
Um carro ao ser cadastrado encontra-se por padrão disponivel para ser alugado
So usuarios com permissao de admin podem cadastrar carros

#Listagem de carros
**RF**
Deve ser possivel listar todos os carros disponiveis
Deve ser possivel listar todos os carros pelo nome da marca
Deve ser possivel listar todos os carros pelo nome do carro
Deve ser possivel listar todos os carros pela sua categoria
**RN**
Não é necessario está logado no sistema para ver a lista de carros disponiveis

#Cadastro de especificações no carro
**RF**
Deve ser possivel cadastrar uma especificacao de carro
Deve ser possivel listar todos os carros
Deve ser possivel listar todas as especificações do carro
**RN**
So usuarios com permissao de admin podem cadastrar especificações
Não deve ser possivel cadastrar uma especificaçao ja existente no mesmo carro
Não deve ser possivel cadastrar uma especificação em um carro inesxistente

#Cadastro de imagens dos carros
**RF**
Deve ser possivel cadastrar a imagem do carro

**RN**
O usuario poderá cadastrar mais de uma imagem por carro
So usuarios com permissao de admin podem cadastrar imagens de carros

#Aluguel de carros

**RF**
Deve ser possivel cadastrar um aluguel
**RN**
O aluguel deve ter duração minima de 24Horas
Não deve ser possivel cadastrar um aluguel se o carro já estiver alugado
Um mesmo usuario não pode alugar o mesmo carro duas vezes
