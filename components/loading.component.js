// eslint-disable-next-line import/prefer-default-export
export const LoadingComponent = {
  render: (color = 'white') => {
    return `
  <div class="spinner-border text-${color}"></div>

  `;
  },
  injectCode: () => {}
};