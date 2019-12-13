const pg = require('pg');

const db = new pg.Client({
    user: 'Pandamoniumsz',
    host: 'localhost',
    database: 'PetShop',
    password: 'postgres',
    port: 5432,
  });
  db.connect();

const getAnimal = (request, response) => {
    db.query('SELECT * FROM animals ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getAnimalById = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query(`SELECT * FROM animals WHERE id = $1`, [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createAnimal = (request, response) => {
    const { name, age, type, gender, coat_length, color, size, breed, description } = request.body;
  
    db.query(`INSERT INTO animals (name, age, type , gender, coat_length, color, size, breed, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [name, age, type, gender, coat_length, color, size, breed, description], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Animal added with ID: ${results.insertId}`)
      //response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
    
  }
  const updateAnimal = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, age, type, gender, coat_length, color, size, breed, description  } = request.body;
  
    db.query(
      `UPDATE animals SET name = $1, age = $2, type = $3, gender = $4, coat_length = $5, color = $6, size = $7, breed = $8, description = $9 WHERE id = $10`,
      [name, age, type, gender, coat_length, color, size, breed, description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Animal modified with ID: ${id}`)
      }
    )
  }

  const deleteAnimal = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('DELETE FROM animals WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Animal deleted with ID: ${id}`)
    })
  }
  module.exports = {
    getAnimal,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal
  }