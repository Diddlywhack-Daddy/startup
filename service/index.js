const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let scores = [];
let assignments = [];
let courses = [];
let courseAssignments = {}; // ✅ Added for assignment types per course

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// ✅ Log incoming requests for easier debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const apiRouter = express.Router();
app.use('/api', apiRouter);

// ✅ Auth endpoints
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) next();
  else res.status(401).send({ msg: 'Unauthorized' });
};

// ✅ Assignments endpoints
apiRouter.get('/assignments', verifyAuth, (_req, res) => {
  res.send(assignments);
});

apiRouter.post('/assignments', verifyAuth, (req, res) => {
  const newAssignment = { ...req.body, id: Date.now(), checked: false };
  assignments.push(newAssignment);
  res.status(201).send(assignments);
});

apiRouter.put('/assignments/:id', verifyAuth, (req, res) => {
  const id = parseInt(req.params.id);
  assignments = assignments.map((a) => (a.id === id ? { ...a, ...req.body } : a));
  res.send(assignments);
});

apiRouter.delete('/assignments', verifyAuth, (req, res) => {
  const idsToDelete = req.body.ids;
  assignments = assignments.filter((a) => !idsToDelete.includes(a.id));
  res.send(assignments);
});

// ✅ Courses endpoints
apiRouter.get('/courses', verifyAuth, (_req, res) => {
  res.send(courses);
});

apiRouter.post('/courses', verifyAuth, (req, res) => {
  const { name } = req.body;
  if (!name || courses.find(c => c.name === name)) {
    return res.status(400).send({ msg: 'Invalid or duplicate course' });
  }
  const course = { name, grade: 'N/A' };
  courses.push(course);
  res.status(201).send(courses);
});

apiRouter.delete('/courses', verifyAuth, (req, res) => {
  const namesToDelete = req.body.names;
  courses = courses.filter(c => !namesToDelete.includes(c.name));
  namesToDelete.forEach(name => delete courseAssignments[name]);
  res.send(courses);
});

// ✅ Assignment metadata endpoints
apiRouter.get('/assignments/meta', verifyAuth, (_req, res) => {
  res.send(courseAssignments);
});

apiRouter.post('/assignments/meta', verifyAuth, (req, res) => {
  const { course, type, weight } = req.body;
  if (!course || !type || !weight) {
    return res.status(400).send({ msg: 'Missing fields' });
  }
  courseAssignments[course] = courseAssignments[course] || [];
  courseAssignments[course].push({ type, weight });
  res.send(courseAssignments);
});

apiRouter.delete('/assignments/meta', verifyAuth, (req, res) => {
  const { course, index } = req.body;
  if (courseAssignments[course]) {
    courseAssignments[course].splice(index, 1);
    res.send(courseAssignments);
  } else {
    res.status(404).send({ msg: 'Course not found' });
  }
});

// ✅ Error and fallback handlers
app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// ✅ Helpers
function updateScores(newScore) {
  let found = false;
  for (const [i, prevScore] of scores.entries()) {
    if (newScore.score > prevScore.score) {
      scores.splice(i, 0, newScore);
      found = true;
      break;
    }
  }
  if (!found) scores.push(newScore);
  if (scores.length > 10) scores.length = 10;
  return scores;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;
  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
