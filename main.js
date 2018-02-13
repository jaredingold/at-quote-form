// used for posting data
var form = document.getElementById("menu-form");
var menuName = document.getElementById("menuName");
var category = document.getElementById("category");
var notes = document.getElementById("notes");
var price = document.getElementById("price");

// used for getting data from airtable
var learn = document.getElementById("learn");
var jumbotron = document.getElementById('jumbotron');

// get data from airtable
learn.addEventListener("click", function(event) {
  fetch('https://airtable-test-lpxwflnwmi.now.sh/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let text = document.createElement('p');
    text.textContent = data[0].fields.Name;
    jumbotron.appendChild(text);
  })
  .catch(function(error) {
    console.log('Request failed', error);
  });
});


// When the form is submitted...
// post data to air table
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // POST the data
  fetch('https://airtable-test-lpxwflnwmi.now.sh/menu/add', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "fields": {
        "Menu Name": menuName.value,
        "Category": category.value,
        "Notes": notes.value,
        "Price": price.value
      }
    })
  })
  .then(function(data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function(error) {
    console.log('Request failed', error);
  });
});
