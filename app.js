/* eslint-disable import/extensions */
import {
  databaseApi,
  getData,
  putData
} from "./api-comm.js";

import {
  LoadingComponent
} from "./components/loading.component.js";

let previouslyShortened = [];

function saveToLocalStorage(linksArray) {
  localStorage.setItem('linksArray', JSON.stringify(linksArray))
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('linksArray'))
}

function generateLinkGroups(shortenedLinks) {
  let shortenedLinksHTMLCode = ``

  shortenedLinks.forEach(link => {
    const linkGroupHTML = `<div id='${link.slug}' class='linkGroup '> <p class = "shortLink" > https://${window.location.host}/${link.slug} </p>
    <p class = "longLink" > ${link.domain} </p> <button class = 'copyBTN btn btn-secondary'
  onclick = "copyShortLink('${link.slug}')" > Copy </button> 
  <button class = 'qrBTN btn btn-secondary'
  onclick = "createQR('${link.slug}')" > Create QR </button> 
  </div>`
    shortenedLinksHTMLCode = `${linkGroupHTML} ${shortenedLinksHTMLCode}`
  });

  return `<h2 id='shortenedLinksHeadline' class=""><span>آخر الروابط المقصرة</span></h2> ${shortenedLinksHTMLCode}`

}

function updateShortenedLinksElement(shortenedLinksHTMLCode) {
  document.querySelector('#shortenedLinks .col-md-6').innerHTML = shortenedLinksHTMLCode;
}

function fetchLocalStorage() {
  const linksArray = getFromLocalStorage()
  if (linksArray) {
    // eslint-disable-next-line no-unused-vars
    previouslyShortened = [...linksArray]
    updateShortenedLinksElement(generateLinkGroups(previouslyShortened))

  }
}

window.addEventListener('load', fetchLocalStorage)


function validateURL(url) {

  const pattern = new RegExp(
    "^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,7}(:[0-9]{1,5})?(\\/.*)?$",
    "i"
  ); // fragment locator 

  return pattern.test(url);
}

async function checkSlug(slug) {
  console.log(slug);

  try {
    const data = await getData(
      `${databaseApi}.json?orderBy="$key"&equalTo="${slug}"&print=pretty`
    );
    // console.log(data);
    const slugDomain = data[`${slug}`].domain;
    console.log(data);
    console.log(slugDomain);
    console.log(false);
    return false;
  } catch (error) {
    console.log(error);

    return true;
  }
}



// eslint-disable-next-line consistent-return
async function generateSlug(length) {
  console.log(length);
  let slug = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (await checkSlug(slug)) {
    console.log("slug true");
    // true - slug is valid
    return slug;
  }
  console.log("slug false");

  // false - slug isn't valid
  return generateSlug(length + 1);
}

let link;
let shortLinkParagraph;
let longLinkParagraph;
let urlValidity;
let copyBTN;
let qrBTN;
let submitBTN;

function defineVariable() {
  link = document.querySelector("#link");
  shortLinkParagraph = document.querySelector(".shortLink");
  longLinkParagraph = document.querySelector(".longLink");
  urlValidity = document.querySelector("#urlValidity");
  copyBTN = document.querySelector('button[onclick="copyShortLink()"]');
  qrBTN = document.querySelector('button[onclick="createQR()"]');
  submitBTN = document.querySelector('#submitBTN')
}

function toggleForm(booleanValue) {
  submitBTN.disabled = booleanValue;
  link.disabled = booleanValue;
}

window.createNewShortLink = () => {
  if (!link) {
    defineVariable();
  }
  console.log(submitBTN);
  toggleForm(true)
  submitBTN.innerHTML = LoadingComponent.render()
  console.log(submitBTN);

  let randomSlug;
  const domain = link.value;
  if (validateURL(domain)) {
    urlValidity.innerText = "";
    console.log("domain is valid!");
    generateSlug(5)
      .then((slug) => {
        randomSlug = slug;
        console.log(randomSlug);
      })
      .then(() => {
        return putData(`${databaseApi}/${randomSlug}.json`, {
          domain
        });
      })
      .then((res) => {
        console.log(res);
        console.log(shortLinkParagraph);
        previouslyShortened.push({
          slug: randomSlug,
          domain
        })
        saveToLocalStorage(previouslyShortened)
        updateShortenedLinksElement(generateLinkGroups(previouslyShortened))
        console.log(previouslyShortened);
        // shortLinkParagraph.innerText = `${window.location.host}/${randomSlug}`;
        // longLinkParagraph.innerText = domain;
      })
      .then(() => {
        // copyBTN.style.display = "inline";
        // qrBTN.style.display = "inline";
        console.log(submitBTN);
        toggleForm(false)
        submitBTN.innerText = 'قصّر الرابط'


      })
      .catch((err) => {
        // document.querySelector('#loader').innerHTML = ''
        console.log(err)
      });
  } else {
    console.log("invalid");
    urlValidity.innerText = "الرابط غير صالح، تأكد من وجود http:// أو https:// قبل الرابط";
  }
};

window.copyShortLink = (slug) => {
  // copy link to clipboard
  const temporaryInput = document.createElement("input");
  temporaryInput.setAttribute("value", `https://${window.location.host}/${slug}`);
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  try {
    document.execCommand("copy"); // Security exception may be thrown by some browsers.
  } catch (error) {
    console.warn("Copy to clipboard failed.", error);
  }
  document.body.removeChild(temporaryInput);
};

// create QR code for links

window.createQR = (slug) => {
  const url = `https://${window.location.host}/${slug}`
  const qrImg = document.querySelector("#qrImg");
  const downloadQRBtn = document.querySelector("#downloadQRImg");
  qrImg.setAttribute(
    "src",
    `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100&color=DC143C&bgcolor=255-255-255`
  );
  downloadQRBtn.setAttribute(
    "href",
    `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100&color=DC143C&bgcolor=255-255-255`
  );
  qrImg.className = '';
  qrImg.style.display = "inline-block";
  downloadQRBtn.style.display = "inline-block";
  console.log(url);
  // const request = await fetch(

  // );
  // console.log(response.json);
};