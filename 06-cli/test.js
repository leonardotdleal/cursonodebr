const {
  deepEqual,
  ok
} = require('assert');
const database = require('./database');
const DEFAULT_ITEM_CADASTRAR = {
  nome: 'Flash',
  poder: 'Speed',
  id: 1
};
const DEFAULT_ITEM_ATUALIZAR = {
  nome: 'Lanterna verde',
  poder: 'Energia do anel',
  id: 2
};

describe('Suite de manipulação de Heróis', () => {

  before(async () => {
    const dados = await database.obterDadosArquivo();

    if (dados.length < 1) {
      await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
      await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
    } 
  });

  it('deve pesquisar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id);

    deepEqual(resultado, expected);
  });

  it('deve cadastrar um herói, usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);
    
    deepEqual(atual, expected);
  });

  
  it('deve remover um herói por id', async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);

    deepEqual(resultado, expected);
  });
    
  
  it('deve atualizar um herói pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Batman',
      poder: 'Dinheiro'
    };
    const novoHeroi = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }

    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoHeroi);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
    deepEqual(resultado, expected);
  });
    
});