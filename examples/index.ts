import { getUolNewsFromFrontPage } from '../src/index';

getUolNewsFromFrontPage().then((news) => {
  console.log('news =>', news);
});
