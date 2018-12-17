const service = require('./service');

Array.prototype.meuMap = function(callback) {
  const novoArrayMapeado = [];

  for(let indice = 0; indice <= this.length -1; indice++) {
    const resultado = callback(this[indice], indice)
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
}

async function main() {
  try {
    const results = await service.obterPessoas('a');

    // Modo 1 - forEach na mao
    // const names = [];
    // results.results.forEach(function (item) {
    //   names.push(item.name);
    // });
    
    // Modo 2 - map nativo extendido
    // const names = results.results.map(function (pessoa) {
    //   return pessoa.name;
    // });

    // Modo 3 - map nativo com arrow function reduzido
    // const names = results.results.map(pessoa => pessoa.name);
    
    // Modo 4 - map customizado próprio
    const names = results.results.meuMap(function (pessoa, indice) {
      return `[${indice}] ${pessoa.name}`;
    });

    console.log('names: ', names);
    
  } catch (error) {
    console.error('Deu zika map.js ', error);
  }
}

main();