import {VercelApiHandler} from '@vercel/node';
import {makeBadge} from 'badge-maker';
import {extractCommonProps, extractOptions, getBadgeProps} from '~/badges/mof';

const handler: VercelApiHandler = (req, res) => {
  try {
    const common = extractCommonProps(req.query);
    const options = extractOptions(req.query);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', `public, max-age=${60 * 60 * 12}`);
    res.send(makeBadge(getBadgeProps(options, common)));
  } catch {
    res.status(400);
    res.end();
  }
};

export default handler;
