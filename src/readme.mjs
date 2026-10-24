// Generates README.md from the list below. Run via `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://switchtwitch12345.github.io';

const img = (name, alt, width, href) => {
  const tag = `<picture><source media="(prefers-color-scheme: dark)" srcset="assets/${name}-dark.png"><img src="assets/${name}-light.png" alt="${alt}" width="${width}"></picture>`;
  return href ? `<a href="${href}">${tag}</a>` : tag;
};

const parts = [
  img('banner', 'Hi, I’m Mitul. I build things from the ground up. 3 papers accepted, 2 internships, CGPA 8.27 at RV University.', 848, SITE),
  '<p align="left">' + img('head-papers', 'Research: three papers. Each card opens a case study with the numbers, where they come from, and what didn’t work.', 424) + '</p>',
  [
    img('paper-fr3ak', 'FR3AK, accepted at SPELLL 2026. Maps every message to an 8-axis emotion vector. Cosine similarity 0.761, AUROC 0.711 against a 0.695 baseline.', 274, `${SITE}/work/fr3ak/`),
    img('paper-c4ps', 'C4PS, accepted at IEEE CAI 2026. Enhance, caption and translate an image locally. LPIPS 0.2475 against 0.4091 for bicubic, 3 silent bugs found and fixed.', 274, `${SITE}/work/c4ps/`),
    img('paper-swsiot', 'Static malware detection, accepted at SWSIoT 2025. 96.4% accuracy on PE files and 93.5% on URLs.', 274, `${SITE}/work/static-malware/`),
  ].join(''),
  '<p align="left">' + img('head-builds', 'Builds: projects that run, including one that does not fully work yet and says so.', 424) + '</p>',
  [
    img('build-ids', 'Zero-day intrusion detector. An Isolation Forest trained only on normal traffic reaches 87.2% accuracy on PortScan traffic it never saw, against 44.5% for a supervised Random Forest. ROC-AUC 0.964.', 416, `${SITE}/work/zero-day-ids/`),
    img('build-jenga', 'Jenga tower tracker, experimental. iPhone LiDAR and a marker mat paint each block green or red, live. Spotting the pulled block is still unsolved.', 416, `${SITE}/work/jenga-tracker/`),
  ].join(''),
  [
    img('build-sravaani', 'SraVaani Flow. Voice dictation for English and Indian languages on a Mac, transcribed locally.', 416, `${SITE}/work/sravaani-flow/`),
    img('build-more', 'Smaller projects: Vision2Text, image captioning with Xception and an LSTM. CIFARNet, a custom PyTorch CNN. MailGuard, a KNN spam classifier.', 416, `${SITE}/#builds`),
  ].join(''),
  '<p align="left">' + img('head-tools', 'Tools. Filled pills are used in the projects above.', 424) + '</p>',
  [
    img('tools-a', 'Languages: Python, C, Java, SQL, JavaScript. Machine learning: scikit-learn, XGBoost, Random Forest, Isolation Forest, KNN. Deep learning: PyTorch, TensorFlow, Keras, CNNs, LSTMs.', 416),
    img('tools-b', 'NLP: DeBERTa-v3, Transformers, BERT, embeddings. Vision: OpenCV, Real-ESRGAN, GFPGAN, Xception. Systems: FastAPI, Docker, Scapy, Linux, AWS, GCP.', 416),
  ].join(''),
  '<p align="left">' + img('head-contact', 'Contact. Let’s build something. Open to internships and full-time roles. Email is fastest.', 424) + '</p>',
  [
    img('cta-site', 'Portfolio', 272, SITE),
    img('cta-email', 'Email me', 272, 'mailto:mitulkm04@gmail.com'),
    img('cta-linkedin', 'LinkedIn', 272, 'https://linkedin.com/in/mitul-km'),
  ].join(''),
];

parts.splice(1, 0, '<b>Open to internships and full-time roles</b> &nbsp;·&nbsp; Bengaluru, India &nbsp;·&nbsp; Presenting at SPELLL, December 2026');

const md = `<div align="center">

${parts.join('\n\n')}

<sub>Every number here comes from a paper or a project README, and each case study says which. The artwork is generated from <a href="src/cards.html">src/cards.html</a>.</sub>

</div>
`;
fs.writeFileSync(path.join(root, 'README.md'), md);
console.log('wrote README.md');
