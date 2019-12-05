const express = require("express");
const dbOperations = require("./database");
const queryExecutor = dbOperations.queryExecutor;

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = `select * from users_t where(user_name='${username}' and password='${password}');`;
  queryExecutor(query)
    .then(data => {
      console.log(data);
      if (data.length == 1) {
        const { id, user_name, email } = data[0];
        res.json({ id, user_name, email });
      }

      res.sendStatus(401);
    })
    .catch(e => {
      console.log(e);
    });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const insertQuery = dbOperations.insertQuery(
    "users_t",
    ["user_name", "email", "password"],
    [username, email, password]
  );

  checkIfUserExist(username, password)
    .then(doesUserExist => {
      if (!doesUserExist) {
        queryExecutor(insertQuery)
          .then(() => res.sendStatus(200))
          .catch(e => res.sendStatus(500));
      } else {
        res.sendStatus(409);
      }
    })
    .catch(e => res.sendStatus(500));
});

app.post("/createGoal/:user_id", (req, res) => {
  const {user_id, name, description, status} = req.body;
  query = `insert into goals (user_id, name, description, status)
      values (${user_id}, '${name}', '${description}', '${status}');
  `;
  
  queryExecutor(query).then(data => {
    console.log(data)
    res.sendStatus(200)
  }).catch(e => {
    res.sendStatus(500);
  })

});

app.get("/goals/:userId", (req, res) => {
  const { userId } = req.params;
  const query = `select * from goals where (user_id=${userId});`;
  queryExecutor(query)
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      console.log(e);
    });
});

app.delete("/goals/id", (req, res) => {});

app.put("/goals/id", (req, res) => {});

app.post("/createTask", (req, res) => {});

app.get("/tasks/:goalId", (req, res) => {
  const { goalId } = req.params;
  const query = `select * from tasks where (goal_id=${goalId});`;
  queryExecutor(query)
    .then(data => {
      res.json(data);
      console.log("success");
    })
    .catch(e => {
      console.log(e);
    });
});

app.delete("/tasks/id", (req, res) => {});

app.put("/goals/id", (req, res) => {});

app.listen(5000, () => console.log("server is running"));

function checkIfUserExist(username) {
  const query = `select * from users_t where(user_name='${username}');`;
  return queryExecutor(query).then(data => data.length == 1);
}
