const themeConfig = require('./config/theme/')

module.exports = {
  title: 'Dean',
  description: '一杯茶一支烟一个bug改一天',
  dest: 'deploy',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/medium-zoom',
    'flowchart'
  ]
}