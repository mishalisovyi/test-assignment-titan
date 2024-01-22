import puppeteer from './puppeteer.mjs';

const NUMBER_OF_SCROLLS = 5;

export default {
  async getKeywordOccurrences(URL, keyword) {
    const browser = await puppeteer.launchBrowser();
    const page = await puppeteer.openNewTab(browser);
  
    await puppeteer.navigatePageToUrl(page, URL);
    await puppeteer.scrollPageToBottom(page, { times: NUMBER_OF_SCROLLS });
  
    const pageText = await puppeteer.getPageText(page); 
    const occurrences = pageText.filter((item) => item.toLowerCase().includes(keyword.toLowerCase())).length;
  
    await puppeteer.closeBrowser(browser);
  
    return {
      keyword,
      occurrences
    }
  }
}