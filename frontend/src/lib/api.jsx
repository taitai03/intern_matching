const API_URL = "http://localhost:3000";

export async function signUp(email, password, role) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password, role } }),
  });
  return res.json();
}

export async function signIn(email, password) {
  const res = await fetch(`${API_URL}/users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });

  const token = res.headers.get("Authorization");
  const data = await res.json();
  return { token, data };
}

export async function signOut(token) {
  const res = await fetch(`${API_URL}/users/sign_out`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return res.json();
}
