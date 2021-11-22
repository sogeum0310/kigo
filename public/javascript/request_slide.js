
  
  
  var prevall = document.querySelectorAll(".prev");
        
  var prevallLength = prevall.length;
 
  for(var i=0; i < prevallLength; i++){
    prevall[i].addEventListener('click', function (e) {
      e.preventDefault()
      num += 100
      container.style.transform = `translateX(${num}%)`

    
      document.getElementById('demo').textContent = Math.floor(- num / groups.length + x) ;
    
      document.getElementById('demo_bar').style.width = Math.floor(- num / groups.length + x) + "%" ;

      window.scrollTo(0,0);
    })
    
  }

  var nextall = document.querySelectorAll(".next");

  var nextallLength = nextall.length;

  for(var i=0; i < nextallLength; i++){
    nextall[i].addEventListener('click', function (e) {
      e.preventDefault()
    
      num -= 100
      container.style.transform = `translateX(${num}%)`
    
    
      document.getElementById('demo').textContent = Math.floor(- num / groups.length + x) ;
    
      
      document.getElementById('demo_bar').style.width = Math.floor(- num / groups.length + x) + "%" ;

      window.scrollTo(0,0);
    })
  }


