// trainClassifier.js

const natural = require('natural');
const classifier = new natural.BayesClassifier();

// "positive" sentences: these don't seem to involve anything harmful or suspicious
classifier.addDocument('These Terms and Conditions of Use (the "Terms of Use") apply to the', 'positive');
classifier.addDocument('The Site is the property of Inc', 'positive');
classifier.addDocument('Grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site.', 'positive');
classifier.addDocument('May make changes to any products or services offered on the Site, or to the applicable prices for any such products or services, at any time, without notice.', 'positive');
classifier.addDocument('we respect your privacy and will not share your information', 'positive');
classifier.addDocument('if you cancel your account, we will delete your data', 'positive');


// "negative" sentences: these involve data sharing, potential privacy issues, or other matters of concern
classifier.addDocument('Reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time.', 'negative');
classifier.addDocument('You may not use any "deep-link", "page-scrape", "robot", "spider" or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content.', 'negative');
classifier.addDocument('You may not attempt to gain unauthorized access to any portion or feature of the Site.', 'negative');
classifier.addDocument('You agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Site.', 'negative');
classifier.addDocument('You may not use the Site or any Content for any purpose that is unlawful or prohibited by these Terms of Use.', 'negative');
classifier.addDocument('disputes will be resolved in our sole discretion', 'negative');
classifier.addDocument('we may disclose your information to our business partners', 'negative');

// ... add more examples
classifier.train();

module.exports = classifier;