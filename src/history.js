import React from 'react';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Nav from './components/nav';
import {
  Card,
  CardContent
} from '@material-ui/core';
import ky from 'ky';



function parseHistory(data) {
  let histArr = data.map(function (currentValue, index) {
    let tagsArr = currentValue.concepts.map(function (currentVal, indx) {
      return currentVal.name;
    });
    var historyItem = {
      imgbase64: currentValue.imgbase64,
      tags: tagsArr
    };
    return historyItem;
  });

  return histArr;
}


class History extends React.Component {
  state = {
    history: []
  }


  async componentDidMount() {

    const json = await ky.get('http://localhost:5000/history').json();;
    // console.log("received json:")
    // console.log(json);
    const history = parseHistory(json);
    this.setState({
      history
    });

  }


  renderHistory() {
    if (this.state.history.length > 0){
        
        const historyImages = this.state.history.map(function(currentValue){
            return (
            
            <Card  style={{marginBottom: "15px"}}>
            <CardContent>
            <img style={{width: 200}}  src={currentValue.imgbase64} />
            
            <Typography component="p">
              {currentValue.tags.map(function(currentVal){
                  return  <Chip label={currentVal} color="primary" variant="outlined" style={{ margin: '4px'}} />;
                  })
              }
              </Typography>
            </CardContent>
 
            
            </Card>
            
            )
        });
        
        return historyImages;
    } 
    
    return ;  
  }


  render() { return (
    <div>
      <Nav />
      <Typography variant="h3" color="secondary">
          Recognition history:
      </Typography>
      <div style={{marginTop: '10px'}}>
      {this.renderHistory()}
      </div>
      
    </div>
  )}


}
export default History;