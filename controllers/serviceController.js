const { LanguageServiceClient } = require('@google-cloud/language');
const client = new LanguageServiceClient();

exports.analyzeText = async function(text) {
  try {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const result = await client.analyzeEntities({ document: document });
    const sentimentResult = await client.analyzeSentiment({ document: document });
    const summaryResult = await client.analyzeSyntax({ document: document });
   
    const { pipeline } = await import('@xenova/transformers');
    const pipe = await pipeline('summarization');
    const summary = await pipe(text, { min_length: Math.floor(0.01 * text.length), max_length: Math.floor(0.1 * text.length) });

    return {
      entities: result,
      sentimentResult: sentimentResult,
      summaryResult: summaryResult,
      summary: summary,
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw new Error('Failed to analyze text');
  }
}
