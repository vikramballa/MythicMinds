import express from 'express';
import { generateStory } from './generateStory.js';
import cors from 'cors';
import { generateGeminiStory } from './geminiStoryGenerator.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/api/stories/:category', async (req, res) => {
  const { category } = req.params;
  if (category) {
      try {
          const response = await generateGeminiStory(category);
          res.status(200).json(response); 
      } catch (error) {
          res.status(500).json({ error: 'Error generating story' });
      }
  } else {
      res.status(400).json({ error: 'Category not provided' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
