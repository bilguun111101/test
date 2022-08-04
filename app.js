const { initializeApp, cert, getApp } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('./storage.json');
const { v4: uuid_v4 } = require('uuid');
const http = require('http');
const { async } = require('@firebase/util');


const firebaseConfig = {
  apiKey: "AIzaSyA55p_oWvzLx8B7NFn6pGaP1kfBaYWuDXU",
  authDomain: "storage-tutorial-356f4.firebaseapp.com",
  projectId: "storage-tutorial-356f4",
  storageBucket: "storage-tutorial-356f4.appspot.com",
  messagingSenderId: "230489106386",
  appId: "1:230489106386:web:212d981100db79588f0a0b",
  measurementId: "G-3YSQ88ZNQ8"
};

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'gs://storage-tutorial-356f4.appspot.com'
})

const bucket = getStorage().bucket();
const filePath = 'natu.jpeg';
console.log('hah')

const upload = async (filePath) => {
  let uuid = uuid_v4();
  console.log(uuid)
  let data = await bucket.upload(filePath, {
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    }
  })
  let file = data[0];
  console.log(bucket.name);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`;
}

const firebaseApp = getApp();
// const storage = getStorage(firebaseApp, 'gs://storage-tutorial-356f4.appspot.com')

http.createServer(async(req, res) => {
  try {
    let url = await upload(filePath);
    console.log(url);
  } catch(err) {
    console.log(err)
  }
}).listen(8080);
console.log("http://127.0.0.1:8080/");