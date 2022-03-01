import withAuth from "../utils/protectRoute";
import {useState} from 'react';
import storage from '../utils/firebaseUpload';

function ImageUploadTest() {
    const [image , setImage] = useState('');
    const [Url, setUrl] = useState('');

const upload = async ()=>{
   if (image == null)
      return;
    setUrl("Getting Download Link...")
  
    // Sending File to Firebase Storage
    storage.ref(`/images/${image.name}`).put(image)
      .on("state_changed", alert("success"), alert, () => {
  
        // Getting Download Link
        storage.ref("images").child(image.name).getDownloadURL()
          .then((url) => {
            setUrl(url);
          })
      });
}
    return (
        <div className="App">
        <center>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
        <button onClick={upload}>Upload</button>
        <br />
        <p><a href={Url}>{Url}</a></p>
        </center>
        </div>
    );
    }
    
export default withAuth(ImageUploadTest);
    