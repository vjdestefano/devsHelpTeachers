
import API from "../utilities/API";
import Velocity from "velocity-animate";

export default {

  



  animElement(element){

    
    Velocity(element, { 
     opacity:0 ,
     width:  [ "100px", [ 1120, 5 ] ],
     height: 35,
     color: "#ff0000",
    
     },{
       duration: 500,
       display: "none",
       easing: "ease-out",
    });
   
  },
  
  hideElement(element){
    Velocity(element, {
      opacity:0
    },
    {
      duration: 500,
      display: 'none',
    })
  },
  


  saveToUser(username, linkId){

    API.saveTo({username: username, id: linkId}).then(res =>{
     
    })
  },

  async checkIfVoted(username, id){

  
    let linkId = id;
  
    const res = await API.getUser({ username: username });
    let savedHelpers = res.data.savedHelpers;
    let searchHelper = savedHelpers.includes(id);
    if (searchHelper) {
      return true;
    }
    else {
      this.saveToUser(res.data.username, linkId);
      return false;
    }
  },
  



  async upvote(id, index, username, articles) {
  
    const upvoted = articles.find(article => (article._id === id));
  
    let isVoted = await this.checkIfVoted(username, upvoted._id);
  
    if(isVoted === false){
  
      let grabScore = upvoted.points;
      grabScore++;
  
      let element = document.getElementById(`upSpan-${index}`);
      let otherElement = document.getElementById(`downSpan-${index}`);
  
      this.animElement(element);
      this.hideElement(otherElement);
     
      API.votePositive({
        _id: upvoted._id,
        title: upvoted.title,
        link: upvoted.link,
        points: grabScore,
      })
      .then(async res => {
        let tag = res.data.tag;
      
       console.log(tag);
        
        return tag;
      }
      )
      .catch(err => console.log(err));
    } else {
    
    }
  },
  

  async downvote (id, index, username, articles) {
    let tag;
    const downVoted = articles.find(article => (article._id === id));
    
    let isVoted = await this.checkIfVoted(username, downVoted._id);
  
    if(isVoted === false){
  
      let grabScore = downVoted.points;
      grabScore--;
  
      let element = document.getElementById(`downSpan-${index}`);
      let otherElement =  document.getElementById(`upSpan-${index}`);
  
      this.animElement(element);
      this.hideElement(otherElement);
     
      API.votePositive({
        _id: downVoted._id,
        title: downVoted.title,
        link: downVoted.link,
        points: grabScore,
      })
      .then (res => {
        tag = res.data.tag;
        console.log(tag);
        return tag;
      }
      )
      .catch(err => console.log(err));
    } else {
     
    }
    
  },
  
  //  async loadLinks(dataType){

  //   if(dataType == "Literacy"){
  //     API.literacyLinks().then( res => {
  //       let data = res.data;
  //       let newArray = [data];
  //       console.log(newArray);
  //       return newArray;
  //     })
  //     .catch(err => console.log(err))
  //   }
  //   if(dataType == "Math"){
  //     API.mathLinks().then(res => {
  
  //       return({
  //         articles: res.data,
  //         dataType: res.data[0].tag
  //       })
  //     })
  //     .catch(err => console.log(err))
  //   }


  // },


}

