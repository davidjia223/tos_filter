// trainClassifier.js

const natural = require('natural');
const classifier = new natural.BayesClassifier();

const stemmer = natural.PorterStemmer;
const stopwords = natural.stopwords;

// add stopwords filtering and stemming when processing sentences
const processSentence = (sentence) => {
  const tokenized = natural.WordTokenizer().tokenize(sentence);
  const filtered = tokenized.filter(word => !stopwords.includes(word));
  return filtered.map(word => stemmer.stem(word)).join(' ');
}

// when adding documents, process sentences first
classifier.addDocument(processSentence('Your data will only be used to improve your experience.'), 'positive');

// "positive" sentences: these don't seem to involve anything harmful or suspicious
classifier.addDocument('Your data will only be used to improve your experience.', 'positive');
classifier.addDocument('We respect your privacy and will not share your data with third parties without your consent.', 'positive');
classifier.addDocument('In the event of a dispute, we aim to resolve it amicably with your best interests at heart.', 'positive');
classifier.addDocument('You have the right to delete your data at any time.', 'positive');
classifier.addDocument('We protect your data using state-of-the-art encryption technologies.', 'positive');
classifier.addDocument('We will notify you immediately in case of a data breach.', 'positive');
classifier.addDocument('Your consent will be requested before we share any of your personal data.', 'positive');
classifier.addDocument('We comply with all data protection laws and regulations.', 'positive');
classifier.addDocument('Your information is stored safely and securely.', 'positive');
classifier.addDocument('We require your explicit permission to share your information.', 'positive');
classifier.addDocument('All data related disputes are handled in a customer-centric manner.', 'positive');
classifier.addDocument('User data is encrypted with industry-standard security measures.', 'positive');
classifier.addDocument('We aim to alert users promptly if any data breach occurs.', 'positive');

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
classifier.addDocument('We may sell your personal information to third parties for marketing purposes.', 'negative');
classifier.addDocument('We may change our Terms of Service without giving any notice.', 'negative');
classifier.addDocument('We hold no responsibility for any data loss or security breaches.', 'negative');
classifier.addDocument('Your data may be processed in countries with lower data protection standards.', 'negative');
classifier.addDocument('By using our service, you give up your right to take any disputes to court.', 'negative');
classifier.addDocument('We have the right to suspend or terminate your account without prior notice or reason.', 'negative');
classifier.addDocument('You must be at least 18 years old to use our service.', 'negative');
classifier.addDocument('We may retain your data indefinitely.', 'negative');
classifier.addDocument('We allow third-party companies to serve ads and/or collect certain anonymous information.', 'negative');
classifier.addDocument('These terms shall be governed by the laws of the state of California.', 'negative');
classifier.addDocument('We may terminate your account at any time for any reason.', 'negative');
classifier.addDocument('We reserve the right to use any user-generated content.', 'negative');
classifier.addDocument('We disclaim all warranties, express or implied.', 'negative');
classifier.addDocument('You agree to indemnify us against any claims or legal proceedings.', 'negative');
classifier.addDocument('We may change or discontinue the service at any time without notice.', 'negative');
classifier.addDocument('We may use your data for automated decision-making, including profiling.', 'negative');
classifier.addDocument('We can amend these terms at any time without notifying you.', 'negative');
classifier.addDocument('Our company is allowed to share your personal details with associated entities.', 'negative');
classifier.addDocument('We possess the authority to alter the privacy policy unannounced.', 'negative');
classifier.addDocument('Acceptance of cookies is mandatory to use our services.', 'negative');
classifier.addDocument('We bear no responsibility for third-party links on our platform.', 'negative');
classifier.addDocument('We may disclose your data under legal circumstances without your consent.', 'negative');
classifier.addDocument('In case of a company merger, your personal data may be shared.', 'negative');
classifier.addDocument('We may monitor your activity for targeted advertising.', 'negative');
classifier.addDocument('Your personal data might be stored on overseas servers.', 'negative');
classifier.addDocument('We are allowed to retain your data indefinitely post account termination.', 'negative');
classifier.addDocument('We can distribute non-personal data for advertising and other purposes.', 'negative');
classifier.addDocument('Disputes will be resolved as per our company’s discretion.', 'negative');
classifier.addDocument('We have the authority to share your information with business partners.', 'negative');
classifier.addDocument('We reserve the right to sell your information for promotional activities.', 'negative');
classifier.addDocument('We have the freedom to amend our Terms of Service without prior information.', 'negative');
classifier.addDocument('We assume no responsibility for data loss or security infringements.', 'negative');
classifier.addDocument('Your data may be managed in regions with less stringent data protection.', 'negative');
classifier.addDocument('Your consent to use our service relinquishes your rights to legal dispute resolutions.', 'negative');
classifier.addDocument('We can cease or suspend your account without any prior information or justification.', 'negative');
classifier.addDocument('Users must be 18 years or older to access our services.', 'negative');
classifier.addDocument('We permit third-party firms to advertise and gather anonymous data.', 'negative');
classifier.addDocument('Our terms are governed by Californian law.', 'negative');
classifier.addDocument('We can terminate your account without providing a reason.', 'negative');
classifier.addDocument('We reserve the right to use content generated by users.', 'negative');
classifier.addDocument('All warranties, whether stated or implied, are disclaimed.', 'negative');
classifier.addDocument('You consent to hold us harmless from any claims or legal proceedings.', 'negative');
classifier.addDocument('We can discontinue the service without notifying you.', 'negative');
classifier.addDocument('We have the right to use your data for decision-making and profiling.', 'negative');
// ... add more examples
classifier.train();

module.exports = classifier;