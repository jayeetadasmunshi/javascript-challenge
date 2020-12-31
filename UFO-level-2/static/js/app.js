// Get data from data.js and save in JavaScript array
const tableData = data;
// Display the number of items in the array
const tableDataLength = tableData.length;
console.log("Length of the dataset: " + tableData.length);
// Display the first datetime
console.log("The first datetime: " + tableData[0].datetime);
// Display the last datetime
console.log("The last datetime: " + tableData[tableDataLength-1].datetime);
// Get a reference to the table body
const tbody = d3.select("tbody");
// Using arrowfunction to populate the table
tableData.forEach((data) => {
    const row = tbody.append("tr");
    Object.entries(data).forEach(([key, value]) => {
    const cell = row.append("td");
      cell.text(value);
    });
  });
// Select the filter button based on its id value
const FilterButton = d3.select("#filter-btn");
// Select the reset button based on its id value
const ResetButton = d3.select("#reset-btn");

// Create a event handler 
ResetButton.on("click", ResetForm);
// Complete the event handler function for ResetForm
function ResetForm() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Get a reference to the table body
  const tbody = d3.select("tbody");
  // Clear existing data
  tbody.html("");
  // Using arrowfunction to populate the table
  tableData.forEach((data) => {
    const row = tbody.append("tr");
    Object.entries(data).forEach(([key, value]) => 
    {
        const cell = row.append("td");
        cell.text(value);
    });
  });
  console.log("Form resetted !!");
  // Let's create list of states where UFO was spotted
  const states =  tableData.map(data => data.state);
  // Check the filtered states
  console.log(states);
  // Count the frequency of states in the filtered states
  const stateFrequency = stateCount(states);
  // Check frequency of states
  console.log(stateFrequency);
  // Plotting function
  barStatePlot(stateFrequency);
  // Animate saucer during calling the filter function
  animateSaucer();
} 

// Select the form
const form = d3.select("#form");
// Create a event handler
form.on("change",filteredDataTable);
FilterButton.on("click", filteredDataTable);

// Create a function that filters data based on input field
function filteredDataTable()
{
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Create a list that can be appended dynamically
  const condition = [];
  // Select the date field if present and add to the list
  formDateField = document.getElementById("datetime");
  if(formDateField.value.length != 0) {
    // Get the date only if a valid date is entered
    const formDate = d3.select("#datetime").property("value");
    // Create a list item with index as the first element
    const subCondition = ["datetime",formDate];
    // Append to the condition list
    condition.push(subCondition);
  }

  // Select the city field if present and add to the list
  formCityField = document.getElementById("city");
  if(formCityField.value.length != 0) {
    // Get city only if a city name is entered
    const formCity = d3.select("#city").property("value").toLowerCase();
    // Create a list item with index as the first element
    const subCondition = ["city",formCity];
    // Append to the condition list
    condition.push(subCondition);
  }

  // Select the state field if present and add to the list
  formStateField = document.getElementById("state");
  if(formStateField.value.length != 0) {
    // Get state only if a state name is entered
    const formState = d3.select("#state").property("value").toLowerCase();
    // Create a list item with index as the first element
    const subCondition = ["state",formState];
    // Append to the condition list
    condition.push(subCondition);
  }

  // Select the country field if present and add to the list
  formCountryField = document.getElementById("country");
  if(formCountryField.value.length != 0) {
    // Get country only if a country name is entered
    const formCountry = d3.select("#country").property("value").toLowerCase();
    // Create a list item with index as the first element
    const subCondition = ["country",formCountry];
    // Append to the condition list
    condition.push(subCondition);
  }

  // Select the shape field if present and add to the list
  formShapeField = document.getElementById("shape");
  if(formShapeField.value.length != 0) {
    // Get shape only if a shape name is entered
    const formShape = d3.select("#shape").property("value").toLowerCase();
    // Create a list item with index as the first element
    const subCondition = ["shape",formShape];
    // Append to the condition list
    condition.push(subCondition);
  }
 
  const conditionString = condition.map(item => "data." +item[0] + "===" +"'" +item[1] +"'" ).join(" && ");
  console.log(conditionString);
  // Filter data using map & arrow function
  const filteredDate = tableData.filter(data => eval(conditionString));
  // Display the number of items filtered in console
  console.log("Length of filtered dataset: " + filteredDate.length);
  // Get a reference to the table body
  const tbody = d3.select("tbody");
  // Clear existing data
  tbody.html("");
  // Using arrowfunction to populate the table with filtered dates
    filteredDate.forEach((data) => {
        const row = tbody.append("tr");
      Object.entries(data).forEach(([key, value]) => 
      {
        const cell = row.append("td");
          cell.text(value);
      });
    });
  // Let's create list of states where UFO was spotted
  const states =  filteredDate.map(filtered_data => filtered_data.state);
  // Check the filtered states
  console.log(states);
  // Count the frequency of states in the filtered states
  const stateFrequency = stateCount(states);
  // Check frequency of states
  console.log(stateFrequency);
  // Plotting function
  barStatePlot(stateFrequency);
  // Animate saucer during calling the filter function
  animateSaucer();

  return false;
}

// Create a function that counts the number of times a state appears in a list
function stateCount(stateList) 
{
  // Create an object to hold the state frequency
  const stateFrequency = {};
  //Iterate over the array
  for(const i =0; i < stateList.length; i++) {
    currentState = stateList[i];
    // Check the number of times currentCity appears
    if (currentState in stateFrequency) {
      // We found one more instance
      stateFrequency[currentState] += 1;
    }
    else {
      // First instance of that city
      stateFrequency[currentState] = 1;
    }
  }
  return stateFrequency;
}
// A function to create a barplot
function barStatePlot (stateFrequency) 
{
  const Frequency = [];
  Object.values(stateFrequency).forEach(state_value => Frequency.push(state_value))
  console.log(Frequency)
  const States = [];
  Object.keys(stateFrequency).forEach(state_key => States.push(state_key))
  console.log(States)
    
  // Create trace object for plotting
  const trace1 = {
    x: States,
    y: Frequency,
    type: "bar"
  };
  const data = [trace1];
  const layout = {
    plot_bgcolor:"black",
    paper_bgcolor:"#FFF3",
    margin:{l:50,r:50,b:50,t:50},
    title: {
      text:"UFO Sightings Statewise",
      font:{
        family: 'Georgia,serif',
        color:'white',
        size: 24
      },
      xanchor: 'center',
      yanchor:'top'
    },
    xaxis:{
      title: {
        text: "State",
        font: {
          family:'Arial,Helvetica,sans-serif',
          size: 20,
          color: 'white',
        }
      },
      showgrid: false,
      tickmode: 'auto',
      ticks:'inside',
      tickcolor:'white',
      tickwidth: 2,
      tickfont:{
        family:'Georgia,serif',
        size: 14,
        color: 'white',
      }
    },
    yaxis:{
      title: {
        text: "UFO Sightings",
        font: {
          family:'Arial,Helvetica,sans-serif',
          size: 20,
          color: 'white',
        }
      },
      showgrid: true,
      gridcolor: 'white',
      gridwidth: 1,
      tickfont:{
        family:'Arial,Helvetica,sans-serif',
        size: 14,
        color: 'white',
      } 
    }
  };
  const config ={responsive:true}
  Plotly.newPlot("plot",data,layout,config);

  return false;
}

// Function to animate saucer gif image
function animateSaucer() 
{
  let start = Date.now(); // remember start time
  let timer = setInterval(saucerTimer,20); // updates every 20ms 
 // function defining time interval
 function saucerTimer()
  {
    let timePassed = Date.now() - start; // Update time passed
    if (timePassed >= 2000) {
      clearInterval(timer); // finish the animation after 2 seconds
      saucer.style.left = 0 + 'px'; // saucer comes back to center
      return;
    }
    // draw the animation at the moment timePassed
    saucerMove(timePassed);
  }
  // saucer image  moves left from 0px to 400px over 2 seconds
  function saucerMove(timePassed) {
    saucer.style.left = timePassed / 5 + 'px';
  }
  
} 