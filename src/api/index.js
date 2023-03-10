const url = 'http://localhost:3000';

const fetchRegister = async (username, password) => {
  try {
    const response = await fetch(`/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
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

const fetchSingleProduct = async productId => {
  try {
    const response = await fetch(`/api/instruments/strings/${productId}`);
    const result = await response.json();
    console.log(result, 'fetching single');
    if (result.error) {
      throw result.error;
    }
    return result;
  } catch (error) {
    console.error('tehere is an error', error);
  }
};
module.exports = {
  fetchRegister,
  //fetchLogin,
  //fetchUser,
  fetchAllProducts,
  fetchSingleProduct
};
