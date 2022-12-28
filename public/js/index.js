document.getElementById('textarea').value = `#include<iostream>
using namespace std;
int main(){
    cout<<"hello world"<<endl;
}`;

document.getElementById('play').addEventListener('click', run);

function c_upload() {
    const formData = new FormData();
    formData.append('code', document.getElementById('textarea').value);
    return fetch('https://Online-C-Compiler.panalan.repl.co/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(response => {
            document.getElementById('bar').style.transform = 'scaleX(0.333)';
            return response.filename;
        })
}

function c_compile(filename) {
    const formData = new FormData();
    formData.append('filename', filename);
    return fetch('https://Online-C-Compiler.panalan.repl.co/compile', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(response => {
            if (!response.success) return Promise.reject({ reason: '編譯失敗', error: response.error });
            document.getElementById('bar').style.transform = 'scaleX(0.666)';
            return filename;
        })
}

function c_execute(filename) {
    const formData = new FormData();
    formData.append('filename', filename);
    formData.append('input', document.getElementById('inputTextarea').value);
    return fetch('https://Online-C-Compiler.panalan.repl.co/execute', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(response => {
            if (response.returncode != 0) return Promise.reject({ reason: '執行失敗', error: response.error });
            document.getElementById('bar').style.transform = 'scaleX(1)';
            setTimeout(() => {
                document.getElementById('bar').style.transform = 'scaleX(0)';
            }, 3000);
            document.getElementById('result').style.color = '#fff';
            document.getElementById('result').value = response.result;
            document.getElementById('spend').innerText = response.spend;
            console.log(response);
        })
}

function run() {
    document.getElementById('play').style.opacity = '0';
    c_upload()
        .then(c_compile)
        .then(c_execute)
        .catch(err => {
            document.getElementById('result').style.color = 'red';
            document.getElementById('result').value = err.reason + '\n\n' + err.error;
            document.getElementById('spend').innerText = '';
        })
        .finally(() => {
            document.getElementById('play').style.opacity = '1';
        })
}


fetch('/api/compiler?cmd=g++')
    .then(response => response.text())
    .then(response => {
        console.log(response)
    })