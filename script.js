"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const table_stat = document.getElementById("tableId");
const info = document.getElementById("info");
const game_stat = document.getElementById("gamesId");
const edit = document.getElementById("editId");
const btnCloseModal = document.querySelectorAll(".close-modal");
let btnsOpenModal = document.querySelectorAll(".show-modal");

/* JSON FOR TABLES*/
let info_name = [
  {
    fname: "Rafael",
    lname: "Nadal",
  },
];
let items = [
  {
    name: "Novak Djokovic",
    points: 11.963,
    tournaments: 18,
  },

  { name: "Daniil Medvedev", points: 10.03, tournaments: 24 },
  { name: "Nadal Rafael", points: 9.67, tournaments: 17 },
  { name: "thiem dominic", points: 8.66, tournaments: 23 },
  { name: "Tsitsipas Stefanos", points: 7.04, tournaments: 229 },
];

let games = [
  {
    discipline: "Singles",
    type: "Grand Slam Tournaments",
    won: 20,
    lost: 8,
  },

  {
    discipline: "Singles",
    type: "Olympic Games",
    won: 1,
    lost: 0,
  },
  {
    discipline: "Singles",
    type: "Year-End Championships",
    won: 0,
    lost: 2,
  },
  {
    discipline: "Singles",
    type: "ATP Masters 1000",
    won: 35,
    lost: 16,
  },
  {
    discipline: "Singles",
    type: "ATP Tour 500",
    won: 21,
    lost: 6,
  },
  {
    discipline: "Singles",
    type: "ATP Tour 250",
    won: 9,
    lost: 5,
  },
  {
    discipline: "Singles",
    type: "Total",
  },
];

let calculateGames = function () {
  games = games.slice(0, games.length - 1);
  for (let i = 0; i < games.length; i++) {
    games[i].total = games[i].won + games[i].lost;
    games[i].wr = (games[i].won / games[i].total).toFixed(2);
    console.log(games[i]);
  }
  let total = 0;
  games.push({
    discipline: "Singles",
    type: "Total",
    won: 0,
    lost: 0,
    total: 0,
    wr: 0.0,
  });

  for (let i = 0; i < games.length - 1; i++) {
    games[games.length - 1].won += games[i].won;
    games[games.length - 1].lost += games[i].lost;
    games[games.length - 1].total += games[i].total;
    games[games.length - 1].wr =
      parseFloat(games[games.length - 1].wr) + parseFloat(games[i].wr);
  }
  games[games.length - 1].wr = (
    parseFloat(games[games.length - 1].wr) /
    (games.length - 1)
  ).toFixed(2);
};

/*GENERATING THE HTML TABLE*/
function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    row.classList.add("item");
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

const btnStat = btnsOpenModal[1];
const btnGames = btnsOpenModal[2];

/* HIDE WINDOWS FUNCTION */
let closeWndw = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  table_stat.classList.add("hidden");
  game_stat.classList.add("hidden");
  edit.classList.add("hidden");
};

for (let i = 0; i < btnCloseModal.length; i++) {
  //btnsOpenModal[i].addEventListener("click", showWndw);
  btnCloseModal[i].addEventListener("click", closeWndw);
  overlay.addEventListener("click", closeWndw);
}
/*DISPLAY HIDDEN  TABLE FUNCTION */
let button_statistics = function () {
  table_stat.classList.remove("hidden");
  let table = document.querySelector("table");
  table.innerHTML = "";
  let data = Object.keys(items[0]);
  generateTableHead(table, data);
  generateTable(table, items);
  overlay.classList.remove("hidden");
};

let button_games = function () {
  game_stat.classList.remove("hidden");
  let table = document.querySelector(".games");
  table.innerHTML = "";
  calculateGames();
  let data = Object.keys(games[0]);
  generateTableHead(table, data);
  generateTable(table, games);
  overlay.classList.remove("hidden");
};

let button_edit = function () {
  edit.classList.remove("hidden");
  document.getElementById("fname").value = info_name[0].fname;
  document.getElementById("lname").value = info_name[0].lname;
};

let button_info = function () {
  info.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

function saveInfos() {
  info_name[0].fname = document.getElementById("fname").value;
  info_name[0].lname = document.getElementById("lname").value;
  closeWndw();
}

/*BUTTON EVENTLISTENER */
btnsOpenModal[0].addEventListener("click", button_info);
btnsOpenModal[1].addEventListener("click", button_statistics);
btnsOpenModal[2].addEventListener("click", button_games);
btnsOpenModal[3].addEventListener("click", button_edit);

/* ESCAPE EVET LISTENER */
document.addEventListener("keydown", function (event) {
  if (
    event.key == "Escape" &&
    (!modal.classList.contains("hidden") ||
      !table_stat.classList.contains("hidden") ||
      !game_stat.classList.contains("hidden") ||
      !overlay.classList.contains("hidden"))
  ) {
    closeWndw();
  }
});
function myFunction(tableID) {
  var column = 1;
  if ((tableID = "sortable")) {
    column = 0;
  }
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById(tableID);
  console.log(tableID);
  tr = table.getElementsByClassName("item");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[column];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

/*FILL  TABLE FUNCTION */
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
    th.onclick = function () {
      var table,
        rows,
        switching,
        i,
        x,
        y,
        shouldSwitch,
        dir,
        switchcount = 0;
      var n = 1;

      table = document.getElementById("tableGames");
      switching = true;
      console.log(table);
      //Set the sorting direction to ascending:
      dir = "asc";
      /*Make a loop that will continue until
  no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
    first, which contains table headers):*/
        for (i = 1; i < rows.length - 1; i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
      one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount++;
        } else {
          /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    };
  }
}
