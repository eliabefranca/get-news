import { getUolNews } from './helpers/get-uol-news';
import { PageData } from './models';
interface AllNews {
    uol: PageData | null;
}
/**
 * @returns news from all available sources
 */
export declare function getAllNews(): Promise<AllNews>;
export { getUolNews };
