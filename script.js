function $(e){return document.getElementById(e)}
function wait(timeout, fn){
    let seconds = parseFloat(timeout);
    if (timeout.endsWith('s')) {
        seconds = parseFloat(timeout.slice(0, -1));
    }
    let milliseconds = seconds * 1000;
    console.log(milliseconds)
    setTimeout(fn, milliseconds); // Pass fn without invoking it
}
let tmp = [];
let chapters = [];
let currentChapter=1;
if (localStorage.getItem('currChapter')!==null&&localStorage.getItem('currChapter')!==undefined){
    currentChapter=Math.floor(localStorage.getItem('currChapter'))
    console.log('not null');
} else {
    console.log('null or undefined');
    localStorage.setItem('currChapter', 1)
    currentChapter=1;
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
        chapters.splice(0,1)
        tmp=null
        $('noContent').classList.add('hidden');
        $('content').innerHTML = chapters[currentChapter-1];
    })
}
function next(){
    if (currentChapter<chapters.length){
        currentChapter++;
        localStorage.setItem('currChapter', currentChapter)
        $('content').innerHTML = chapters[currentChapter-1];
        $('reader').scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    } else{
        $('reader').scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
}
function prev(){
    if (currentChapter>1){
        currentChapter--;
        localStorage.setItem('currChapter', currentChapter)
        $('content').innerHTML = chapters[currentChapter-1];
        $('reader').scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    } else{
        $('reader').scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
}
window.onload=()=>load()