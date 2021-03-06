module.exports = {
  siteMetadata: {
    title: `Alexandr Tovmach`,
    description: `Full stack engineer and UI/UX designer. I build software for startups and big companies with focus on eye-catching design, usability, a11y and web optimization.`,
    author: `@alexandrtovmach`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdContent`,
        path: `${__dirname}/src/assets/markdown`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `jsonContent`,
        path: `${__dirname}/src/assets/data`,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /icons/,
        },
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://medium.com/feed/@alexandrtovmach`,
        name: `Medium`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://habr.com/ru/users/alexandrtovmach/rss/posts`,
        name: `Habr`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://dou.ua/users/aleksandr-tovmach/articles/feed/`,
        name: `DOU`,
        parserOption: {
          headers: { 'User-Agent': 'alexandrtovmach.com' },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alexandr Tovmach CV`,
        short_name: `alexandrtovmach.com`,
        start_url: `/`,
        background_color: `#f6f6f2`,
        theme_color: `#f6f6f2`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-134175339-1',
      },
    },
    `gatsby-plugin-offline`,
  ],
};
