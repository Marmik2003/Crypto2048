var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);
var RemixContractg = new ethers.Contract( cntradd , abi , provider);

walletaddress = ""
const data2= {}
var mainstore = window.localStorage;
mainstore.setItem("wltaddr","0");

//key = 0 to check if loggedin or not

var count = 1;
var getcount = 0;

function pay(){
  console.log("Paying");
  let tx = {
    to: String(portiswltaddr),
    // ... or supports ENS names
    // to: "ricmoo.firefly.eth",

    // We must pass in the amount as wei (1 ether = 1e18 wei), so we
    // use this convenience function to convert ether to wei.
    value: ethers.utils.parseEther('0.005')
};

let sendPromise = walletPrivateKey.sendTransaction(tx);

sendPromise.then((tx) => {
    console.log(tx);
    tx.wait();
    
    
    console.log(tx);
    // {
    //    // All transaction fields will be present
    //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
    //    "from", "hash", "r", "s", "v"
    // }
});
}

setInterval(function(){ 
  //var gamevarstate = data2["gameState"].replace(/"/g, "*");
  var gamevarstate =  data2["gameState"].replace(/"/g, "@");
  //console.log(gamevarstate);
  //console.log("Testing: "+JSON.stringify(gamevarstate));
  if(count!=1){
    $.ajax({
      type: 'GET',
      //async: false,
      url: "https://cryptonj.herokuapp.com/getcnt/",
      data: {"wltaddr" : String(mainstore.getItem("wltaddr"))},
      
      success:  function(data){
        counter = Number(data);
        if(parseInt(Number(data2['bestScore'])/2048)==1){
          if(counter==0){
            pay();
            alert("Kudos! You scored more than 2048 points, Kindly check your portis wallet. ");
            portis.showPortis();
            $.ajax({
              type: "POST",   
              url: "https://cryptonj.herokuapp.com/setcnt/",
              data: {"counter" : 1,
                      "wltaddr" : String(mainstore.getItem("wltaddr"))},
              //async:false,
              success: function(){
                //console.log("Success POST")
              },
              error: function(){
               // console.log("POST failed")
              }
              });

          }
          
        }
        else if(parseInt(Number(data2['bestScore'])/4096)==1){
          if(counter==1){
            pay();
            alert("Kudos! You scored more than 4096 points, Kindly check your portis wallet. ");
            portis.showPortis();
            $.ajax({
              type: "POST",   
              url: "https://cryptonj.herokuapp.com/setcnt/",
              data: {"counter" : 2,
                      "wltaddr" : String(mainstore.getItem("wltaddr"))},
              async:false,
              success: function(){
                //console.log("Success POST")
              },
              error: function(){
               // console.log("POST failed")
              }
              });

          }
          
        }

      }
          
        });
  }


  if(count==2 || count==1){
    

    $.ajax({
      type: "POST",   
      url: "https://cryptonj.herokuapp.com/setitem/",
      data: {"gameState" : JSON.stringify(gamevarstate),
              "wltaddr" : String(mainstore.getItem("wltaddr"))},
      async:false,
      success: function(){
        //console.log("Success POST")
      },
      error: function(){
       // console.log("POST failed")
      }
      });
  }
  else {
    $.ajax({
      type: "POST",  
      url: "https://cryptonj.herokuapp.com/setitem/",
      data: {"gameState" : JSON.stringify(gamevarstate),
              "wltaddr" : String(mainstore.getItem("wltaddr"))},
      success: function(){
      //  console.log("Success POST")
      },
      error: function(){
       // console.log("POST failed")
      }
      });
    }
    if(count<=2){
      count=count+1
    }
    
}, 4000);


  

//to send to sqlite left

//etimer = gamestate
//ltime = getBestScore //on blockchain

window.fakeStorage = {
  

  //if else according to ids .... i.e from sqlite or blockchain
//position
  setItem: function (id, val) {
    //  console.log("setting some value: "+String(val)+" with id:"+String(id));
      data2[String(id)] = String(val)
     // console.log("After setting"+data2[String(id)]+" "+String(id));
      return data2[String(id)] = String(val);
    
  },
 

  
  //best score fetching
  getItem: function (id) {
    if(String(id)=="gameState"){
     // console.log(mainstore.getItem("wltaddr"));
        $.ajax({
          type: 'GET',
          async: false,
          url: "https://cryptonj.herokuapp.com/getitem/",
          data: {"wltaddr" : String(mainstore.getItem("wltaddr"))},
          
          success:  function(data){
            if(String(data)!="NoUser"){
              console.log(String(data))
              gamevarstate = String(data).replace(/@/g, '"');
            
             data2[id] = String(gamevarstate.slice(1,-1));
            
            }
            else{
              data2[id] = null;
            }
            
           // console.log("getting some value: "+data2[id]+" with id:"+String(id) );
   
            }
            });

            return data2[id]
    }
    else if (String(id)=="bestScore") {
      if (getcount === 0) {
        //var wltaddr = String(mainstore.getItem("wltaddr"));
        callscorectr(portiswltaddr);
          async function callscorectr(portiswltaddr){
            try{
              let c = await RemixContract.getBest(portiswltaddr);
              //console.log("baher C: "+c);
                
                 // console.log("aat   C: "+c);
                data2["bestScore"] = parseInt(c._hex);
                getcount = 1;
              
            }
            catch(err){
              console.log(err);
            }
          
          }
        }
        return data2[id]
      }

    else {
    
      return data2.hasOwnProperty(id) ? data2[id] : undefined;
    }
    
  },

  removeItem: function (id) {
    //alert(id);
    $.ajax({
      type: 'GET',
      async: false,
      url: "https://cryptonj.herokuapp.com/removeitem/",
      data: {"wltaddr" : String(mainstore.getItem("wltaddr"))},
      
      success:  function(data){
     //   console.log("Deleted game state");
        }
        });
    return delete data2[id];
  },

  clear: function () {
    return data2 = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey     = "bestScore";
  this.gameStateKey     = "gameState";

  //var supported = this.localStorageSupported();
  this.storage = window.fakeStorage; //supported ? window.localStorage : 
}

/*LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};
*/

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  //alert("state: "+stateJSON);
  
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};

