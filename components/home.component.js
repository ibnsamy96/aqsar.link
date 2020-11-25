// eslint-disable-next-line import/prefer-default-export
export const HomeComponent = {
  render: () => {
    return `
    <section>
    <form action="javascript:;" onsubmit="createNewShortLink()">
      <label for="link">Url to shorten:</label>
      <input type="text" name="link" id="link" required />
      <small id="urlValidity"></small>
      <!-- <label for="slug">Optional. Custom micro url:</label>
      <input type="text" name="slug" id="slug" /> -->
      <input type="submit" value="Create" />
    </form>
  </section>

  <!-- <input type="text" name="link" id="link" />
  <button onclick="createNewShortLink()">Create</button> -->
  <p id="result"></p>
  <button class='displayNone' onclick="copyShortLink()">Copy</button>
  <button class='displayNone' onclick="createQR()">Create QR</button>
  <img src="" id="qrImg" class='displayNone' />

      `;
  },
  injectCode: () => {
    return [{
        'operation': 'editInnerText',
        'querySelector': 'title',
        'newText': 'Aqsar Link | Home'
      },
      {
        'operation': 'editAttribute',
        'querySelector': 'body',
        'attribute': 'id',
        'newValue': 'body'
      }, {
        'operation': 'append',
        'querySelector': 'body',
        'position': 'beforeend',
        'code': `<script type="module" src="./app.js"></script>`
      }
    ]
  }
};




console.log(HomeComponent);