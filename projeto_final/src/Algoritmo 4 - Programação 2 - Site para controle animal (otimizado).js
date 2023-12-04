var DAO = {
  localDB: null,
  shortName: 'SIGLA',
  version: '1.0',
  displayName: 'SIGLA',
  maxSize: 65536,

  supportWebStorage: function () {
    try {
      return window.openDatabase;
    } catch (e) {
      return false;
    }
  },

  createDB: function () {
    if (DAO.supportWebStorage()) {
      DAO.localDB = window.openDatabase(DAO.shortName, DAO.version, DAO.displayName, DAO.maxSize);
      DAO.createTables();
    } else {
      alert('Este aparelho não suporta BD Local.');
    }
  },

  createTables: function () {
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS USER (USERNAME TEXT, PASSWORD TEXT, ROLE TEXT, ID_CLIENTE INT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TAB_ULT_MACRO (ID_CLIENTE INTEGER, USUARIO TEXT, ID_MACRO INTEGER, DESC_MACRO TEXT, DT_MARCACAO TEXT, TP_MACRO TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS TAB_HIST_MACROS (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ID_CLIENTE INTEGER, USUARIO TEXT, ID_MACRO INTEGER, DESC_MACRO TEXT, DT_MARCACAO TEXT, TEMPO INTEGER, SYNC INTEGER, TP_MACRO TEXT, CONF INT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS CAD_MACRO (ID_MACRO INTEGER, DESC_MACRO TEXT, TP_MACRO TEXT)');
      tx.executeSql('CREATE TABLE IF NOT EXISTS CAD_FISCALIZACAO (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, ID_CLIENTE INTEGER, USUARIO TEXT, DATA TEXT, FISCALIZACAO TEXT, SYNC INTEGER)');
    });
  },

  dropTables: function () {
    DAO.localDB.transaction(function (tx) {
      tx.executeSql('DROP TABLE USER');
      tx.executeSql('DROP TABLE TAB_ULT_MACRO');
      tx.executeSql('DROP TABLE TAB_HIST_MACROS');
      tx.executeSql('DROP TABLE CAD_MACRO');
      tx.executeSql('DROP TABLE CAD_FISCALIZACAO');
    });
  },

  insertUser: function (username, password, role, id_cliente) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('INSERT INTO USER (USERNAME, PASSWORD, ROLE, ID_CLIENTE) VALUES (?,?,?,?)', [username, password, role, id_cliente],
          function (transaction, resultSet) {
            resolve(resultSet);
          },
          function (transaction, sqlError) {
            reject(sqlError);
          }
        );
      });
    });
  },

  selectUser: function () {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('SELECT USERNAME, PASSWORD, ROLE, ID_CLIENTE FROM USER', [],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  deleteUser: function () {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('DELETE FROM USER', [],
          function (transaction, resultSet) {
            resolve(resultSet);
          },
          function (transaction, sqlError) {
            reject(sqlError);
          }
        );
      });
    });
  },

  insertFiscalizacao: function (idCliente, usuario, data, fiscalizacao) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('INSERT INTO CAD_FISCALIZACAO (ID_CLIENTE, USUARIO, DATA, FISCALIZACAO, SYNC) VALUES (?,?,?,?,0)', [idCliente, usuario, data, fiscalizacao],
          function (transaction, resultSet) {
            resolve("Inserido com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro: " + sqlError.message);
          }
        );
      });
    });
  },

  selectFiscalizacaoDia: function (diaMesAno, usuario) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql("SELECT ID, ID_CLIENTE, USUARIO, DATA, FISCALIZACAO FROM CAD_FISCALIZACAO WHERE DATA LIKE ? AND USUARIO = ? ORDER BY ID DESC", [diaMesAno + '%', usuario],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  insertMacro: function (idMacro, descMacro, tpMacro) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('INSERT INTO CAD_MACRO (ID_MACRO, DESC_MACRO, TP_MACRO) VALUES (?,?,?)', [idMacro, descMacro, tpMacro],
          function (transaction, resultSet) {
            resolve("Macro inserida com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro ao inserir macro: " + sqlError.message);
          }
        );
      });
    });
  },

  deleteMacros: function () {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('DELETE FROM CAD_MACRO', [],
          function (transaction, resultSet) {
            resolve("Macros deletadas com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro ao deletar macros: " + sqlError.message);
          }
        );
      });
    });
  },

  selectMacros: function () {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('SELECT ID_MACRO, DESC_MACRO, TP_MACRO FROM CAD_MACRO', [],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  insertHistoricoMacros: function (idCliente, username, idMacro, descMacro, dtMarcacao, tempo, tpMacro, conf) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('INSERT INTO TAB_HIST_MACROS (ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, SYNC, TP_MACRO, CONF) VALUES (?,?,?,?,?,?,?,?,?)', [idCliente, username, idMacro, descMacro, dtMarcacao, tempo, 0, tpMacro, conf],
          function (transaction, resultSet) {
            resolve("Histórico de macros inserido com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro ao inserir histórico de macros: " + sqlError.message);
          }
        );
      });
    });
  },

  selectHistoricoMacros: function () {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('SELECT ID, ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, TP_MACRO, CONF FROM TAB_HIST_MACROS ORDER BY ID ASC', [],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  selectHistoricoMacrosSync: function (sync) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('SELECT ID, ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, TP_MACRO, CONF FROM TAB_HIST_MACROS WHERE SYNC = ? ORDER BY ID ASC', [sync],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  selectHistoricoMacrosData: function (diaMesAno) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql("SELECT ID, ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TEMPO, TP_MACRO, CONF FROM TAB_HIST_MACROS WHERE DT_MARCACAO LIKE '" + diaMesAno + "%' ORDER BY DT_MARCACAO DESC", [],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  setSyncHistoricoMacros: function (id) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('UPDATE TAB_HIST_MACROS SET SYNC = 1 WHERE ID = ?', [id],
          function (transaction, resultSet) {
            resolve("Histórico de macros sincronizado com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro ao sincronizar histórico de macros: " + sqlError.message);
          }
        );
      });
    });
  },

  deleteHistoricoMacros: function (id) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('DELETE FROM TAB_HIST_MACROS WHERE ID = ?', [id],
          function (transaction, resultSet) {
            resolve("Histórico de macros deletado com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro ao deletar histórico de macros: " + sqlError.message);
          }
        );
      });
    });
  },

  insertUltimaMacro: function (idCliente, username, idMacro, descMacro, dtMarcacao, tpMacro) {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('INSERT INTO TAB_ULT_MACRO (ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TP_MACRO) VALUES (?,?,?,?,?,?)', [idCliente, username, idMacro, descMacro, dtMarcacao, tpMacro],
          function (transaction, resultSet) {
            resolve("Última macro inserida com sucesso!");
          },
          function (transaction, sqlError) {
            reject("Erro ao inserir a última macro: " + sqlError.message);
          }
        );
      });
    });
  },

  selectUltimaMacro: function () {
    return new Promise((resolve, reject) => {
      DAO.localDB.transaction(function (tx) {
        tx.executeSql('SELECT ID_CLIENTE, USUARIO, ID_MACRO, DESC_MACRO, DT_MARCACAO, TP_MACRO FROM TAB_ULT_MACRO', [],
          function (tx, results) {
            resolve(results);
          },
          function (tx, error) {
            reject(error);
          }
        );
      });
    });
  },

  updateStatus: function (status) {
    document.getElementById('status').innerHTML = status;
  }
};

DAO.createDB();

