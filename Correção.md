## Requisitos:

- [x] Visualização de Equipamentos
- [x] Filtro de Equipamentos
- [x] Cadastro de Equipamento
- [x] Atualização de Equipamentos
- [x] Remoção de Equipamentos
- [x] Detalhes de Equipamento
- [x] Header
  - Não fixo
- [x] Footer
  - Não fixo
- [x] Body
- [ ] Menu Lateral
- [x] Rotas

## Requisitos Extras:

- [ ] Adicionar tratamento de erros nas requisições para a API
- [ ] Adicionar tratamento de erros em inputs errados nos cadastros e atualizações
- [ ] Adicionar um aviso através de um modal, perguntando se o usuário tem certeza que quer deletar um registrou ou cancelar
- [ ] Criar validações de campos usando a biblioteca JOI
- [ ] Adicionar loadings nas telas de carregamento de dados
- [ ] Adicionar mais filtros para seleção de dados

## Pontos A Melhorar

O projeto NEXT está dentro da pasta "atividadeavaliativa", poderia estar inteiramente dentro da pasta raiz do repositório.

Porque eu posso cadastrar e editar um equipamento e decidir o ID dele? Não deveria ser responsabilidade do banco fazer isso? No nosso caso o json-server.
Verificar essa funcionalidade de criação e edição com o ID presente, acredito que influencie no seguinte cenário (se for o caso, retire):
1. Crie um equipamento com ID de letras;
2. Edite o equipamento modificando o ID para numeros;
3. Edite novamente ele e valide o comportamento;