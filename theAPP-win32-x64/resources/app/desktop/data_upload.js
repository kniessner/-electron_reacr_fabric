
module.exports = function data_upload(name, data, db) {
  db.collection('tables').findOne({ 'name': name }, 
  function(err, docs) {
    if (err) console.error('err' + err);
    if (docs) {
      console.log(name + ' Article exists already');
        var myquery = { name: name };
        var newvalues = { name: name, data: data };
        db.collection('tables').updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          if (res) console.log("One document updated");
        });
    } else {
      db.collection('tables').save({ 'name': name, 'data': data }, 
      (err, result) => {
        if (err) return console.log(err);
        if (result) console.log(name + " saved to database");
      });
    }
  });
}