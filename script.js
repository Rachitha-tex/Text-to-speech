//Init SpeechSynth API
const synth=window.speechSynthesis;

//DOM Element
const textForm=document.querySelector("form");
const textInput=document.querySelector("#text-input");
const voiceSelect=document.querySelector("#voice-select");
const rate=document.querySelector("#rate");
const rateValue=document.querySelector("#rate-value");
const pitch=document.querySelector("#pitch");
const pitchValue=document.querySelector("#pitch-value");
const body=document.querySelector('body');

//Init voice array

let voices=[];

const getVoice=()=>{
    voices=synth.getVoices();
   
    //loop through voices and create an option for each one
    voices.forEach(voices=>{
        const option=document.createElement('option');
        //fill option withn voice language
        option.textContent=voices.name+'('+voices.lang+')';
        //set needed option attributes
        option.setAttribute('data-lang',voices.lang);
        option.setAttribute('data-name',voices.name);
        voiceSelect.appendChild(option);
    })
}
getVoice();
if(synth.onvoiceschanged !==undefined){
    synth.onvoiceschanged=getVoice;
}

//speak
const speak=()=>{

    //check if speaking
    if(synth.speaking){
        console.log('Already speaking');
        return;
    }
    if(textInput.value !==''){
          //add background animation
        body.style.background='#141414 url(/img/wave.gif)';
        body.style.backgroundRepeat='repeat-x';
        body.style.backgroundSize='100% 100%';        
        //get speak text
        const speakText=new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend=e=>{
            console.log('Done speaking...');
            body.style.background='#141414';
        }
        //speak error
        speakText.onerror=e=>{
            console.log('Something went wrong...');
        }
        //selected voice
        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices
        voices.forEach(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice=voice;
            }
        });

        //set pitch and rate
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

     //speak
     synth.speak(speakText);
    }
}


//EVENT LISTNERS

//text form submit
textForm.addEventListener('submit',e=>{
   e.preventDefault();
   speak();
   textInput.blur();
});

//Rate value change
rate.addEventListener('change',e=>rateValue.textContent=rate.value);

//Pitch value change
pitch.addEventListener('change',e=>pitchValue.textContent=pitch.value);

//voice select change
voiceSelect.addEventListener('change',e=>speak());