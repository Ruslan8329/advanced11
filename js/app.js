// let contactForm = document.querySelector(".contactForm");
// let contactList = document.querySelector(".contactList");
// // let firstName = document.querySelector(".firstName");
// // let lastName = document.querySelector(".lastName");
// // let phoneNumber = document.querySelector(".phoneNumber");
// // let email = document.querySelector(".email");

// async function addContact(contactData) {
//   try {
//     let response = await axios.post(
//       "http://localhost:3000/contacts",
//       contactData
//     );
//     return response.data;
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// async function deleteContact(id) {
//   try {
//     let response = await axios.delete(`http://localhost:3000/contacts/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// async function loadContacts() {
//   try {
//     let response = await axios.get("http://localhost:3000/contacts");
//     let contacts = response.data;
//     contactList.innerHTML = "";
//     contacts.forEach((contact) => {
//       let li = document.createElement("li");
//       li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumber} - ${contact.email}`;

//       let deleteButton = document.createElement("button");
//       deleteButton.textContent = "Удалить";
//       deleteButton.addEventListener("click", async () => {
//         await deleteContact(contact.id);
//         await loadContacts();
//       });

//       li.appendChild(deleteButton);
//       contactList.appendChild(li);
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// contactForm.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   let formData = new FormData(contactForm);
//   let contactData = {
//     firstName: formData.get("firstName"),
//     lastName: formData.get("lastName"),
//     phoneNumber: formData.get("phoneNumber"),
//     email: formData.get("email"),
//   };
//   await addContact(contactData);
//   await loadContacts();
//   contactForm.reset();
// });

// loadContacts();

//////////////////////////2-ое дз ////////////////////////////////////////////

let contactForm = document.querySelector(".contactForm");
let contactList = document.querySelector(".contactList");

function loadContacts() {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    let li = document.createElement("li");
    li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumber} - ${contact.email}`;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
      deleteContact(index);
    });
    li.appendChild(deleteButton);
    contactList.appendChild(li);
  });
}

function addContact(contactData) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(contactData);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  loadContacts();
}

function deleteContact(index) {
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  loadContacts();
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(contactForm);
  let contactData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
  };
  addContact(contactData);
  contactForm.reset();
});
loadContacts();
