const client = require('./client');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const createUser = async({ username, password, email }) => {
  const SQL = `
    INSERT INTO users(username, password, email)
    VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ username, password, email ]);
  return response.rows[0];
}

const getUserByToken = async(token) => {
  const payload = await jwt.verify(token, JWT);
  console.log('payload', payload, token)
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [ payload.id]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return payload; 
}

const authenticate = async({ username, password }) => {
  const SQL = `
    SELECT id
    FROM users
    WHERE username = $1 and password = $2
  `;
  const response = await client.query(SQL, [ username, password]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  console.log('this',response.rows)
  return jwt.sign({ id: response.rows[0].id }, JWT);
}

const getUserByUsername = async(username) => {
  try {
    const {rows: [user]} = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1
      `, [username]
    )
    return user
  } catch (error) {
    console.log(error)
    
  }
}

module.exports = {
  createUser,
  authenticate,
  getUserByToken,
  getUserByUsername
};

