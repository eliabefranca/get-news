import { getUolNews } from './helpers/get-uol-news';
import { PageData } from './models';

interface AllNews {
  uol: PageData | null;
}

/**
 * @returns news from all available sources
 */
export async function getAllNews(): Promise<AllNews> {
  const uol = await getUolNews();

  return {
    uol,
  };
}

export { getUolNews };

getAllNews().then((all) => console.log(all));
