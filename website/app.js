/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const APIKEY = "&appid=88ab11ba8c72bfe093bcc1e00b661164&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

///
const getDate = async (zipCode) => {
  const response = await fetch(baseUrl + zipCode + APIKEY);
  try {
    const projectData = await response.json();
    console.log("projectData", JSON.stringify(projectData));
    return projectData;
  } catch (error) {
    console.log("getDate error", error);
  }
};

///async function to make post request
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log("newData");
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("newData error", error);
  }
};
//Function to GET Project Data
const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML = Math.round(allData.temp) + "degrees";
    document.getElementById("feelings").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//create addEventListener for element with id generate whit a call back function when click
document.getElementById("generate").addEventListener("click", generatefun);
function generatefun() {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getDate(zipCode).then((data) => {
    if (data) {
      const info = data;
      console.log("info");
      console.log(info);
      postData('/add', { date: newDate, temp: info.main.temp, content: feelings }).then(function (res) {
        retrieveData();
      })
    }
  });
}
