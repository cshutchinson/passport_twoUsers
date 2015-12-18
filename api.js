var pg = require('pg');
var connectionString = 'postgres://localhost/passport';
var fs = require('fs');

function runQuery(query, parameters){
  return new Promise(function(resolve,reject){
    pg.connect(connectionString, function(err, client, done){
      if(err){
        done();
        reject(err);
        return;
      }
      client.query(query, parameters, function(err, results){
        done();
        if(err){
          reject(err);
          return;
        }
        resolve(results);
      })
    })
  })
}

var getUsersSql = fs.readFileSync('./sql/getUsers.sql', 'utf8');
function getUsers(usernames, passwords) {
  return runQuery(getUsersSql, [usernames, password])
}

var createUserSql = fs.readFileSync('./sql/createUsers.sql', 'utf8');
function createUsers(usernames, passwords) {
  return runQuery(createUserSql, [usernames, password])
}

module.export = {
  login: {
    create: createUsers,
    read: getUsers
  }
}
