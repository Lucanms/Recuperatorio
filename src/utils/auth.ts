import { navigate } from "./navigate";

export function getUser(): string | null {
  return localStorage.getItem("userData");
}

export function clearUser(): void {
  localStorage.removeItem("userData");
}

export function checkAuhtUser(
  loginUrl: string,
  adminUrl: string,
  requiredRole: string
): void {
  console.log("comienzo de checkeo");
  const user = getUser();
  if (user) {
    if (JSON.parse(user).role !== requiredRole) {
      console.log("existe pero no tiene el rol necesario");
      navigate(adminUrl);
      return;
    }
  } else {
    console.log("no existe en local");
    navigate(loginUrl);
    return;
  }
}

export function logout(): void {
  clearUser();
  navigate("/src/pages/auth/login/login.html");
}
