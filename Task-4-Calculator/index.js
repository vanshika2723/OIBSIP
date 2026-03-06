const input=document.querySelector('.inputBox')
const buttons=document.querySelectorAll('button')

let str=''
for(let i=0;i<buttons.length;i++){
    let buttonsElement=buttons?.[i];
    buttonsElement.addEventListener('click',(e)=>{
       let innerHTML=e.target.innerHTML;
       if(innerHTML ==='AC'){
        str='';
        
       }
       else if(innerHTML ==='DEL'){
        str=str.substring(0,str.length - 1);
       
       }
       else if(innerHTML === '='){
   str=eval(str)
   
       }
       else{
        str+=e.target.innerHTML

       }
    input.value=str; 
        
    })
}


