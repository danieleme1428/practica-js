import express from 'express'
import { createPool } from "mysql2/promise"
const app = express()
const port = 3000
app.use(express.json())
 
const myLogger = function(req, res, next) {
  console.log(`[${req.method}] ${req.url} `)
  next()
}
app.use(myLogger)



const connection = createPool ({
  user: 'root',
  password: '',
  database: 'database_prueba',
  host: 'localhost',
  port: 3306
});

app.get('/departamento/:id', async (req, res) => {
  const [rows] = await connection.execute(
    "SELECT * FROM  departamento  where id = " + req.params.id
  );
  res.send(rows)
})

app.get('/departamento', async (req, res) => {
  const [rows] = await connection.execute(
    "SELECT * FROM departamento"
  );
  res.send(rows)
}) 
 
app.delete('/departamento/:id', async (req, res) => {
    await connection.execute(
    " delete FROM departamento  where id = " + req.params.id
  );
  res.send({status: 200, message:" departamento eliminado correctamente"})
})

app.patch('/departamento/:id', async (req, res) => {
  await connection.execute(
    `update departamento set nombre='${req.body.nombre}',capital= '${req.body.capital}' where id= ${req.params.id}`
);
res.send({status: 200, message:" el departamento se ha actualizado"})
})

app.post('/departamento', async (req, res) => {
  await connection.execute(
    `insert into departamento (nombre, capital)values('${req.body.nombre}','${req.body.capital}')`
);
res.send({status: 200, message: "el departamento fue creado correctamente"})
})


app.get('/municipios/:id', async (req, res) => {
  const [rows] = await connection.execute(
    "SELECT * FROM municipios where id = " + req.params.id
  );
  res.send(rows)
})

app.get('/municipios', async (req, res) => {
  const [rows] = await connection.execute(
    "SELECT * FROM municipios"
  );
  res.send(rows)
}) 
 
app.delete('/municipios/:id', async (req, res) => {
    await connection.execute(
    " delete FROM municipios where id = " + req.params.id
  );
  res.send({status: 200, message:" el registro se elimino con exito"})
})

app.patch('/municipios/:id', async (req, res) => {
  await connection.execute(
    `update municipios set nombre = '${req.body.nombre}', departamento = '${req.body.departamento}' where id = ${req.params.id}`
);
res.send({status: 200, message:" el registro se ha actualizado "})
})

app.post('/municipios', async (req, res) => {
  await connection.execute(
    `insert into municipios(nombre, departamento)values('${req.body.nombre}','${req.body.departamento}')`
);
res.send({status: 200, message:"municipio creado con exito"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

