/**
 * 0 - Obter um usuário;
 * 1 - Obter o número de telefone de um usuário a partir de seu Id;
 * 2 - Obter o endereço do usuário pelo Id.
 */
// impoartamos um módulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando der algum problema -> REJECT {ERRO}
  // quando der sucess -> RESOLVE
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolverPromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: 12345678,
        ddd: 47
      })
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2500);
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso, usamos a função .then()
// para manipular o erro, usamos a função .catch()

usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id)
      .then(function resolverTelefone(result) {
        return {
          usuario: {
            nome: usuario.nome,
            id: usuario.id
          },
          telefone: result
        }
      });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);

    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      }
    })
  })
  .then(function (resultado) {
    console.log(`
      Nome: ${resultado.usuario.nome}
      Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
      Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
    `);
  })
  .catch(function (error) {
    console.error('Deu zika: ', error);
  });

/*
obterUsuario(function resolverUsuario(erroUsuario, usuario) {
  if (erroUsuario) {
    console.error('Deu erro na busca por usuário.', erroUsuario);
    return;
  }

  obterTelefone(usuario.id, function resolverTelefone(erroTelefone, telefone) {
    if (erroTelefone) {
      console.error('Deu erro na busca por telefone.', erroTelefone);
      return;
    }
    
    obterEndereco(usuario.id, function resolverEndereco(erroEndereco, endereco) {
      if (erroEndereco) {
        console.error('Deu erro na busca por endereço.', erroEndereco);
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua}, ${endereco.numero}
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `);
    });
  });
});
*/

//const telefone = obterTelefone(usuario.id);

// console.log('telefone: ', telefone);