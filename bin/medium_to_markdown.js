const mediumToMarkdown = require('medium-to-markdown');
 
// Enter url here
mediumToMarkdown.convertFromUrl('https://hartaniyassir.medium.com/creating-slug-urls-in-rails-without-gems-c693e0eeec8a')
  .then(function (markdown) {
    console.log(markdown); //=> Markdown content of medium post
  });