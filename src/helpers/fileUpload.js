export const fileUpload = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'react-journal-app');


    const resp = await fetch(url, {
        method: "POST",
        body: formData
    });

    if (!resp.ok) throw new Error('No se pudo subir la imagen');
    console.log("resp ", resp);
    return resp.json();
}
