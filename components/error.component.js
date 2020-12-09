// eslint-disable-next-line import/prefer-default-export
export const ErrorComponent = {
  render: () => {
    return `
        <section>
          <h1>Error</h1>
          <p>This is just a test</p>
        </section>
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