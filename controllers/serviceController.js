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

    return {
      entities: result.entities,
      sentimentResult: sentimentResult,
      summaryResult: summaryResult,
    };
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw new Error('Failed to analyze text');
  }
}
