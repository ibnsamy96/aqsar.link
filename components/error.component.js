// eslint-disable-next-line import/prefer-default-export
export const ErrorComponent = {
    render: () => {
        return `
      <main class='col my-auto'>
      <div class="row mb-5">
          <div class="col-12">
          <h1 id='' class="primary-text-color primary-text-font primary-text-size no-select">
          أقصر لينك
          </h1>   
          <h2 id='errorMessage' class="primary-text-color mt-5">
              هناك خطأ بالرابط، تاّكد من استخدامك لرابط صحيح أو يمكنك 
              <a href='../' style='color:wheat;text-decoration: underline !important; '>
              التوجّه للرئيسية</a>
              و تقصير رابط جديد.
              </h2>
          </div>
      </div>
 
  </main>
        `;
    },
    injectCode: () => {
        return [{
            'operation': 'editInnerText',
            'querySelector': 'title',
            'newText': 'أقصر لينك | صفحة غير موجودة'
        }]
    }
};