const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),  
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;



// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data (result, word));
}

searchInput.addEventListener("keypress", e =>{
  if (e.key === "Enter" && e.target.value){
    fetchApi(e.target.value);
  }  
});

function data (result, word){
  
  if (result.title){
    infoText.innerHTML = `Cannot find meaning of <span>"${word}"</span>.Please try to find meaning of another word`;
  }else
  {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
     phonetics =  result[0].phonetics[0].text;

     document.querySelector (".word p").innerHTML = result[0].word;
     document.querySelector(".word span").innerHTML = phonetics;
     document.querySelector(".meaning span").innerHTML = definitions.definition;
     document.querySelector(".example span").innerHTML = definitions.example ?? 'no examples here';
     
     
      audio = new Audio(result[0].phonetics[0].audio);
     document.querySelector(".synonym span").innerHTML = result[0].meanings[0].synonyms ?? 'no synonyms here';
   }
  }
  volume.addEventListener("click",()=> {
    audio.play();
   });
  
  removeIcon.addEventListener("click" ,()=>{
    searchInput.value = "";
    searchInput.focus() ;
    wrapper.classList.remove("active");
    infoText.innerHTML='Type any existing word and press enter to get meaning, example,synonyms, etc.';
  });