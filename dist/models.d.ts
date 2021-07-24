export interface News {
    title: string;
    img: string;
    link: string;
    isMainArticle?: boolean;
}
/**
 * @main main news
 * @sub list of sub news
 */
export interface PageData {
    sourceName: string;
    news: News[];
}
export declare type NewsFetcher = () => Promise<PageData | null>;
