import axios from 'axios';
import { JSDOM, VirtualConsole } from 'jsdom';
import { EventEmitter } from 'events';

export async function getSite(url: string): Promise<JSDOM | null> {
  const site = await axios
    .get<string>(url)
    .then((response) => response.data)
    .catch(() => null);

  if (!site) {
    return null;
  }

  const siteUrl = new URL(url);

  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', () => {
    return;
  });
  try {
    const jsdom = new JSDOM(site, {
      url: siteUrl.origin,
      pretendToBeVisual: false,
      runScripts: 'outside-only',
      virtualConsole,
    });
    return jsdom;
  } catch (error) {
    return null;
  }
}
