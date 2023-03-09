const url = "http://localhost:3000";

const fetchRegister = async (username, password) => {
  try {
    const response = await fetch(`/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

// const fetchLogin = async (username, password) => {
//     try {
//         const response = await fetch(`/api/users/login`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password
//             }),
//         });
//         const result = await response.json();
//         //console.log("login result",result);
//         return result;
//     } catch (error) {
//         console.error(error)
//     }
// }

// const fetchUser = async (token) => {
//     try {
//         const response = await fetch('', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//         })
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error(error)
//     }
// }

const fetchAllProducts = async () => {
  try {
    const response = await fetch(`/api/instruments`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchSingleProduct = async (productId) => {
  const response = await fetch(`/api/instruments/:${productId}`, {
    method: "GET",
    heathers: { "Content-Type": "application/json" },
  });
  const result = await response.json();
  console.log(result, "fetching single");
  return result;
};

module.exports = {
  fetchRegister,
  //fetchLogin,
  //fetchUser,
  fetchAllProducts,
  fetchSingleProduct,
};
