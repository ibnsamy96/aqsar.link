// eslint-disable-next-line import/prefer-default-export
export const LoadingComponent = {
  render: (color = 'white') => {
    return `
  <div class="spinner-border text-${color}"></div>

  `;
  },
  injectCode: () => {}
};


//     <div class="loadingio-spinner-rolling-jqo18xa3ee">
//     <div class="ldio-1i8l1iij715h">
//       <div></div>
//     </div>
//   </div>
//   <style type="text/css">
//     @keyframes ldio-1i8l1iij715h {
//       0% {
//         transform: translate(-50%, -50%) rotate(0deg);
//       }

//       100% {
//         transform: translate(-50%, -50%) rotate(360deg);
//       }
//     }

//     .ldio-1i8l1iij715h div {
//       position: absolute;
//       width: ${width};
//       height: ${height};
//       border: ${border} solid #ffffff;
//       border-top-color: transparent;
//       border-radius: 50%;
//     }

//     .ldio-1i8l1iij715h div {
//       animation: ldio-1i8l1iij715h 0.9803921568627451s linear infinite;
//       top: 50%;
//       left: 50%
//     }

//     .loadingio-spinner-rolling-jqo18xa3ee {
//       width: calc(100%+50px);
//       height: ${width};
//       display: inline-block;
//       overflow: hidden;
//       background: none;
//     }

//     .ldio-1i8l1iij715h {
//       width: 100%;
//       height: 100%;
//       position: relative;
//       transform: translateZ(0) scale(1);
//       backface-visibility: hidden;
//       transform-origin: 0 0;
//       /* see note above */
//     }

//     .ldio-1i8l1iij715h div {
//       box-sizing: content-box;
//     }
//       </style>