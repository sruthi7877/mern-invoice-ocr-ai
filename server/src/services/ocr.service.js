import axios from 'axios';

export async function ocrSpaceParse(base64Data, isPdf) {
  const url = 'https://api.ocr.space/parse/image';
  const payload = new URLSearchParams();
  payload.append('base64Image', `data:${isPdf ? 'application/pdf' : 'image/jpeg'};base64,${base64Data}`);
  payload.append('isTable', 'true');
  payload.append('OCREngine', '2'); // better engine
  payload.append('scale', 'true');
  payload.append('detectOrientation', 'true');

  const headers = {
    apikey: process.env.OCR_SPACE_API_KEY,
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const { data } = await axios.post(url, payload, { headers, timeout: 60000 });
  // Structure: data.ParsedResults[0].ParsedText
  const parsedText = data?.ParsedResults?.[0]?.ParsedText || '';
  return { raw: data, text: parsedText };
}