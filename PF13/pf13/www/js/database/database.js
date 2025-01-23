document.addEventListener('deviceready', function() {
    var db = window.sqlitePlugin.openDatabase({ name: 'myapp.db', location: 'default' });

    db.transaction(function(tx) {
        // Criação da tabela de clientes
        tx.executeSql(`CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_completo TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )`);

        // Criação da tabela de empresas
        tx.executeSql(`CREATE TABLE IF NOT EXISTS empresas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_empresa TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )`);
    }, function(error) {
        console.error('Erro ao criar as tabelas:', error.message);
    }, function() {
        console.log('Tabelas criadas com sucesso!');
    });
});
