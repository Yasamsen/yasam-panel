const { clearCookie } = require('../../lib/auth');
module.exports = async (req,res)=>{ if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'}); clearCookie(res); res.json({ok:true}); };
