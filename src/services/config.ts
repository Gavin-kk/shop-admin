// const DEVBASE_URL = 'http://localhost:5000';
const DEVBASE_URL = 'http://localhost:5000';
const PROBASE_URL = 'http://8.131.61.150:5000';
export const BASEURL = process.env.NODE_ENV === 'development' ? DEVBASE_URL : PROBASE_URL;
