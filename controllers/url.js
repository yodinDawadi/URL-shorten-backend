const shortid = require('shortid');
const URL = require('../models/url');
async function handdleGenerateNewShortUrl(req,res){
    try {
        const { redirectURL } = req.body;
    
        // Ensure `redirectURL` is not undefined
        if (!redirectURL) {
          return res.status(400).json({ message: 'redirectURL is required' });
        }
    
        const shortID = shortid.generate(); // Generate shortID
    
        // Create a new URL document
        const newUrl = new URL({
          redirectURL,
          shortID
        });
    
        await newUrl.save();
    
        res.status(201).json(newUrl);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    };

module.exports ={
    handdleGenerateNewShortUrl,
}