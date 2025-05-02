const fetch = require('node-fetch');

exports.handler = async (event) => {
  const targetUrl = decodeURIComponent(event.path.replace(/^\//, ''));
  
  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': event.headers.authorization || ''
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
