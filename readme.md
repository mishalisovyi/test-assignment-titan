# Test assignment for Titan

This is a simple web-application that allows to check the number of occurences of particular string keyword in web-page content.

## Installation

### 1. Server
```sh
cd server
npm i
npm start
```

### 2. Client
```sh
cd client
```
Then, open index.html.

## Implementation details
This solution uses headless browser (`puppeteer` package) under the hood to be able to handle web-pages with infinite scroll. Web-page is opened by headless browser and gradually scrolled to the bottom to load as much data as possible. After that the content of web-page is extracted and used to calculate the number of keyword occurrences. The number of additional data loads (i. e. number of scrolls) is regulated by `NUMBER_OF_SCROLLS` constant to find the perfect balance between the size of contents and request duration.

## How to use
Web-interface offers two input controls for entering web-page url and search keyword. When all data is entered, search button is used to call server endpoint and load the number of keyword occurrences in web-page contents.

## Examples of input data
### Simple web-pages (without infinite scroll):
URL: https://en.wikipedia.org/wiki/Poor_Things_(film), keyword: _file_.

URL: https://www.thetimes.co.uk/, keyword: _the_.

### Web-pages with infinite scroll:
URL: https://www.pinterest.com/ideas/, keyword: _nail_.

URL: https://www.google.com/search?q=sun, keyword: _sun_.