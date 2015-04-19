var db = require('./config/db-config');
var app = require('./config/app-config');

app.listen(db.port, function() {
  console.log('Users-Api listening on port: ' + db.port);
});