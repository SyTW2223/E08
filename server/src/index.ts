import './db/mongoose';
import app from './app';


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});

export default app;