const natural = require('natural');
const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));

const classifier = new natural.BayesClassifier();

//Train the classifier; 'positive' means harmless, 'negative' means its suspicious
classifier.addDocument('we use your data to improve our services', 'positive');
classifier.addDocument('we share your data with third parties', 'negative');
// ... add more examples
classifier.train();

function extractSections(text, keywords) {
  const doc = nlp(text);
  const sentences = doc.sentences().out('array');

  const relevantSentences = sentences.filter(sentence =>
    keywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()))
  );

  return relevantSentences.join(' ');
}

const tosText = `
This is your terms of service text. It should include information such as "data use", "privacy", "disputes", or "cancellations".
`; // Replace with your actual Terms of Service text.

const keywords = ['data use', 'privacy', 'disputes', 'cancellations'];

const extractedText = extractSections(tosText, keywords);

console.log('Final Extracted Text:');
console.log(extractedText);
