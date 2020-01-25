const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pgithsli',
  host: 'salt.db.elephantsql.com',
  database: 'pgithsli',
  password: 'IyT1o_L7Uiz2Mfyt0a7vXwdkWVGNyYqH',
  port: 5432,
  max: 3,
  min: 0,
  idle: 10000
})

const getTurtles = (request, response) => {
  pool.query('SELECT * FROM turtle ORDER BY id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTurtleById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM turtle WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createTurtle = (request, response) => {
  const { number, mark, sex } = request.body

  pool.query('INSERT INTO turtle (turtle_number, mark, sex) VALUES ($1, $2, $3) RETURNING id', [number, mark, sex], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`${results.rows[0].id}`)
  })
}

const updateTurtle = (request, response) => {
  const id = parseInt(request.params.id)
  const { number, mark, sex } = request.body

  pool.query(
    'UPDATE turtle SET turtle_number = $1, mark = $2, sex = $3 WHERE id = $4',
    [number, mark, sex, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Turtle modified with ID: ${id}`)
    }
  )
}

const deleteTurtle = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM turtle WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Turtle deleted with ID: ${id}`)
  })
}

const getSightings = (request, response) => {
  pool.query('SELECT * FROM sighting ORDER BY time_seen DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSightingById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM sighting WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSighting = (request, response) => {
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body

  pool.query('INSERT INTO sighting (turtle_id, time_seen, turtle_location, latitude, longitude, carapace_length, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [turtleId, time, location, latitude, longitude, length, notes], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`${results.rows[0].id}`)
  })
}

const updateSighting = (request, response) => {
  const id = parseInt(request.params.id)
  const { turtleId, time, location, latitude, longitude, length, notes } = request.body

  pool.query(
    'UPDATE sighting SET turtle_id = $1, time_seen = $2, turtle_location = $3, latitude = $4, longitude = $5, carapace_length = $6, notes = $7 WHERE id = $8',
    [turtleId, time, location, latitude, longitude, length, notes, id ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Sighting modified with ID: ${id}`)
    }
  )
}

const deleteSighting = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM sighting WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Sighting deleted with ID: ${id}`)
  })
}

const getSightingByTurtleId = (request, response) => {
  const turtleId = parseInt(request.params.turtleId)

  pool.query('SELECT * FROM turtle, sighting WHERE turtle.id = turtle_id AND turtle_id = $1 ORDER BY time_seen DESC', [turtleId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPhotos = (request, response) => {
  pool.query('SELECT * FROM photo', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPhotoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM photo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPhoto = (request, response) => {
  const { turtleId, sightingId, name } = request.body

  pool.query('INSERT INTO photo (turtle_id, sighting_id, name) VALUES ($1, $2, $3) RETURNING id', [turtleId, sightingId, name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`${results.rows[0].id}`)
  })
}

const updatePhoto = (request, response) => {
  const id = parseInt(request.params.id)
  const { turtleId, sightingId, name } = request.body

  pool.query(
    'UPDATE photo SET turtle_id = $1, sighting_id = $2, name = $3 WHERE id = $4',
    [turtleId, sightingId, name, id ],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Photo modified with ID: ${id}`)
    }
  )
}

const deletePhoto = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM photo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Photo deleted with ID: ${id}`)
  })
}

const getPhotoByTurtleId = (request, response) => {
  const turtleId = parseInt(request.params.turtleId)

  pool.query('SELECT photo.name FROM turtle, photo WHERE turtle.id = turtle_id AND turtle_id = $1', [turtleId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPhotoBySightingId = (request, response) => {
  const sightingId = parseInt(request.params.sightingId)

  pool.query('SELECT photo.name FROM sighting, photo WHERE sighting.id = sighting_id AND sighting_id = $1', [sightingId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getTurtles,
  getTurtleById,
  createTurtle,
  updateTurtle,
  deleteTurtle,
  getSightings,
  getSightingById,
  createSighting,
  updateSighting,
  deleteSighting,
  getSightingByTurtleId,
  getPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoByTurtleId,
  getPhotoBySightingId,
  }