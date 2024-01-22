import puppeteer from 'puppeteer';

export default {

  // BROWSER

  async launchBrowser() {
    const browser = await puppeteer.launch({
      defaultViewport: null,
      args: [
        '--start-maximized'
      ]
    });

    return browser;
  },

  async closeBrowser(browser) {
    await browser.close();
  },

  async openNewTab(browser) {
    const page = await browser.newPage();

    return page;
  },

  // PAGE

  async navigatePageToUrl(page, url) {
    await page.goto(url);
  },

  async scrollPageToBottom(page, { times } = { times: 1 }) {
    for (let i = 0; i < times; i++) {
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForNetworkIdle(); // Wait for new content to load
    }
  },

  async getPageText(page) {
    const textData = await page.evaluate(() => {
      const isValidTextNode = (node) =>
        node.nodeType === Node.TEXT_NODE &&
        !['SCRIPT', 'STYLE'].includes(node.parentNode.tagName.toUpperCase()) &&
        node.textContent.trim().length;
  
      const getChildTextNodesContent = (node) => {
        const childTextNodes = [...node.childNodes].filter(isValidTextNode);

        return childTextNodes.map((textNode) => textNode.textContent.trim());
      };
  
      const bodyNodes = document.body.querySelectorAll('*');
      const textItems = Array.from(bodyNodes).flatMap((node) => getChildTextNodesContent(node));
  
      return textItems;
    });

    return textData
  }
}