var sqlite3 = require('sqlite3').verbose();

function init_devise_db(){
var db = new sqlite3.Database('mydb.db');
db.serialize(function() {

  // Devise_ID INTEGER PRIMARY KEY AUTOINCREMENT not used here 

  db.run("CREATE TABLE if not exists devise (code VARCHAR(12) PRIMARY KEY, nom VARCHAR(64) NOT NULL , change DOUBLE)");
  
  db.run("DELETE FROM devise");
  
  var pst = db.prepare("INSERT INTO DEVISE(code,nom,change) VALUES (?,?,?)");
  pst.run(["EUR" , "Euro" , 1.0]);
  pst.run(["USD" , "Dollar" , 1.1]);
  pst.run(["GBP" , "Livre" , 0.9]);
  pst.run(["JPY" , "Yen" , 123.0]);
  pst.finalize();

  db.each("SELECT code,nom,change FROM devise", function(err, row) {
      console.log(JSON.stringify(row));
  });
 });

db.close();
}

function insert_new_devise(devise , cb_with_err){
  var db = new sqlite3.Database('mydb.db');
  var pst = db.prepare("INSERT INTO devise (code, nom, change) VALUES(?,?,?)");
  pst.run( [ devise.code, devise.nom, devise.change ], function(err) {
          cb_with_err(err)
      });
  pst.finalize();
  db.close();
}

function update_devise(devise , cb_with_err){
  var db = new sqlite3.Database('mydb.db');
  var pst = db.prepare("UPDATE devise SET nom=? , change=? WHERE code=?");
  pst.run( [ devise.nom, devise.change ,devise.code ], function(err) {
          cb_with_err(err)
      });
  pst.finalize();
  db.close();
}

function get_devises_by_WhereClause(whereClause , cb_with_err_or_res){
  var db = new sqlite3.Database('mydb.db');
  let sql = "SELECT code,nom,change FROM devise " + whereClause;
  db.all(sql, [], function(err, rows) {
          //console.log(JSON.stringify(rows));
          cb_with_err_or_res(err,rows)
      });
  db.close();
}

function get_devise_by_code(code , cb_with_err_or_res){
  var db = new sqlite3.Database('mydb.db');
  let sql = "SELECT code,nom,change FROM devise WHERE code=?";
  db.get(sql, code, function(err, row) {
          //console.log(JSON.stringify(row));
          cb_with_err_or_res(err,row)
      });
  db.close();
}

function delete_devise_by_code(code , cb_with_err){
  var db = new sqlite3.Database('mydb.db');
  let sql = "DELETE FROM devise WHERE code=?";
  db.run(sql, code, function(err) {
          cb_with_err(err)
      });
  db.close();
}


module.exports.init_devise_db = init_devise_db;
module.exports.get_devises_by_WhereClause = get_devises_by_WhereClause;
module.exports.get_devise_by_code = get_devise_by_code ;
module.exports.delete_devise_by_code = delete_devise_by_code ;
module.exports.insert_new_devise = insert_new_devise;
module.exports.update_devise = update_devise;