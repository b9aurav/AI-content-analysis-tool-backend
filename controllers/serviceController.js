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
    const summary = await pipe(text);

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
