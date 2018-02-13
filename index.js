const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

var apiKey = process.env.API_KEY;
var base = process.env.BASE;

var Airtable = require('airtable');
var base = new Airtable({apiKey: apiKey}).base(base);


app.get('/', (req, res) => {
  base('Menu').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 1,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      res.send(records)

  }, function done(err) {
      if (err) { console.error(err); return; }
  });

})

app.post('/menu/add', (req,res) => {
  console.log(req.body);
  base('Menu').create({
    "Menu Name": req.body.fields.menuName,
    "Notes": req.body.fields.Notes,
    "Price": req.body.fields.Price,
    "Category": req.body.fields.Category
  }, function(err, record) {
      res.send({message: `Successfully added new menu account`});
      if (err) { console.error(err); return; }
      console.log(record.getId());
  });
  base('Sbucks').create({
    "Name": req.body.fields.Name
  }, function(err, record) {
      res.send({message: `Successfully added new sbucks account`});
      if (err) { console.error(err); return; }
      console.log(record.getId());
  });
})



app.get('/form', (req, res) => res.send("<div><form>name <input /></form></div>"))


app.listen(3000, () => console.log('Example app listening on port 3000!'))
