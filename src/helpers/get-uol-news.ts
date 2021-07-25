import axios from 'axios';
import cheerio, { BasicAcceptedElems, CheerioAPI, Node } from 'cheerio';
const normalizeWhitespace = require('normalize-html-whitespace');
import { NewsFetcher, PageData } from '../models';

async function getNewsTextFromUrl(url: string): Promise<string> {
  const siteData = await axios
    .get<string>(url)
    .then((response) => response.data)
    .catch(() => null);

  if (!siteData) {
    return '';
  }

  const $ = cheerio.load(siteData);
  const textElement = $('.text')[0];

  const txt = $(textElement)
    .contents()
    .map(function () {
      return $(this)?.text().trim();
    })
    .get()
    .join('')
    .replace(/\./gi, '. ');

  return normalizeWhitespace(txt).trim();
}

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
  const link = mainManchet?.attribs?.href;

  const category = link.split('.com.br/')[1].split('/')[0];
  const content = await getNewsTextFromUrl(link);
  pageData.news.push({
    link,
    img,
    title: $(h1)?.text(),
    category,
    content,
  });

  const submancheteList = $('.submanchete');
  let promises: Promise<any>[] = [];
  submancheteList.each((i, $el) => {
    const h1 = $($el).find('h2')[0];
    const image = $($el).find('img')[0];
    const link = $($el).find('a')[0]?.attribs?.href;

    const img = ($(image).data('original') ?? $(image).data('src')) as string;
    const category = link.split('.com.br/')[1].split('/')[0];

    const promise = getNewsTextFromUrl(link).then((content) => {
      pageData.news.push({
        link,
        img,
        title: $(h1)?.text(),
        content,
        category,
      });
    });

    promises.push(promise);
  });

  await Promise.all(promises);
  return pageData;
};
