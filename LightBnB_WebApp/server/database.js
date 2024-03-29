const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users


const getUserWithEmail = function (email) {
  const values = [`${email}`];
  //pool.query returns a promise so we just need to return it;
  return new Promise((resolve, reject) => {
    pool.query(
      `
  SELECT * FROM users 
  WHERE users.email = $1
  `,
      values
    )
      .then(result => {
        resolve(result.rows[0]);
      });
  });

};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const values = [`${id}`];
  //pool.query returns a promise so we just need to return it;
  return new Promise((resolve, reject) => {
    pool.query(
      `
  SELECT * FROM users 
  WHERE users.email = $1
  `, values
    )
      .then(result => {
        resolve(result.rows[0]);
      });
  });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const values = [`${user.name}`, `${user.email}`, `${user.password}`];
  return new Promise((resolve, reject) => {
    pool.query(
      `
    INSERT INTO users (name, password, email)
    VALUES ($1, $2, $3)
    RETURNING *
    `, values
    )
      .then(result => {
        resolve(result.rows);
      });
  });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const values = [`${guest_id}`, `${limit}`];
  return pool.query(
    `SELECT
      properties.*,
      reservations.*,
        AVG(rating) AS average_rating
        FROM
          reservations
          JOIN properties ON reservations.property_id = properties.id
          JOIN property_reviews ON properties.id = property_reviews.property_id
        WHERE
          reservations.guest_id = $1

    GROUP BY
      properties.id,
      reservations.id
    ORDER BY
      reservations.start_date
    LIMIT
      $2`,
    values
  )
    .then(result => {
      console.log(guest_id);
      console.log(result.rows.length);
      return result.rows
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
    .then(res => res.rows);
}


exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
