let contacts = [
  {
    name: "Harry",
    surname: "Potter  ",
    phone_number: "20123123124",
    address: "seoul, korea",
  },
  {
    name: "Ron ",
    surname: "Weasley",
    phone_number: "20123123211",
    address: "seoul, korea",
  },
  {
    name: "Hermione  ",
    surname: "Granger",
    phone_number: "20123112312",
    address: "seoul, korea",
  },
];

window.onload = function () {
  const div = document.getElementById("user-wrapper");
  for (let item of contacts) {
    div.innerHTML += `<div class='name'>${
      item.name + " " + item.surname
    }</div><div class='phone'>${item.phone_number}</div>  <hr /> `;
  }
};
