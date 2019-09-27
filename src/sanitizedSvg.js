import React from 'react';
import SanitizedHTML from 'react-sanitized-html';
import * as data from './allowedData';

const SanitizedSVG = ({ html }) => (
  <SanitizedHTML
    allowedTags={data.AllowedTags}
    allowedSchemes={['http', 'https', 'data']}
    allowedAttributes={{
      '*': ['style', 'class'],
      td: ['width'],
      rect: data.AllowedSvgAttrs,
      img: ['src', 'srcset', 'alt'],
      mask: ['id', 'fill'],
      svg: data.AllowedSvgAttrs,
      filter: data.AllowedSvgFilters,
      line: data.AllowedSvgAttrs,
      g: data.AllowedSvgAttrs,
      path: data.AllowedPathAttrs,
      clipPath: ['id'],
      use: ['transform', 'xlink:href'],
    }}
    parser={{
      lowerCaseAttrributeNames: true,
    }}
    nonTextTags={['desc', 'title', 'a', 'this']}
    html={html}
  />
);

export default SanitizedSVG;
