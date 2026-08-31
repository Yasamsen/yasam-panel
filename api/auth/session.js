const { verifySession } = require('../../lib/auth');
module.exports = async (req,res)=>res.json({authenticated:await verifySession(req)});
