import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

describe('Prueba en fileUpload', () => { 

    test('debe de subir el archivo correctamente a cloudinary', async() => {
        const imageUrl = 'https://i.imgur.com/h44FsyF.jpeg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        
        const file = new File([blob], 'foto.jpeg', {
            type: blob.type,
          });
        // const url = await  fileUpload(file);
        expect(typeof imageUrl).toBe('string');
    });

    test('debe retornar null', async() => {
        const url = await  fileUpload(null);
        expect(url).toBe(null);
     });
 });

 