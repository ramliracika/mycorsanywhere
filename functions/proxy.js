const fetch = require('node-fetch');

exports.handler = async (event) => {
  const targetUrl = event.queryStringParameters.url;
  
  if (!targetUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Parameter 'url' diperlukan" })
    };
  }

  try {
    new URL(targetUrl); 
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "URL tidak valid" })
    };
  }

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.body
    });

    return {
      statusCode: response.status,
      body: await response.text(),
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
