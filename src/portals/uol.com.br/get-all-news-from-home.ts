import { getSite } from '../../utils/get-site';
import { News, NewsFetcher } from '../../models';
import { getNewsDataFromUrl } from './get-news-data-from-url';

export const getUolNewsFromFrontPage: NewsFetcher = async (): Promise<
  News[] | null
> => {
  const site = await getSite('http://uol.com.br/');
  if (!site) {
    return null;
  }

  const { document } = site.window;
  const thumbnails = document.querySelectorAll('.manchete,.submanchete');
  const newsData = [] as News[];
  const alreadySaved = [] as string[];

  const promisesToResolve = [] as Promise<any>[];
  thumbnails.forEach(async ($el) => {
    const link = $el.querySelector('a')?.href ?? '';
    if (!link || alreadySaved.includes(link)) {
      return;
    }

    alreadySaved.push(link);
    const promise = getNewsDataFromUrl(link).catch(() => null);
    promisesToResolve.push(promise);
    const news = await promise;

    if (news) {
      newsData.push(news);
    }
  });

  await Promise.all(promisesToResolve);

  return newsData;
};
