import axios from 'axios';
import cheerio from 'cheerio';
import { NewsFetcher, PageData } from '../models';

// A idéia é montar uma página HTML a partir dos resultados pra jogar pro bot
export const getUolNews: NewsFetcher = async (): Promise<PageData | null> => {
  const siteData = await axios
    .get<string>('https://www.uol.com.br')
    .then((response) => response.data)
    .catch(() => null);

  //

  if (!siteData) {
    return null;
  }

  const $ = cheerio.load(siteData);
  const pageData = {
    sourceName: 'uol',
    news: [],
  } as PageData;

  const mainManchet = $('a.manchete-editorial')[0];

  const h1 = $(mainManchet).find('h2')[0];
  const image = $(mainManchet).find('img')[0];

  pageData.news.push({
    link: mainManchet?.attribs?.href,
    img: image?.attribs?.src,
    title: $(h1)?.text(),
  });

  const submancheteList = $('.submanchete');
  submancheteList.each((i, $el) => {
    const h1 = $($el).find('h2')[0];
    const image = $($el).find('img')[0];
    const anchor = $($el).find('a')[0];

    pageData.news.push({
      link: anchor?.attribs?.href,
      img: image?.attribs?.src,
      title: $(h1)?.text(),
    });
  });

  return pageData;
};
