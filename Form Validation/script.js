const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const password = document.getElementById("password");
const coPassword = document.getElementById("copassword");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const submit = document.getElementById("submit");
const form = document.querySelector(".form");
const userList = document.getElementById("userList");

console.log(userList);

const steps = document.querySelectorAll(".step");

let currentPage = 0;

// Email Validate
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// UPdate page
function update() {
  steps.forEach(function (step, index) {
    if (index === currentPage) {
      step.classList.remove("hide");
    } else {
      step.classList.add("hide");
    }
  });

  prev.disabled = currentPage === 0;
  if (currentPage === steps.length - 1) {
    submit.style.display = "block";
    next.className = "hide";
  }
  console.log(next);
}

//VAlidataion
function validateStep(step) {
  let isValid = true;
  const errorMessages = steps[step].querySelectorAll("span");

  errorMessages.forEach(function (error) {
    error.innerText = "";
  });

  if (step === 0) {
    if (firstName.value.trim() === "") {
      setError(firstName, "First Name is required");
      isValid = false;
    } else {
      localStorage.getItem(firstName);
    }
    if (lastName.value.trim() === "") {
      setError(lastName, "Last Name is required");
      localStorage.getItem(lastName);
      isValid = false;
    }
  } else if (step === 1) {
    if (mobile.value === "") {
      setError(mobile, "Phone Number is required");
      isValid = false;
    }
    if (email.value.trim() === "") {
      setError(email, "E-mail is required");
      isValid = false;
    } else if (!validateEmail(email.value.trim())) {
      setError(email, "E-mail is not valid");
      isValid = false;
    }
  } else if (step === 2) {
    if (password.value === "") {
      setError(password, "Password is required");
      isValid = false;
    }
    if (coPassword.value === "") {
      setError(coPassword, "Confirm Password is required");
      isValid = false;
    } else if (password.value !== coPassword.value) {
      setError(coPassword, "Passwords do not match");
      isValid = false;
    } else {
      isValid = true;
    }
  }

  return isValid;
}

// Local Storage

// function store() {
//   // localStorage.getItem("user");
//   const userData = JSON.parse(localStorage.getItem("user"));
//   if (userData) {
//     document.getElementById("userfname").innerText = userData.firstname;
//     document.getElementById("userlname").innerText = userData.lastname;
//     document.getElementById("userphone").innerText = userData.phone;
//     document.getElementById("useremail").innerText = userData.email;
//   } else {
//     console.log("User data not found in localStorage.");
//     const user = {
//       firstname: firstName.value,
//       lastname: lastName.value,
//       phone: mobile.value,
//       email: email.value,
//       password: password.value,
//       coPassword: coPassword.value,
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//   }
// }
// Function to store user data
function store() {
  const userDataArray = JSON.parse(localStorage.getItem("user")) || [];

  const newUser = {
    firstname: firstName.value,
    lastname: lastName.value,
    phone: mobile.value,
    email: email.value,
    password: password.value,
    coPassword: coPassword.value,
  };

  userDataArray.push(newUser);
  localStorage.setItem("user", JSON.stringify(userDataArray));
  window.location.href = "data.html";
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateStep(currentPage)) {
    store();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const userDataArray = JSON.parse(localStorage.getItem("user")) || [];

  userDataArray.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div><strong>First Name:</strong> ${user.firstname}</div>
      <div><strong>Last Name:</strong> ${user.lastname}</div>
      <div><strong>Phone:</strong> ${user.phone}</div>
      <div><strong>Email:</strong> ${user.email}</div>
    `;
    userList.appendChild(listItem);
  });
});

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   store();
// });

// Next Btn
next.addEventListener("click", function (e) {
  e.preventDefault();
  if (validateStep(currentPage)) {
    currentPage++;
    if (currentPage >= steps.length) {
      currentPage = steps.length;
    }
    update();
  }
});

// EPrev buttton
prev.addEventListener("click", function (e) {
  e.preventDefault();
  currentPage--;
  if (currentPage < 0) {
    currentPage = 0;
  }
  update();
});
//  error message
function setError(input, error) {
  const field = input.parentElement;
  field.className = "field error";
  const span = field.querySelector("span");
  span.innerText = error;
  console.log(error);
  console.log(next);
}

// labels.forEach((label) => {
//   label.innerHTML = label.innerText
//     .split("")
//     .map(
//       (letter, idx) =>
//         `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
//     )
//     .join("");
// });
