import {VercelApiHandler} from '@vercel/node';
import {makeBadge} from 'badge-maker';
import {generator, parser} from '../lib/sa';

const handler: VercelApiHandler = (req, res) => {
  try {
    const option = parser(req.query);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `public, max-age=${60 * 60 * 12}`);
    res.send(makeBadge(generator(option)));
  } catch {
    res.status(400);
    res.end();
  }
};

export default handler;
