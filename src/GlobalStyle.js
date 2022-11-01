import {createGlobalStyle} from 'styled-components';
import WorkSansLight from './fonts/work_sans/WorkSans-Light.ttf';

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-med: 14px;
    --color-white: #fff;
    --color-darkgreen: darkgreen;
    --color-green: #37af4f;
    --color-gray: gray;
    --color-medium-gray: #888;
    --color-sky-blue: #779ea3;
    --color-light-gray: #ccc;
    --color-red: #c91d21;
    --color-medium-orange: #ef6351;
    --light-gray: #808080;
  }
  @font-face {
    font-family: "WorkSansLight";
    src: local("WorkSansLight"), url(${WorkSansLight}) format("truetype");
  }
  body {
    font-family: "WorkSansLight";
    height: 100vh;
    width: 100vw;
    margin: 0;
    overflow-x: hidden;
  }
  button {
    cursor: pointer;
  }
  .logo {
    background-image: url("/images/logo_gerer_condo.png");
    height: 70px;
    width: 200px;
    background-repeat: no-repeat;
    top: 20px;
    left: 40px;
  }
  @media (max-width: 480px) {
    .logo {
      top: 25px;
      left: 25px;
      height: 35px;
      width: 200px;
      background-image: url(/images/gerer_condo_mobile_logo_med.png);
    }
  }
    *,
    *:before,
    *:after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }

    html, body {
        max-width: 100vw;
    }

    /* http://meyerweb.com/eric/tools/css/reset/
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
`;

export default GlobalStyle;