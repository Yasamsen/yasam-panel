const { checkPassword, createSession, setCookie } = require('../../lib/auth');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  try {
    const ok = await checkPassword(req.body?.password || '');
    if (!ok) return res.status(401).json({error:'Password salah'});
    setCookie(res, await createSession());
    res.json({ok:true});
  } catch (e) { res.status(500).json({error:e.message}); }
};
