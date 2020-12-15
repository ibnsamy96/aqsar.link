// eslint-disable-next-line import/prefer-default-export
export const HomeComponent = {
    render: () => {
        return `
  
        <main class='col my-auto'>
        <div class="row mb-5">
            <div class="col-12">
                <h1 id='' class="primary-text-font primary-text-size primary-text-color no-select">أقصر لينك</h1>
            </div>
        </div>
        <section id='formSection'>
            <form action="javascript:;" onsubmit="createNewShortLink()">
                <div class="form-row justify-content-center">
                
                    <div class='col-9 col-sm-8 col-md-6 col-lg-5  p-0'>
                        <input class="form-control" placeholder="ضع الرابط الطويل" type="text" name="link" id="link"
                            required />
                    </div>
                    <div class='col-2 p-0'>
                        <button id='submitBTN' class="btn btn-block btn-primary" type="submit">قصّر الرابط</button>
                    </div>
                    <div class='col-12'>
                    <p class="form-text text-muted small font-weight-bold" style='color:white !important' id="urlValidity"></p>
                    </div>
                </div>
            </form>
        </section>
        <section class="row justify-content-center mt-5 mb-4" id='shortenedLinks'>
            <div class="col-md-8 col-lg-6">
            </div>
        </section>

        <div id='notification'></div>

    </main>

    `;
    },
    injectCode: () => {
        return [{
            'operation': 'editInnerText',
            'querySelector': 'title',
            'newText': 'أقصر لينك | الرئيسية'
        }]
    }
};




// return `
// <section>
// <form action="javascript:;" onsubmit="createNewShortLink()">
//   <label for="link">Url to shorten:</label>
//   <input type="text" name="link" id="link" required />
//   <small id="urlValidity"></small>
//   <!-- <label for="slug">Optional. Custom micro url:</label>
//   <input type="text" name="slug" id="slug" /> -->
//   <input type="submit" value="Create" />
// </form>
// </section>

// <!-- <input type="text" name="link" id="link" />
// <button onclick="createNewShortLink()">Create</button> -->
// <p id="result"></p>
// <button class='displayNone' onclick="copyShortLink()">Copy</button>
// <button class='displayNone' onclick="createQR()">Create QR</button>
// <img src="" id="qrImg" class='displayNone' />

//   `;