import express from 'express';
import cors from 'cors';
import handler from './handler.mjs';

const PORT = 3000;

const app = express();
app.use(cors());

app.get('/keyword-occurences', (req, res) => {
  const { pageURL, keyword } = req.query
  console.log({ pageURL, keyword });

  handler.getKeywordOccurrences(pageURL, keyword)
    .then((data) => res.json(data))
    .catch((error) => res.status(500).send(error));
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});