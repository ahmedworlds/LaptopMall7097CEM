
export const getLaptopDetails = async (productName) => {
  const prompt = `Please provide details about the laptop (${productName}) in the following plaintextformat exactly without explanations or any additional text using | and = separators:|brand=brand name|price=plain integer numeric price in GBP|specifications=detailed specs in numbers and letters only limited by 45 characters|rating=number between 1-5|image=direct image URL from Amazon|`;


  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': 'zAIzaSyAPghmOwXS38pAE5Xyakz3V_CjJPNFw-nA'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid AI response format');
    }

    const responseText = data.candidates[0].content.parts[0].text;
    const pairs = responseText.split('|').filter(Boolean);
    const aiResponse = {};
    
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        aiResponse[key.trim()] = value.trim();
      }
    });
    
    return {
      brand: aiResponse.brand,
      price: parseFloat(aiResponse.price),
      specifications: aiResponse.specifications,
      rating: parseFloat(aiResponse.rating),
      image: aiResponse.image
    };
  } catch {
    alert('Failed to get product details from AI. Please try again or fill in manually.');
    return null;
  }
};
