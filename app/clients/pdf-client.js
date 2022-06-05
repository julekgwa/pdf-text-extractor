import pdf from 'pdf-parse';

export const extractTextFromPdf = async (file) => {

  const result = await pdf(file);

  return result.text;

};
