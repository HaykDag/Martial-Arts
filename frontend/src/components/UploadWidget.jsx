import {useEffect,useRef} from 'react'


const UploadWidget = ({URL})=>{

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  
  async function saveUrl(url){
    await fetch(URL,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:'Yerevan',photo:url})
    })
  }

  useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName:'furnitureappimages',//change this with yours
      uploadPreset: 'segebppr', //change this with yours
      cropping:true,
      multiple: true,
    },(err,result)=>{
      if(err){
        console.log(err) //set the error State and show on the page
        return
      }
      if(!err && result && result.event === "success"){
        const url = result.info.secure_url;
        //const thumbUrl = result.info.thumbnail_url;
        //if success we will make a fetch request to the our server to store the url
        saveUrl(url);
      }
    })
  },[]);

  return(
    <button onClick={()=>widgetRef.current.open()}>Upload</button>
  )
}

export default UploadWidget;