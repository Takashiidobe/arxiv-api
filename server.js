const arxiv = require('arxiv-api');

const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  // grab the query params
  let { q, p } = req.query;

	let start =  Math.max((p - 1) * 50, 0);
  console.log(req.url);
  const ans = await arxiv
	.search({
		searchQueryParams: [
			{
				include: [{name: q}],
			}
		],
		start,
		maxResults: 50,
	})
	.then((papers) => papers)
	.catch((error) => console.log(error));

  res.json(ans);
});

app.listen(port, console.log(`running on port ${port}`));
