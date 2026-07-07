const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// simple health check endpoint - used by load balancer / uptime checks
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// sample data endpoint
app.get('/api/items', (req, res) => {
  const items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' },
    { id: 3, name: 'Item Three' },
  ];
  res.json(items);
});

// a slightly heavy endpoint, used for load testing
app.get('/api/compute', (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  res.json({ sum: sum });
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
