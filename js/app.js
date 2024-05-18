let contactForm = document.querySelector(".contactForm");
let contactList = document.querySelector(".contactList");
// let firstName = document.querySelector(".firstName");
// let lastName = document.querySelector(".lastName");
// let phoneNumber = document.querySelector(".phoneNumber");
// let email = document.querySelector(".email");

async function addContact(contactData) {
  try {
    let response = await axios.post(
      "http://localhost:3000/contacts",
      contactData
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function deleteContact(id) {
  try {
    let response = await axios.delete(`http://localhost:3000/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

async function loadContacts() {
  try {
    let response = await axios.get("http://localhost:3000/contacts");
    let contacts = response.data;
    contactList.innerHTML = "";
    contacts.forEach((contact) => {
      let li = document.createElement("li");
      li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phoneNumber} - ${contact.email}`;

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.addEventListener("click", async () => {
        await deleteContact(contact.id);
        await loadContacts();
      });

      li.appendChild(deleteButton);
      contactList.appendChild(li);
    });
  } catch (error) {
    console.log("error", error);
  }
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let formData = new FormData(contactForm);
  let contactData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
  };
  await addContact(contactData);
  await loadContacts();
  contactForm.reset();
});

loadContacts();
