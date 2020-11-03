const databaseApi = 'https://ibn-samy-short-links.firebaseio.com/links.json';

const postData = async (url = '', data = {}) => {
  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    credentials: 'same-origin',
  });

  return request.json();
};


const getData = async (url = '') => {
    const request = await fetch(url, { mode: 'cors', method: 'GET' });
  
    return request.json();
  };



  
// TODO generate codes as Firebase codes has '-' and domains mustn't have one

const link = document.querySelector('#link');
const result = document.querySelector('#result');


// eslint-disable-next-line no-unused-vars
function createNewShortLink() {

  const domain = link.value;
  console.log(domain);

  postData(databaseApi, { domain })
    .then((res) => {
      console.log(res);
      return res.name;
    })
    .then((slug) => {
      result.innerText = `aqsar.xyz/${slug}`;
    })
    .catch((err) => console.log(err));
}

function specifyURLSlug() {
    const slug = window.location.pathname.split('/')[1];
    if (slug !== '' && slug !== ' ') {
        return window.location.pathname.split('/')[1];
    }
    return false
}

// eslint-disable-next-line no-unused-vars
function getShortLink(givenSlug){

    const slug = specifyURLSlug() || givenSlug;
    console.log(`${databaseApi}?orderBy="$key"&equalTo="${slug}"&print=pretty`);

  return  getData(
        `${databaseApi}?orderBy="$key"&equalTo="${slug}"&print=pretty`,
      )
        .then((data) => {
            console.log(data);
          console.log(data[`${slug}`].domain);
          return data[`${slug}`].domain;
        })
        .then((data) => {
            return data;
        })
        .catch((data) => console.log(data));
      
}


// eslint-disable-next-line no-unused-vars
function copyShortLink(){
  const slug =  result.innerText.split('/')[1] ;

  // copy link to clipboard
  const temporaryInput = document.createElement('input');
  temporaryInput.setAttribute('value', result.innerText);
  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  try {
       document.execCommand("copy");  // Security exception may be thrown by some browsers.
  }
  catch (error) {
      console.warn("Copy to clipboard failed.", error);
  }
  document.body.removeChild(temporaryInput);

  getShortLink(slug)
}


async function goToLink(){
    const slug =  result.innerText.split('/')[1] ;

const URL= await getShortLink(slug);

window.open(URL, '_blank'); // open link in new tab
}