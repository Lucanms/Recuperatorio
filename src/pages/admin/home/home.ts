import { checkAuhtUser, logout } from "../../../utils/auth";

const logoutBtn = document.getElementById("logoutButton") as HTMLButtonElement;

logoutBtn.addEventListener("click", () => {
  logout();
});

function initPage(): void {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/store/home/home.html",
    "admin"
  );
}

initPage();
