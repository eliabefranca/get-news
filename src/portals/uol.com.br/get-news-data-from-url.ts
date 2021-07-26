import { News } from '../../models';
import { getSite } from '../../utils/get-site';
import { convert } from 'html-to-text';

interface TextNode {
  title: string;
  text: string;
}

function getPageText(document: Document): {
  nodes: TextNode[];
  fullText: string;
} {
  const isAtextEl = (el: Element) =>
    el.tagName === 'P' ||
    el.tagName === 'H1' ||
    el.tagName === 'H2' ||
    el.tagName === 'H3';
  const isAtitleEl = (el: Element) =>
    el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3';

  const $txtEl = document.querySelector('.text,.c-news__body');

  const nodes = [{ title: '', text: '' }] as TextNode[];
  let fullText = '';
  let currentNode = 0;
  const txtChildrenLength = $txtEl?.children?.length ?? 0;

  for (let i = 0; i < txtChildrenLength; i++) {
    const $el = $txtEl?.children[i] as
      | HTMLParagraphElement
      | HTMLHeadingElement;

    if (!isAtextEl($el)) {
      continue;
    }

    const txtValue = convert($el.innerHTML)?.trim();
    if (!txtValue) {
      continue;
    }

    if (isAtitleEl($el)) {
      nodes.push({
        title: txtValue,
        text: '',
      });
      currentNode += 1;
      fullText += `\n\n${txtValue}\n\n`;
    } else {
      nodes[currentNode].text += txtValue;
      fullText += txtValue;
    }
  }

  return { nodes, fullText };
}

export const getNewsDataFromUrl = async (url: string): Promise<News | null> => {
  const site = await getSite(url);

  if (!site) {
    return null;
  }

  const { window } = site;
  const { document } = window;

  const { title } = document;
  const img = document.querySelector<HTMLImageElement>('article img')?.src;
  const category = document.location.pathname.split('/')[1];
  const { nodes, fullText } = getPageText(document);
  const resumed = nodes[0].title ? `${nodes[0].title}\n${nodes[0].text}` : '';

  const news = {
    title,
    category,
    fullText,
    img,
    link: url,
    resumed,
  } as News;

  return news;
};
