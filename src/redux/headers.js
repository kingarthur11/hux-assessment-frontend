// const { token } = JSON.parse(localStorage.getItem("token"));

// console.log(token);

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export { headers, authHeader };
