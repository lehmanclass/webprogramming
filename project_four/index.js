const express = require("express");
const app = express();
const pg = require("pg");
const moment = require("moment");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432
});

app.use(express.static("build"));
app.use(express.json());

db.connect();

//const insertClient = () => db.query(`INSERT INTO clients (client, human, doctor, reason_for_visit, appointment_time, checked_in) VALUES (${client}, ${human}, ${doctor}, ${reason}, ${DateNow}, ${checkedIn});`);
//Post into sql

const readAppointments = () => db.query("SELECT * FROM appointments;");
const createAppointments = ({ client, human, reason, time }) =>
  db.query(
    `INSERT INTO appointments (client, human, reason_for_visit, appointment_time) VALUES ('${client}', ${human?"TRUE":"FALSE"}, '${reason}', '${time}') returning *;`
  );

app.get("/clinic/read", (req, res) =>
  readAppointments().then(({ rows: appointments }) =>
    res.json({ appointments })
  )
);

app.post("/clinic/appointments", (req, res) => {
  let time = moment().format("LLLL");

  createAppointments({ ...req.body, time }).then(({ rows: [appointment] }) =>
    res.json({ appointment })
  );
});

app.listen(3000, () => console.log("Loud and clear"));
