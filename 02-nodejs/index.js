/**
 * 0 - Obter um usuário;
 * 1 - Obter o número de telefone de um usuário a partir de seu Id;
 * 2 - Obter o endereço do usuário pelo Id.
 */

function obterUsuario(callback) {
  setTimeout(function () {
    return callback(null, {
      id: 1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000);
}

function obterTelefone(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      telefone: 12345678,
      ddd: 47
    })
  }, 2000);
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function () {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0
    })
  }, 2500);
}

function resolverUsuario(erro, usuario) {
  console.log('usuario: ', usuario);
}

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
//const telefone = obterTelefone(usuario.id);

// console.log('telefone: ', telefone);