const url = 'http://fitnesstrac-kr.herokuapp.com/api'

const fetchRegister = async (username, password) => {
    try {
        const response = await fetch(`${url}/users/register`, {
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

const fetchLogin = async (username, password) => {
    try {
        const response = await fetch(`${url}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        const result = await response.json();
        //console.log("login result",result);
        return result;
    } catch (error) {
        console.error(error)
    }
}

const fetchUser = async (token) => {
    try {
        const response = await fetch(`${url}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    fetchRegister,
    fetchLogin,
    fetchUser
}