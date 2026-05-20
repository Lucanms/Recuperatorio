import type { IUser } from "../../../types/IUser";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const selectRol = document.getElementById("rol") as HTMLSelectElement;

const emailError = document.getElementById("emailError") as HTMLSpanElement;
const passwordError = document.getElementById(
  "passwordError"
) as HTMLSpanElement;
const rolError = document.getElementById("rolError") as HTMLSpanElement;

function clearErrors(): void {
  emailError.textContent = "";
  passwordError.textContent = "";
  rolError.textContent = "";
  inputEmail.classList.remove("error");
  inputPassword.classList.remove("error");
  selectRol.classList.remove("error");
}

function validate(): boolean {
  let valid = true;
  clearErrors();

  if (!inputEmail.value.trim()) {
    emailError.textContent = "El email es requerido";
    inputEmail.classList.add("error");
    valid = false;
  }
  if (!inputPassword.value.trim()) {
    passwordError.textContent = "La contraseña es requerida";
    inputPassword.classList.add("error");
    valid = false;
  }
  if (!selectRol.value) {
    rolError.textContent = "Debe seleccionar un rol";
    selectRol.classList.add("error");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  if (!validate()) return;

  const valueEmail = inputEmail.value;
  const valueRol = selectRol.value as Rol;

  const user: IUser = {
    email: valueEmail,
    role: valueRol,
    loggedIn: true,
  };

  localStorage.setItem("userData", JSON.stringify(user));

  if (valueRol === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else if (valueRol === "client") {
    navigate("/src/pages/store/home/home.html");
  }
});

inputEmail.addEventListener("input", () => {
  if (inputEmail.value.trim()) {
    emailError.textContent = "";
    inputEmail.classList.remove("error");
  }
});
inputPassword.addEventListener("input", () => {
  if (inputPassword.value.trim()) {
    passwordError.textContent = "";
    inputPassword.classList.remove("error");
  }
});
selectRol.addEventListener("change", () => {
  if (selectRol.value) {
    rolError.textContent = "";
    selectRol.classList.remove("error");
  }
});
