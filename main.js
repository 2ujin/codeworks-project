// dump contacts
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
  const div = $("#user-wrapper");
  if (div) {
    if (localStorage.getItem("updateContacts")) {
      contacts = JSON.parse(localStorage.getItem("updateContacts"));
    }
    for (let item of contacts) {
      div.append(
        `<div onclick="clickItem(${item.idx})" class="test" data-idx=${
          item.idx
        }><div class='name'>${
          item.name + " " + item.surname
        }</div><div class='phone'>${item.phone_number}</div>  <hr /> </div> `
      );
    }
  }

  if (localStorage.getItem("selectedIdx")) {
    const idx = localStorage.getItem("selectedIdx");
    if (localStorage.getItem("updateContacts")) {
      contacts = JSON.parse(localStorage.getItem("updateContacts"));
    }

    let selectedItem = contacts.filter((item) => {
      return item.idx === Number(idx);
    });
    selectedItem = selectedItem[0];

    $("#img").attr("src", selectedItem.img);
    $("#name").text(`${selectedItem.name + " " + selectedItem.surname}`);

    const div = $("#detail-item-list");
    div.append(`
    <div class="detail-item-wrapper">
      <div class="sub">mobile</div>
      <div class="data">${selectedItem.phone_number}</div>
    </div>`);
    div.append(`
    <div class="detail-item-wrapper">
      <div class="sub">address</div>
      <div class="data">${selectedItem.address}</div>
    </div>`);
  }

  // add btn
  $("button[class='add-btn']").click(function () {
    const name = $("#add_name")?.val();
    const surname = $("#add_surname")?.val();
    const phone_number = $("#add_phone_number")?.val();
    const address = $("#add_address")?.val();
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
      img: "https://i.pinimg.com/564x/ae/ac/b9/aeacb924abc3e17e184d6d5d7f82dda0.jpg", // fix img
    };

    if (localStorage.getItem("updateContacts")) {
      contacts = JSON.parse(localStorage.getItem("updateContacts"));
    }
    contacts.push(add);
    localStorage.setItem("updateContacts", JSON.stringify(contacts));
    window.location.assign("index.html");
  });

  // delete btn
  $("img[class='delete']").click(function () {
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
    window.location.assign("index.html");
  });

  // plus icon btn
  $("img[class='plus']").click(function () {
    window.location.assign("add.html");
  });
};

function clickItem(idx) {
  window.location.assign("detail.html");
  localStorage.setItem("selectedIdx", idx);
}


function inputSearch() {
  let input = $("#input").val();
  const findItem = contacts.filter((_) => {
    return (
      _.name.toLowerCase().includes(input) || _.phone_number.includes(input)
    );
  });

  if (localStorage.getItem("updateContacts")) {
    contacts = JSON.parse(localStorage.getItem("updateContacts"));
  }

  const div = $("#user-wrapper");
  let searchResult = [];
  div.html("");
  if (input === "") {
    searchResult = contacts;
  } else {
    searchResult = findItem;
  }

  for (let item of searchResult) {
    div.append(
      `<div onclick="clickItem(${item.idx})" class="test" data-idx=${
        item.idx
      }><div class='name'>${
        item.name + " " + item.surname
      }</div><div class='phone'>${item.phone_number}</div>  <hr /> </div> `
    );
  }
}
