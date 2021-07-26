export interface News {
    title: string;
    img: string;
    link: string;
    category: string;
    fullText: string;
    resumed: string;
}
/**
 * @main main news
 * @sub list of sub news
 */
export declare type NewsFetcher = () => Promise<News[] | null>;
