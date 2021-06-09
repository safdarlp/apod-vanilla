//jquery-apod program to 


var apod = {
 
    //Create a random date
    randomDate: function(start, end) {
      //Randomize the date https://gist.github.com/miguelmota/5b67e03845d840c949c4
      let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

      //Format the date
      let d = date.getDate();
      let m = date.getMonth() + 1; //In JS months start at 0
      let y = date.getFullYear();

      //Change the month and day strings so that they match the documented format.
      if(m < 10){
        m = '0'+m
      }

      if(d < 10){
        d = '0'+d
      }

      return `${y}-${m}-${d}`;
    },
    
    // Application Constructor
    //Injects the results of the API call into the DOM
    buildDOM: function(result) {
    //jQuery
    //$("#apodTitle").text(result.title);
    document.querySelector('#apodTitle').innerHTML = result.title;
  
    if(result.media_type === 'video') {
      //jquery
      // $("#apodImage").hide();
      // $("#apodVideo > iframe").attr("src", result.url).show();
      document.querySelector('#apodImg').style.display='none';
      let avi = document.querySelector('#apodVideo > iframe');
      avi.src=result.url;
      document.querySelector('#apodVideo').style.display='block';

    }else{
      //jQuery
      // $("#apodVideo").hide();
      // $("#apodImg").attr("src", result.url).attr('alt', result.title).show();
      document.querySelector('#apodVideo').style.display='none';
      let ai = document.querySelector('#apodImg');
      ai.src=result.url;
      ai.style.display='block';
    }
    //jquery
    // $("#apodCopyright").text("Copyright: " + result.copyright);
    // $("#apodDate").text("Date: " + result.date);
    // $("#apodDesc").text(result.explanation);
    if(result.copyright!=undefined){
      document.querySelector('#apodCopyright').innerHTML = 'Copyright: ' + result.copyright;
    }
    document.querySelector('#apodDate').innerHTML = 'Date: ' + result.date;
    document.querySelector('#apodDesc').innerHTML = result.explanation;
  },

  //Executes an AJAX call to an API.
  getRequest: function() {
    let _this = this;
    let date = this.randomDate(new Date(1995, 5, 16), new Date());
    let key = 'b08svYkucjwzmFnEeLqjOBZjYyWjc5T8UCmfwMmx';
    var url = 'https://api.nasa.gov/planetary/apod?api_key=${key}&date=' + date;
    
    //jQuery
    // $.ajax({
    //     url: url
    // }).done(function(result){
    //     _this.buildDOM(result);
    // }).fail(function(result){
    //   console.log(result);
    // });

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
      let result = JSON.parse(xhr.response);

      _this.buildDOM(result);
    }

  },
  
  // Initialization method.
  init: function() {
    this.getRequest();
  },
};
  
  apod.init();

  document.querySelector('#btnRandApod').addEventListener('click', function(){
    apod.getRequest();
  });

  /* https://learn.jquery.com/using-jquery-core/document-ready/ */
  // $(function() {
  //     $('#btnRandApod').on('click',function(){
  //       apod.getRequest();
  //     });
  // });
  


