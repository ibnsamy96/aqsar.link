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

function getSvgCopy() {
  return `<svg width="26"
  height="26" viewBox="0 0 26 26">
  <g id="copy-icon" transform="translate(-552 -652)">
      <g id="Rectangle_4" data-name="Rectangle 4" class="copy-cls-1"
          transform="translate(561 652)">
          <rect class="copy-cls-2" width="17" height="21" rx="6" />
          <rect class="copy-cls-3" x="1" y="1" width="15" height="19" rx="5" />
      </g>
      <g id="Rectangle_5" data-name="Rectangle 5" class="copy-cls-1"
          transform="translate(552 657)">
          <rect class="copy-cls-2" width="17" height="21" rx="6" />
          <rect class="copy-cls-3" x="1" y="1" width="15" height="19" rx="5" />
      </g>
  </g>
</svg>`
}

function getSvgQr() {
  return `<svg width="26"
  height="26" viewBox="0 0 26 26">
  <g id="qr-icon" transform="translate(-683 -679)">
      <g id="Group_2" data-name="Group 2" transform="translate(0 -53)">
          <g id="Rectangle_6" data-name="Rectangle 6" class="qr-cls-1"
              transform="translate(683 732)">
              <rect class="qr-cls-5" width="26" height="26" rx="6" />
              <rect class="qr-cls-6" x="1" y="1" width="24" height="24" rx="5" />
          </g>
          <rect id="Rectangle_7" data-name="Rectangle 7" class="qr-cls-2" width="26"
              height="9" transform="translate(683 741)" />
          <rect id="Rectangle_8" data-name="Rectangle 8" class="qr-cls-2" width="26"
              height="9" transform="translate(700.5 732) rotate(90)" />
      </g>
      <g id="Rectangle_9" data-name="Rectangle 9" class="qr-cls-3"
          transform="translate(688 684)">
          <rect class="qr-cls-5" width="6" height="6" rx="1" />
          <rect class="qr-cls-6" x="0.5" y="0.5" width="5" height="5" rx="0.5" />
      </g>
      <g id="Rectangle_10" data-name="Rectangle 10" class="qr-cls-3"
          transform="translate(699 684)">
          <rect class="qr-cls-5" width="6" height="6" rx="1" />
          <rect class="qr-cls-6" x="0.5" y="0.5" width="5" height="5" rx="0.5" />
      </g>
      <g id="Rectangle_11" data-name="Rectangle 11" class="qr-cls-3"
          transform="translate(688 695)">
          <rect class="qr-cls-5" width="6" height="6" rx="1" />
          <rect class="qr-cls-6" x="0.5" y="0.5" width="5" height="5" rx="0.5" />
      </g>
      <g id="Rectangle_12" data-name="Rectangle 12" class="qr-cls-4"
          transform="translate(699 695)">
          <rect class="qr-cls-5" width="3" height="3" rx="1" />
          <rect class="qr-cls-6" x="0.25" y="0.25" width="2.5" height="2.5" rx="0.75" />
      </g>
      <g id="Rectangle_15" data-name="Rectangle 15" class="qr-cls-4"
          transform="translate(699 698)">
          <rect class="qr-cls-5" width="3" height="3" rx="1" />
          <rect class="qr-cls-6" x="0.25" y="0.25" width="2.5" height="2.5" rx="0.75" />
      </g>
      <g id="Rectangle_13" data-name="Rectangle 13" class="qr-cls-4"
          transform="translate(702 695)">
          <rect class="qr-cls-5" width="3" height="3" rx="1" />
          <rect class="qr-cls-6" x="0.25" y="0.25" width="2.5" height="2.5" rx="0.75" />
      </g>
      <g id="Rectangle_14" data-name="Rectangle 14" class="qr-cls-4"
          transform="translate(702 698)">
          <rect class="qr-cls-5" width="3" height="3" rx="1" />
          <rect class="qr-cls-6" x="0.25" y="0.25" width="2.5" height="2.5" rx="0.75" />
      </g>
  </g>
</svg>`
}


function generateLinkGroups(shortenedLinks) {
  let shortenedLinksHTMLCode = ``

  shortenedLinks.forEach(link => {
    const linkGroupHTML = `<div class='row  m-0 p-0 linkGroup'>
    <button class=' col-lg-1 m-0 px-1 copyBTN btn btn-secondary'
        onclick="copyShortLink('${link.slug}')"> ${getSvgCopy()} </button>
    <button class='col-lg-1 m-0 px-1  qrBTN btn btn-secondary'
        onclick="createQR('${link.slug}')">${getSvgQr()} </button>
    <div class="col-lg-auto m-0 px-1">
        <p class="m-0 p-0  shortLink">https://${window.location.host}/${link.slug}</p>
    </div>
    <div class="col-lg m-0 px-1 ">
        <p class="m-0 p-0 longLink">${link.domain}</p>
    </div>
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