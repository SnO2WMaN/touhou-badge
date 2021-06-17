/* eslint-disable no-process-env */

export const badgesBaseUrl = {
  mof: new URL('mof/', process.env.BADGE_BASE_URL!).toString(),
};
