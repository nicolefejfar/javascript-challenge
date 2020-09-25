// Validate correct path
console.log(data);

// Select the table body 
var tbody = d3.select("tbody");

// Create variables for button and form
var button = d3.select("#filter-btn");
var form = d3.select(".form-group");

// Create event handlers for button and form
button.on("click", filteredQuery);
form.on("click", filteredQuery);

// Initialize table
data.forEach(function(sighting){
    var row = tbody.append("tr");
    // Append values into rows & cells
    Object.entries(sighting).forEach(function([key,value]){
        // console.log(key, value)
        row.append("td").text(value);
    })
});

// Function to return the filtered data if the input value equals the search criteria
function filterData(table, field, input) {
    if(input) {
        return table.filter(function(sighting) {
            if (sighting[field] === input) {
                return true;
            }
        });
    }
    // console.log(table);
    return table;
}

// Assign input values to variables for filtering and present filtered table
function filteredQuery() {
    // d3.event.preventDefault(); This was causing error w/d3, version 6, but working as expected without it
    var inputDate = d3.select("#datetime").property("value");
    console.log(inputDate);
    var inputCity = d3.select("#city").property("value").toLowerCase();
    console.log(inputCity);
    var inputState = d3.select("#state").property("value").toLowerCase();
    console.log(inputState);
    var inputCountry = d3.select("#country").property("value").toLowerCase();
    console.log(inputCountry);
    var inputShape = d3.select("#shape").property("value").toLowerCase();
    console.log(inputShape);

    // Create a variable for filtered data
    var filteredData = data;

    // Use filterData function to filter data for the each search criteria
    filteredData = filterData(filteredData, 'datetime', inputDate);
    filteredData = filterData(filteredData, 'city', inputCity);
    filteredData = filterData(filteredData, 'state', inputState);
    filteredData = filterData(filteredData, 'country', inputCountry);
    filteredData = filterData(filteredData, 'shape', inputShape);

    // Select the table body to insert table rows and cells
    var tbody = d3.select("tbody")
    // clear the table body
    tbody.html("");

    // Build filtered table
    filteredData.forEach(function(updateTable){
        var row = tbody.append("tr");
        Object.entries(updateTable).forEach(function([key, value]){
            var cell = row.append("td").text(value);
        })
    })
};