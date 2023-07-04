// trainClassifier.js

const natural = require('natural');
const classifier = new natural.BayesClassifier();

// "positive" sentences: these don't seem to involve anything harmful or suspicious
classifier.addDocument('Your data will only be used to improve your experience.', 'positive');
classifier.addDocument('We respect your privacy and will not share your data with third parties without your consent.', 'positive');
classifier.addDocument('In the event of a dispute, we aim to resolve it amicably with your best interests at heart.', 'positive');

// "negative" sentences: these involve data sharing, potential privacy issues, or other matters of concern
classifier.addDocument('Reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time.', 'negative');
classifier.addDocument('We may share your personal information with our affiliates.', 'negative');
classifier.addDocument('We may change the privacy policy at any time without notice.', 'negative');
classifier.addDocument('By using our services, you consent to our use of cookies and similar technologies.', 'negative');
classifier.addDocument('We are not responsible for any third-party links that you access through our service.', 'negative');
classifier.addDocument('We reserve the right to disclose your personal information if required by law or in response to legal proceedings.', 'negative');
classifier.addDocument('In the event of a merger or acquisition, your personal information may be transferred to the new entity.', 'negative');
classifier.addDocument('We may track your browsing habits to serve you targeted advertising.', 'negative');
classifier.addDocument('We may store your data in servers located in other countries.', 'negative');
classifier.addDocument('Your data will be stored for an indefinite period even after account deletion.', 'negative');
classifier.addDocument('Your non-personally identifiable information may be provided to other parties for marketing, advertising, or other uses.', 'negative');
classifier.addDocument('disputes will be resolved in our sole discretion', 'negative');
classifier.addDocument('we may disclose your information to our business partners', 'negative');

// ... add more examples
classifier.train();

module.exports = classifier;