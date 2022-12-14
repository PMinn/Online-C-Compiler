document.getElementById('textarea').value = `#include<iostream>
using namespace std;
int main(){
    cout<<"hello world"<<endl;
}`;

function upload() {
    const formData = new FormData()
    formData.append('code', document.getElementById('textarea').value)
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

function compile(filename) {
    const formData = new FormData()
    formData.append('filename', filename)
    return fetch('https://Online-C-Compiler.panalan.repl.co/compile', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                document.getElementById('bar').style.transform = 'scaleX(0.666)';
                return filename;
            } else {
                return Promise.reject({
                    reason: '編譯失敗',
                    error: response.error
                });
            }
        })
}

function run(filename) {
    const formData = new FormData()
    formData.append('filename', filename)
    fetch('https://Online-C-Compiler.panalan.repl.co/run', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(response => {
            if (response.returncode != 0) {
                return Promise.reject({
                    reason: '執行失敗',
                    error: response.error
                });
            } else {
                document.getElementById('bar').style.transform = 'scaleX(1)';
                setTimeout(() => {
                    document.getElementById('bar').style.transform = 'scaleX(0)';
                }, 3000);
                document.getElementById('result').style.color = '#fff';
                document.getElementById('result').value = response.result;
                console.log(response);
            }

        })
}

function exe() {
    upload()
        .then(compile)
        .then(run)
        .catch(err => {
            document.getElementById('result').style.color = 'red';
            document.getElementById('result').value = err.reason + '\n\n' + err.error;
        })
}