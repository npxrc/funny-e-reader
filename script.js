function $(e){return document.getElementById(e)}
let tmp = [];
let chapters = [];
let currentChapter=1;
if (localStorage.getItem('currChapter')!==null&&localStorage.getItem('currChapter')!==undefined){
    currentChapter=Math.floor(localStorage.getItem('currChapter'))
} else {
    localStorage.setItem('currChapter', 1)
}
function loadChapter(){
    localStorage.setItem('currChapter', currentChapter)
    if (currentChapter==chapters.length){
        $('content').innerHTML = `${chapters[currentChapter-1]}<h3>End of Selection</h3>`;
    } else{
        $('content').innerHTML = `${chapters[currentChapter-1]}<h3>End of Chapter ${currentChapter}</h3>`;
    }
    $('content').querySelector('h3').innerHTML+=` ${currentChapter}`
}
function load(){
    fetch(`TKAM.txt`).then(response => response.text()).then(data => {
        data=data.split('å');
        console.log(data.length)
        tmp.push(data)
        for (let i=0;i<tmp.length;i++){
            chapters.push(tmp[i])
        }
        chapters=chapters[0]
        chapters.splice(0, 1)
        $('noContent').classList.add('hidden');
        loadChapter()
    })
}
load()
function next(top){
    if (currentChapter<chapters.length){
        currentChapter++;
        loadChapter()
        $('reader').scroll({top: 0, left: 0, behavior: "smooth"});
    } else{
        $('reader').scroll({top: 9999999, left: 0, behavior: "smooth"});
    }
}
function prev(top){
    if (currentChapter>1){
        currentChapter--;
        loadChapter()
        if (top=="top"){
            $('reader').scroll({top: 999999, left: 0, behavior: "smooth"});
        } else {
            $('reader').scroll({top: 999999, left: 0, behavior: "instant"});
        }
    } else{
        $('reader').scroll({top: 0, left: 0, behavior: "smooth"});
    }
}
let speech;
let text;
function readAloud(){
    $('readAloud').classList.add('speaking');
    text = $('content').innerText;
    speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech)
    console.log(speech.voice)
    $('readAloud').onclick=()=>{
        stopReadAloud()
    }
    $('readAloud').innerHTML='Cancel'
}
function stopReadAloud(){
    $('readAloud').classList.remove('speaking');
    window.speechSynthesis.cancel()
    $('readAloud').onclick=()=>{
        readAloud()
    }
    $('readAloud').innerHTML='Read Aloud'
}