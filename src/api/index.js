const url = 'https://dc3aa463d8c9449cbae8b9dd19642048.vfs.cloud9.us-east-1.amazonaws.com:8080/'

const fetchRegister = async (username, password) => {
    try {
        const response = await fetch(`/api/users/register`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

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

const fetchAllProducts = async ()=>{
    try {
        const response = await fetch(`${url}/api/instruments`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

const fetchAllCategories = async()=>{
    try {
        const response = await fetch(`${url}/api/categories`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    fetchRegister,
    //fetchLogin,
   //fetchUser,
    fetchAllProducts,
    fetchAllCategories,
}