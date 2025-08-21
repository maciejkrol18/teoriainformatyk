/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.PRODUCTION_URL}`,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
