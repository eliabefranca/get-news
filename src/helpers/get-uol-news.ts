import axios from 'axios';
import cheerio from 'cheerio';
import { NewsFetcher, PageData } from '../models';

export const getUolNews: NewsFetcher = async (): Promise<PageData | null> => {
  const siteData = await axios
    .get<string>('https://www.uol.com.br')
    .then((response) => response.data)
    .catch(() => null);

  if (!siteData) {
    return null;
  }

  const $ = cheerio.load(siteData);
  const pageData = {
    sourceName: 'uol',
    news: [],
  } as PageData;

  const mainManchet = $('a.manchete-editorial')[0];

  const h1 = $(mainManchet).find('h1')[0];
  const image = $(mainManchet).find('figure img')[0];
  const img = ($(image).data('original') ?? $(image).data('src')) as string;

  pageData.news.push({
    link: mainManchet?.attribs?.href,
    img,
    title: $(h1)?.text(),
  });

  const submancheteList = $('.submanchete');
  submancheteList.each((i, $el) => {
    const h1 = $($el).find('h2')[0];
    const image = $($el).find('img')[0];
    const anchor = $($el).find('a')[0];

    const img = ($(image).data('original') ?? $(image).data('src')) as string;

    pageData.news.push({
      link: anchor?.attribs?.href,
      img,
      title: $(h1)?.text(),
    });
  });

  return pageData;
};
