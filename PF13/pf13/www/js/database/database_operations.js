function adicionarCliente(nomeCompleto, email, senha) {
    var db = window.sqlitePlugin.openDatabase({ name: 'myapp.db', location: 'default' });

    db.transaction(function(tx) {
        tx.executeSql(`INSERT INTO clientes (nome_completo, email, senha) VALUES (?, ?, ?)`,
            [nomeCompleto, email, senha],
            function(tx, res) {
                console.log('Cliente adicionado com ID:', res.insertId);
            },
            function(tx, error) {
                console.error('Erro ao adicionar cliente:', error.message);
            }
        );
    });
}

function adicionarEmpresa(nomeEmpresa, email, senha) {
    var db = window.sqlitePlugin.openDatabase({ name: 'myapp.db', location: 'default' });

    db.transaction(function(tx) {
        tx.executeSql(`INSERT INTO empresas (nome_empresa, email, senha) VALUES (?, ?, ?)`,
            [nomeEmpresa, email, senha],
            function(tx, res) {
                console.log('Empresa adicionada com ID:', res.insertId);
            },
            function(tx, error) {
                console.error('Erro ao adicionar empresa:', error.message);
            }
        );
    });
}
