const natural = require('natural');
const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));

const classifier = new natural.BayesClassifier();

// Train the classifier; 'positive' means harmless, 'negative' means its suspicious
classifier.addDocument('we use your data to improve our services', 'positive');
classifier.addDocument('we share your data with third parties', 'negative');
// ... add more examples
classifier.train();

// Define common legal sentences
const commonLegalSentences = ['we use your data to improve our services', 'we respect your privacy'];


// Define a function to filter out common legal sentences
function filterCommonLegalSentences(sentences, commonSentences, threshold = 0.9) {
  return sentences.filter(sentence => {
    for (let i = 0; i < commonSentences.length; i++) {
      if (JaroWinklerDistance(sentence, commonSentences[i]) > threshold) {
        return false;
      }
    }
    return true;
  });
}

function extractSections(text, keywords) {
  const doc = nlp(text);
  const sentences = doc.sentences().out('array');

  // Filter out common legal sentences
  sentences = filterCommonLegalSentences(sentences, commonLegalSentences)

  const relevantSentences = sentences.filter(sentence => {

    // Check if sentence includes one of the keywords
    const hasKeyword = keywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()));
    if (!hasKeyword) {
      return false;
    }
    // Classify the sentence
    const classification = classifier.classify(sentence);
    // If the sentence includes a keyword and is classified as 'negative', then it's relevant
    return classification === 'negative';
  });

  return relevantSentences.join(' ');
}

const tosText = `
This is your terms of service text. It should include information such as "data use", "privacy", "disputes", or "cancellations".
`; // Replace with your actual Terms of Service text.

const keywords = ['data use', 'privacy', 'disputes', 'cancellations'];

const extractedText = extractSections(tosText, keywords);

console.log('Final Extracted Text:');
console.log(extractedText);
