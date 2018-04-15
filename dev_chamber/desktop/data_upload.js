var XLSX = require("xlsx");
module.exports = function data_upload(socket, file, db) {
  var workbook = XLSX.readFile(file);
  var name = workbook.SheetNames[0];
  var data = XLSX.utils.sheet_to_json(workbook.Sheets[name]);

  socket.emit("data", data);

  db.collection("tables").findOne({ name: name }, function(err, docs) {
    var time_stamp = new Date().toISOString();
    if (err) console.error("err" + err);
    if (docs) {
      console.log(name + " Article exists already");
      var myquery = { name: name };
      var newvalues = {
        name: name,
        lastupdate: time_stamp,
        data: data,
        file: file
      };

      db.collection("tables").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        if (res) console.log("One document updated");
      });
    } else {
      db
        .collection("tables")
        .save(
          { name: name, created: time_stamp, data: data, file: file },
          (err, result) => {
            if (err) return console.log(err);
            if (result) console.log(name + " saved to database");
          }
        );
    }
  });
};
