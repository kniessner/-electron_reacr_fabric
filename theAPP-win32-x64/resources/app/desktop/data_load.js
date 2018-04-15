module.exports = function data_load(db) {
  var collection = db.collection("tables");
  var cursor = collection
    .find()
    .limit(1)
    .sort({ $natural: -1 });
  cursor.toArray(function(err, data) {
    if (err) throw err;
    if (data) return data[0].data;
   // if(data) res.json({ data: data[0].data });;
    //event.sender.send("data", data[0].data);
   // console.log("%j", data);
   // db.close();
  });
};
