import axios from "axios"; // Axios requests
import chrome from "chrome-aws-lambda"; // Chromium settings
import puppeteer from "puppeteer-core"; // Puppeteer core
import address from 'ethers';

/**
 * Generates HTML page from media and address template
 * @param {String} media highlighted image media
 * @param {String} address profile address
 */
const generateHTML = (media, address) => {
  return `
  <html>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
      
      * {
        margin: 0;
        padding: 0;
      }
      
      html {
        width: 1200px;
        height: 600px;
        background-color: #fff;
        font-family: 'Poppins', sans-serif;
      }

      .puppy {
        width: 70px;
        height: 70px;
        position: absolute;
        top: 25px;
        left: 25px;
      }

      .highlight {
        height: 400px;
        width: auto;
        margin-top: 100px;
      }

      .address {
        font-size: 30px;
        top: 45px;
        left: 110px;
        position: absolute;
      }
    </style>
    <div>
      <img class="puppy" src="./puppy.svg" alt="Puppy NFT" width ="96" height = "96" />
      <h2 class="address">${
        address.substr(0, 5) + "..." + address.slice(address.length - 5)
      }
      </h2>
      <center>
        <img class="highlight" src="data:image/png;base64, ${media}" />
      </center>
    </div>
  </html>
  `;
};

/**
 * Generates screenshot of html page
 */
const getScreenshot = async ({ html, type = "png" }) => {
  // Launch puppeteer browser
  const browser = await puppeteer.launch({
    // With chrome default args
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: false,
  });

  // Make new page
  const page = await browser.newPage();

  // Set content to generated html, wait for image load
  await page.setContent(html, { waitUntil: "networkidle0" });
  const element = await page.$("html");

  // Take screenshot to png form
  return await element.screenshot({ type }).then(async (data) => {
    // Close browser and return screenshot
    await browser.close();
    return data;
  });
};

async function writeHead(){
    const image = Buffer.from(
      getBase64("./meta.png"),
      "base64"
    );
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image);
};

/**
 * Returns media contentURI as Base64
 * @param {String} url of media
 */
async function getBase64(url) {
  return axios
    .get(url, {
      // Collect as ArrayBuffer
      responseType: "arraybuffer",
    })
    .then((response) =>
      // Convert response to base64
      Buffer.from(response.data, "binary").toString("base64")
    );
}
