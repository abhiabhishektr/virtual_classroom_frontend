const uploadImage = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'UMSphotos');
      data.append('cloud_name', 'dvndcfcmp');

      fetch("https://api.cloudinary.com/v1_1/dvndcfcmp/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data.url.toString());
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };

  export default uploadImage