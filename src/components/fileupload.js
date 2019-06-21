import React, { Component } from 'react';
import ky from 'ky';
import {Button} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';




  function parseTags(data) {
    console.log(typeof data[0].name);
    var tagsArr = data.map(function(currentValue){
        return currentValue.name;
    });
  
    return tagsArr;
}

class FileUpload extends Component {

    state = {
        tags: [],
        message: '',
        img: ""
      }

     

      recognizeImg = async (base64_img) =>{
         const json = await ky.post('http://localhost:5000/examineImage', {json: {imageRequested: base64_img} }).json();  //{json: {imageRequested: "base64_img"}
         console.log(json);
         const tags = parseTags(json);
         this.setState({tags});
         
       }



    handleUploadFile = (event) => {
    

        // console.log(event.target.files[0].type)
        // console.log(event.target.files[0])
        var file =event.target.files[0];
        var reader  = new FileReader();
        
        reader.addEventListener("load", function () {
            this.setState({img: reader.result});
            this.setState({tags: []});
            console.log(reader.result);
            this.recognizeImg(reader.result);
        }.bind(this), false);
        
        if (file) {
            reader.readAsDataURL(file);
        }

    
    }

 renderTags() {
    if (this.state.tags.length > 0){
        const items = this.state.tags.map(function(currentValue){
        return  <Chip label={currentValue} color="primary" variant="outlined" style={{ margin: '4px'}} />;
        });
    
        return items;
    } 
    
    return ;
    
 }

    render() { return(
        <div>
            <input id="button-file" style={{ display: 'none' }} type="file" accept="image/jpeg" onChange={this.handleUploadFile} /> 
            <label htmlFor="button-file">
                <Button variant="contained"  color="secondary" component="span" style={{marginTop: 30}} >
                Upload image
                </Button>
            </label> 
            <hr/>
            <img style={{width: 200}}  src={this.state.img} />
            {this.renderTags()}
           
        
        </div>
        ); 
    }


}

 export default FileUpload;