const users = [
  {
    user_name: "Test User1",
    email: "test1@gmail.com",
    password: "123"
  },

  {
    user_name: "Test User2",
    email: "test2@gmail.com",
    password: "123"
  }
];

const goals = [];
const goalsStatus = ["in progress", "on hold", "no started", "done"];

for (let i = 1; i < 11; i++) {
  const randomStatus = Math.floor(Math.random() * 4);
  goals.push({
    name: `Goal ${i}`,
    reason: "This is a demo reason bro",
    description: "This is a demo description for this goals goal",
    status: goalsStatus[randomStatus],
    user_id: (i % 2 == 0) ? 1 : 2
  });
}

const tasks = [];

for (let i = 1; i < goals.length + 1; i++) {
  for (let j = 1; j <= 4; j++) {
    tasks.push({
      goal_id: i,
      name: `Demo tasks ${j} for goal ${i}`,
      description: "This is a demo description for this tasks",
      status: "incomplete"
    });
  }
}

module.exports = {
  users,
  goals,
  tasks
};
