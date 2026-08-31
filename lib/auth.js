const { SignJWT, jwtVerify } = require('jose');
const bcrypt = require('bcryptjs');

const secret = new TextEncoder().encode(process.env.SESSION_SECRET || 'change-me');
const COOKIE = 'yasam_session';

function parseCookies(req) {
  const out = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const i = part.indexOf('=');
    if (i > -1) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

async function createSession() {
  return new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
}

async function verifySession(req) {
  const token = parseCookies(req)[COOKIE];
  if (!token) return false;
  try { await jwtVerify(token, secret); return true; } catch { return false; }
}

function setCookie(res, token) {
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`);
}
function clearCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
}
async function checkPassword(password) {
  const hash = process.env.ADMIN_PASSWORD_HASH || '';
  return !!hash && bcrypt.compare(password, hash);
}
module.exports = { verifySession, createSession, setCookie, clearCookie, checkPassword };
