const express = require('express');

const urlRoute = require('./routes/url');
const ShortUrl = require('./models/url');

const app = express();

const {connectToMongoDB}= require('./connection')

const PORT = 8001;

//connection of mongodb
connectToMongoDB('mongodb://127.0.0.1:27017/shorturl')
.then(()=>console.log('mongoDB is connected'))
.catch((err)=>console.log('Failed to connect with mongoDB, error: ',err))

//middleware
app.use(express.json());

//route
app.use("/url", urlRoute);

app.get('/:shortID', async (req, res) => {
    try {
      const { shortID } = req.params; // Get shortID from URL parameters
  
      // Find the entry by shortID
      const entry = await ShortUrl.findOne({ shortID });
  
      // Check if entry exists
      if (!entry) {
        return res.status(404).json({ message: 'Short URL not found' });
      }
  
      // Redirect to the original URL
      res.redirect(entry.redirectURL);
    } catch (error) {
      console.error('Error handling redirect:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
app.delete('/:shortID', async (req, res) => {
    try {
      const { shortID } = req.params; // Extract shortID from the route parameters
  
      // Find and delete the entry by shortID
      const deletedUrl = await ShortUrl.findOneAndDelete({ shortID });
  
      // Check if the URL was found and deleted
      if (!deletedUrl) {
        return res.status(404).json({ message: 'URL not found' });
      }
  
      res.status(200).json({ message: 'URL successfully deleted', deletedUrl });
    } catch (error) {
      console.error('Error deleting URL:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.listen(PORT,()=>console.log('server is started at port: ',PORT))