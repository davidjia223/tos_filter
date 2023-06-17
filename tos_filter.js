const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));

function extractSections(text, keywords) {
  const doc = nlp(text);
  const sentences = doc.sentences().out('array');

  const relevantSentences = sentences.filter(sentence =>
    keywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()))
  );

  return relevantSentences.join(' ');
}

const tosText = `
This is your temrs of service text. Should include information such as "data use", "privacy", "disputes", or "cancellations".
`; // Replace with your actual Terms of Service text.

const keywords = ['data use', 'privacy', 'disputes', 'cancellations'];

const extractedText = extractSections(tosText, keywords);

console.log('Final Extracted Text:');
console.log(extractedText);
