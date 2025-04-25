const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API aktif bro!');
});

app.post('/checkout', (req, res) => {
  const data = req.body;
  // Simulasi response
  res.json({
    success: true,
    message: 'Checkout link created!',
    data,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
