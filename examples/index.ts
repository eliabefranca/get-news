import { getUolNews } from '../src/index';

getUolNews().then((uolPageData) => {
  console.log(uolPageData?.news);
});
