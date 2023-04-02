let contacts = [
  {
    idx: 0,
    name: "Harry",
    surname: "Potter  ",
    phone_number: "20123123124",
    address: "seoul, korea",
    img: "https://i.pinimg.com/564x/47/35/35/473535d375395ce0d0eec1ed341ab3e5.jpg",
  },
  {
    idx: 1,
    name: "Ron",
    surname: "Weasley",
    phone_number: "20123123211",
    address: "seoul, korea",
    img: "https://i.pinimg.com/736x/2b/d3/aa/2bd3aa3638ffe6c7ca24b3b3b8c7a6a8.jpg",
  },
  {
    idx: 2,
    name: "Hermione",
    surname: "Granger",
    phone_number: "20123112312",
    address: "seoul, korea",
    img: "https://i.pinimg.com/564x/d4/d8/3f/d4d83f3b8277d180fc90266b01051168.jpg",
  },
];

window.onload = function () {
  const div = document.getElementById("user-wrapper");
  if (div) {
    if (localStorage.getItem("updateContacts")) {
      contacts = JSON.parse(localStorage.getItem("updateContacts"));
    }
    for (let item of contacts) {
      div.innerHTML += `<div onclick="clickItem(${
        item.idx
      })" class="test" data-idx=${item.idx}><div class='name'>${
        item.name + " " + item.surname
      }</div><div class='phone'>${item.phone_number}</div>  <hr /> </div> `;
    }
  }

  if (localStorage.getItem("selectedIdx")) {
    const item = localStorage.getItem("selectedIdx");
    if (localStorage.getItem("updateContacts")) {
      contacts = JSON.parse(localStorage.getItem("updateContacts"));
    }

    const selectedItem = contacts[Number(item)];

    $("#img").attr("src", selectedItem.img);
    $("#name").text(`${selectedItem.name + " " + selectedItem.surname}`);

    const div = document.getElementById("detail-item-list");
    div.innerHTML += `
    <div class="detail-item-wrapper">
      <div class="sub">mobile</div>
      <div class="data">${selectedItem.phone_number}</div>
    </div>`;
    div.innerHTML += `
    <div class="detail-item-wrapper">
      <div class="sub">address</div>
      <div class="data">${selectedItem.address}</div>
    </div>`;
  }
};

function clickItem(idx) {
  window.location.assign("detail.html");
  localStorage.setItem("selectedIdx", idx);
}

function clickDeleteItem() {
  if (confirm("Are you sure you want to delete the contact?") === false) {
    return;
  }

  if (localStorage.getItem("updateContacts")) {
    contacts = JSON.parse(localStorage.getItem("updateContacts"));
  }

  const idx = localStorage.getItem("selectedIdx");
  const updateData = contacts.filter((item) => {
    return item.idx !== Number(idx);
  });
  localStorage.setItem("updateContacts", JSON.stringify(updateData));
  window.location.assign("main.html");
}

function clickAddItemBtn() {
  window.location.assign("add.html");
}

function clickAddContact() {
  const name = document.getElementById("add_name")?.value;
  const surname = document.getElementById("add_surname")?.value;
  const phone_number = document.getElementById("add_phone_number")?.value;
  const address = document.getElementById("add_address")?.value;

  if (!name || !surname || !phone_number || !address) {
    alert("Please fill in all values!");
    return;
  }

  const add = {
    idx: contacts.length,
    name,
    surname,
    phone_number,
    address,
    img: "https://i.pinimg.com/564x/ae/ac/b9/aeacb924abc3e17e184d6d5d7f82dda0.jpg",
  };

  if (localStorage.getItem("updateContacts")) {
    contacts = JSON.parse(localStorage.getItem("updateContacts"));
  }
  contacts.push(add);
  localStorage.setItem("updateContacts", JSON.stringify(contacts));
  window.location.assign("main.html");

  console.log(add);
}