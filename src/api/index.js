// import jwt from "jsonwebtoken";
// import jwt_decode from "jwt-decode";

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
//         const response = await fetch('/api/users', {
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
  try {
    const response = await fetch(`/api/instruments/strings/${productId}`);
    const result = await response.json();
    //console.log(result, 'fetching single');
    if (result.error) {
      throw result.error;
    }
    return result;
  } catch (error) {
    console.error("there is an error", error);
  }
};

const fetchAllCategories = async () => {
  try {
    const response = await fetch(`${url}/api/categories`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchAddToCart = async (productId, data) => {
  try {
    const token = window.localStorage.getItem("token");
    const response = await fetch(`${url}/api/instruments/carts/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const fetchMyCart = async () => {
    const userId = 3;
  // const token = window.localStorage.getItem("token");
  // const decodedToken = jwt.decode(token);
  // const decodedToken = jwt_decode(token);
  // const userId = decodedToken.id; // njega deokdiramo iz tokena u tokenu je spakovan pod imenom id
  try {
    const response = await fetch(`${url}/api/instruments/carts/${userId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  fetchRegister,
  //fetchLogin,
  //fetchUser,
  fetchAllProducts,
  fetchSingleProduct,
  fetchAllCategories,
  fetchAddToCart,
  fetchMyCart
};
