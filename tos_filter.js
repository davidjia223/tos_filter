//tos_filter.js
const fs = require('fs');
const natural = require('natural');
const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));
const classifier = require('./trainClassifier');
const commonLegalSentences = require('./commonLegalSentences');

// Define a function to filter out common legal sentences
function filterCommonLegalSentences(sentences, commonSentences, threshold = 0.9) {
  return sentences.filter(sentence => {
    let sentenceClauses = nlp(sentence).clauses().out('array');
    for (let i = 0; i < commonSentences.length; i++) {
      let commonClauses = nlp(commonSentences[i]).clauses().out('array');
      for (let j = 0; j < sentenceClauses.length; j++) {
        if (commonClauses[j] && natural.JaroWinklerDistance(sentenceClauses[j].toLowerCase(), commonClauses[j].toLowerCase(), {ignoreCase: true}) > threshold) {
          return false;
        }
      }
    }
    return true;
  });
}

function extractSections(text, keywords) {
  const doc = nlp(text);
  let sentences = doc.sentences().out('array'); 

  // Print each sentence before filtering
  console.log('Before filtering:');
  sentences.forEach(sentence => console.log(sentence));

  // Filter out common legal sentences
  sentences = filterCommonLegalSentences(sentences, commonLegalSentences);

  const relevantSentences = sentences.filter(sentence => {
    const docSentence = nlp(sentence);
    
    // Check if sentence includes one of the keywords
    const hasKeyword = keywords.some(keyword => docSentence.has(keyword));

    // Check if the sentence does not include limiting phrases
    const isBroadStatement = !docSentence.match('only').found && !docSentence.match('limited to').found;

    // If the sentence does not include a keyword or is not a broad statement, skip it
    if (!hasKeyword || !isBroadStatement) {
      return false;
    }
    
    // Classify and Print the classification result and broad statement detection for each sentence
    const classification = classifier.classify(sentence);
    console.log(`\nClassification of "${sentence}": ${classification}`);
    if (isBroadStatement) {
      console.log(`Broad statement detected: "${sentence}"`);
    }

    // If the sentence includes a keyword, is a broad statement, and is classified as 'negative', then it's relevant
    return classification === 'negative';
  });

  return relevantSentences.join(' ');
}

// Load Terms of Service text from a local file
const tosText = fs.readFileSync('./tos.txt', 'utf8');

const keywords = ['data use', 'privacy', 'disputes', 'cancellations'];

const extractedText = extractSections(tosText, keywords);

console.log('Final Extracted Text:');
console.log(extractedText);