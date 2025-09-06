const {nanoid} = require('nanoid');
const URL = require('../models/url.js');

const generateNewShortURL = async(req, res)=>{
    try {
        const body = req.body;
        if(!body.url){
            return res.status(400).json({
                error: "URL needed"
            });
        }

        const shortID = nanoid(8);

        await URL.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: []
        });

        res.status(201).json({
            id: shortID
        })
    } catch (error) {
        res.status(500).json({
            error: "could not generate shortID: " + error.message 
        })
    }
}

const redirect = async (req, res)=>{
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOneAndUpdate( {
            shortId
        }, {$push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }});

        res.redirect(result.redirectURL);
    } catch (error) {
        res.status(500).json({
            error: "Error redirecting: " + error.message
        })
    }
}

const analytics = async(req, res)=>{
    try {
        const shortID = req.params.shortId;
        console.log(shortID);
        
        const result = await URL.findOne({shortId:shortID});
        console.log(result);
        
        return res.status(200).json({
            clicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to get analytics: " + error.message
        });
    }
}

module.exports = {
    generateNewShortURL,
    redirect,
    analytics
}