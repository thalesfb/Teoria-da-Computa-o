var DAO = {
  localDB: null,
  shortName: 'SIGLA',
  version: '1.0',
  displayName: 'SIGLA',
  maxSize: 65536,

  /* Verifica suporte do aparelho/navegador */
  supportWebStorage: function () {
    try {
      return window.openDatabase;
    } catch (e) {
      return false;
    }
  },

  /* Cria base SQLite */
  createDB: function () {
    if (DAO.supportWebStorage()) {
      DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
      DAO.createTables();
    } else {
      alert('Este aparelho n�o suporta BD Local.');
    }
  },

  /* Cria Tabelas */
  createTables: function () {
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS USER (USERNAME TEXT, PASSWORD TEXT, ROLE TEXT, ID_CLIENTE INT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TAB_ULT_MACRO (ID_CLIENTE INTEGER, USUARIO TEXT, ID_MACRO INTEGER, DESC_MACRO TEXT, DT_MARCACAO TEXT, TP_MACRO TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TAB_HIST_MACROS (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ID_CLIENTE INTEGER, USUARIO TEXT, ID_MACRO INTEGER, DESC_MACRO TEXT, DT_MARCACAO TEXT, TEMPO INTEGER, SYNC INTEGER, TP_MACRO TEXT, CONF INT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS CAD_MACRO (ID_MACRO INTEGER, DESC_MACRO TEXT, TP_MACRO TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS CAD_FISCALIZACAO (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ID_CLIENTE INTEGER, USUARIO TEXT, DATA TEXT, FISCALIZACAO TEXT, SYNC INTEGER)');
    });
  },

  /* Remove Tabelas */
  dropTables: function () {
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DROP TABLE USER');
      tx.executeSql('DROP TABLE TAB_ULT_MACRO');
      tx.executeSql('DROP TABLE TAB_HIST_MACROS');
      tx.executeSql('DROP TABLE CAD_MACRO');
      tx.executeSql('DROP TABLE CAD_FISCALIZACAO');
    });
  },

  /* Insere dados de usu�rio */
  insertUser: function (username, password, role, id_cliente) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DELETE FROM USER');
      tx.executeSql('INSERT INTO USER (USERNAME, PASSWORD, ROLE, ID_CLIENTE) VALUES (?,?,?,?)', [username, password, role, id_cliente],
        function (transaction, resultSet) {// SQL INSERT statement success
          // do something now that the item has been saved                              
        },  // end statement success callback
        function (transaction, sqlError) {   // statement fail
          alert("Erro: " + sqlError);
          return true;   // abort transaction
        }
      );
    });
  },

  /* Retorna Usuario */
  selectUser: function (dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('SELECT USERNAME, PASSWORD, ROLE, ID_CLIENTE FROM USER', [], dataHandler, errorHandler);
    });
  },

  /* Insere dados de usu�rio */
  deleteUser: function () {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DELETE FROM USER');
    });
  },

  /* Insere Fiscaliza��o */
  insertFiscalizacao: function (idCliente, usuario, data, fiscalizacao) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('INSERT INTO CAD_FISCALIZACAO (ID_CLIENTE, USUARIO, DATA, FISCALIZACAO, SYNC) VALUES (?,?,?,?,?)', [idCliente, usuario, data, fiscalizacao, 0],
        function (transaction, resultSet) {
          alert("Inserido com sucesso!");
          return true;
        },
        function (transaction, sqlError) {
          alert("Erro: " + sqlError);
          return true;
        }
      );
    });
  },

  /* Retorna Registros de Fiscaliza��o */
  selectFiscalizacaoDia: function (diaMesAno, usuario, dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql("SELECT ID, ID_CLIENTE, USUARIO, DATA, FISCALIZACAO FROM CAD_FISCALIZACAO WHERE DATA LIKE '" + diaMesAno + "%' AND USUARIO = ? ORDER BY ID DESC", [usuario], dataHandler, errorHandler);
    });
  },

  /* Insere Macro */
  insertMacro: function (idMacro, descMacro, tpMacro) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('INSERT INTO CAD_MACRO (ID_MACRO, DESC_MACRO, TP_MACRO) VALUES (?,?,?)', [idMacro, descMacro, tpMacro],
        function (transaction, resultSet) {// SQL INSERT statement success
          // do something now that the item has been saved                              
        },  // end statement success callback
        function (transaction, sqlError) {   // statement fail
          alert("Erro: " + sqlError);
          return true;   // abort transaction
        }
      );
    });
  },

  /* Deleta Macros */
  deleteMacros: function () {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DELETE FROM CAD_MACRO');
    });
  },

  /* Retorna Macros */
  selectMacros: function (dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('SELECT ID_MACRO, DESC_MACRO, TP_MACRO FROM CAD_MACRO', [], dataHandler, errorHandler);
    });
  },

  /* Insere Historico de macros */
  insertHistoricoMacros: function (idCliente, username, idMacro, descMacro, dtMarcacao, tempo, tpMacro, conf) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('INSERT INTO TAB_HIST_MACROS (ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, SYNC, TP_MACRO, CONF) VALUES (?,?,?,?,?,?,?,?,?)', [idCliente, username, idMacro, descMacro, dtMarcacao, tempo, 0, tpMacro, conf],
        function (transaction, resultSet) {// SQL INSERT statement success
          // do something now that the item has been saved                              
        },  // end statement success callback
        function (transaction, sqlError) {   // statement fail
          alert("Erro: " + sqlError);
          return true;   // abort transaction
        }
      );
    });
  },

  /* Retorna Hist�rico Macros */
  selectHistoricoMacros: function (dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('SELECT ID, ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, TP_MACRO, CONF FROM TAB_HIST_MACROS ORDER BY ID ASC', [], dataHandler, errorHandler);
    });
  },

  /* Retorna Hist�rico Macros SYNC */
  selectHistoricoMacrosSync: function (sync, dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('SELECT ID, ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, TP_MACRO, CONF FROM TAB_HIST_MACROS WHERE SYNC = ? ORDER BY ID ASC', [sync], dataHandler, errorHandler);
    });
  },

  /* Retorna Hist�rico Macros Periodo */
  selectHistoricoMacrosData: function (diaMesAno, dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql("SELECT ID, ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, TP_MACRO, CONF FROM TAB_HIST_MACROS WHERE DT_MARCACAO LIKE '" + diaMesAno + "%' ORDER BY DT_MARCACAO DESC", [], dataHandler, errorHandler);
    });
  },

  /* SET TAB_HISTORICO_MACROS COMO SINCRONIZADA */
  setSyncHistoricoMacros: function (id, dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('UPDATE TAB_HIST_MACROS SET SYNC = 1 WHERE ID = ?', [id], dataHandler, errorHandler);
    });
  },

  /* Deleta Hist�rico Macros */
  deleteHistoricoMacros: function (id) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DELETE FROM TAB_HIST_MACROS WHERE ID = ?', [id]);
    });
  },

  deleteTodoHistoricoMacros: function (dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DELETE FROM TAB_HIST_MACROS WHERE SYNC = 1', [], dataHandler, errorHandler);
    });
  },

  /* Deleta Hist�rico Macros de 7 dias atras */
  deleteHistoricoMacrosDia: function () {
    var d = new Date();
    var dd = new Date();
    dd.setDate(d.getDate() - 0);
    //alert(dd.toString("d/M/yyyy")); 
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql("DELETE FROM TAB_HIST_MACROS WHERE ID IN (SELECT MAX(ID) FROM TAB_HIST_MACROS WHERE DT_MARCACAO LIKE '" + dd.toString("d/M/yyyy") + "%') AND SYNC = 1", []);
    });
  },

  /* Insere �ltima macro selecionada */
  insertUltimaMacro: function (idCliente, username, idMacro, descMacro, dtMarcacao, tpMacro) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DELETE FROM TAB_ULT_MACRO');
      tx.executeSql('INSERT INTO TAB_ULT_MACRO (ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TP_MACRO) VALUES (?,?,?,?,?,?)', [idCliente, username, idMacro, descMacro, dtMarcacao, tpMacro],
        function (transaction, resultSet) {// SQL INSERT statement success
          // do something now that the item has been saved                              
        },  // end statement success callback
        function (transaction, sqlError) {   // statement fail
          alert("Erro: " + sqlError);
          return true;   // abort transaction
        }
      );
    });
  },

  /* Retorna �ltima macro selecionada */
  selectUltimaMacro: function (dataHandler, errorHandler) {
    DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('SELECT ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TP_MACRO FROM TAB_ULT_MACRO', [], dataHandler, errorHandler);
    });
  },

  /* Atualiza Status Sistema */
  updateStatus: function (status) {
    document.getElementById('status').innerHTML = status;
  }
};

DAO.createDB();