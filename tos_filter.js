const nlp = require('compromise');

function extractSections(text, keywords) {
    let doc = nlp(text);
    let sentences = doc.sentences().out('array'); // breaking the text into sentences

    // Debug: print all extracted sentences
    console.log("All extracted sentences:");
    console.log(sentences);
    console.log("-----------------------------");

    let relevantSentences = sentences.filter(sentence => {
        let lowerCaseSentence = sentence.toLowerCase();
        for (let keyword of keywords) {
            if (lowerCaseSentence.includes(keyword)) {
                return true;
            }
        }
        return false;
    });

    // Debug: print relevant sentences
    console.log("Relevant sentences:");
    console.log(relevantSentences);
    console.log("-----------------------------");

    return relevantSentences.join(' ');
}

let tosText = `These Terms of Use constitute an agreement between you, Samsung, and OSL (solely as it relates to section 11 of these Terms of Use) regarding your access and use of the Website, all conte
nt, products and services available on or through the Website and your purchase of any products or service or placement of any order through the Website. In addition, by agreeing to these Terms of Use, you are also agreeing to th
e collection of personal information through the Website in accordance with these Terms of Use and our Privacy Policy available at https://www.samsung.com/ca/info/privacy/. The products and services advertised, listed or describe
d on the Website are invitations to you to make offers to Samsung or OSL, as applicable, to purchase such products or services, and are not offers to sell products or services to you. You are deemed to make an offer to Samsung or
 OSL, as applicable, to purchase the products or services referenced in your order upon submitting an order to us via the online checkout process. 2. CONDITIONS OF USE By using the Website, and each time you use the Website, you 
are accepting and agreeing to be bound by these Terms of Use on your own behalf or, as applicable, on behalf of the party or parties on whose behalf you are using the Website. If you do not agree with these terms, then you may no
t use or visit the Website. tttt`;  // Replace with your ToS text.
let keywords = ['data use', 'privacy', 'disputes', 'cancellations'];  
let extractedText = extractSections(tosText, keywords);

console.log("Final Extracted Text:");
console.log(extractedText);
