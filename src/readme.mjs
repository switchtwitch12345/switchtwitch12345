// Generates README.md. Images are served from raw.githubusercontent.com with a version tag so GitHub's cache refreshes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://switchtwitch12345.github.io';
const RAW = 'https://raw.githubusercontent.com/switchtwitch12345/switchtwitch12345/main/assets';
const V = Date.now().toString(36);

const img = (name, alt, width, href) => {
  const tag = `<picture><source media="(prefers-color-scheme: dark)" srcset="${RAW}/${name}-dark.png?v=${V}"><img src="${RAW}/${name}-light.png?v=${V}" alt="${alt}" width="${width}"></picture>`;
  return href ? `<a href="${href}">${tag}</a>` : tag;
};

const parts = [
  img('hero', 'Mitul K M. Building things from the ground up.', 848, SITE),
  [img('card-profile', 'Mitul K M, RV University, Bengaluru. Focus: ML, security, systems. Open to internships and full-time roles.', 416), img('card-focus', 'Interests: machine learning, security, systems, building from scratch.', 416)].join(''),
  [img('stack-a', 'Languages and tools: Python, C, Java, SQL, JavaScript, scikit-learn, XGBoost, PyTorch, TensorFlow, Keras.', 416), img('stack-b', 'More tools: DeBERTa-v3, Transformers, OpenCV, FastAPI, Docker, Scapy, Linux, AWS, GCP.', 416)].join(''),
  [img('link-site', 'Portfolio', 272, SITE), img('link-linkedin', 'LinkedIn', 272, 'https://linkedin.com/in/mitul-km')].join(''),
];

fs.writeFileSync(path.join(root, 'README.md'), `<div align="center">

${parts.join('\n\n')}

</div>
`);
console.log('wrote README.md');
