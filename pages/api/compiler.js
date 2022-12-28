import * as child from 'child_process';

export default function handler(req, res) {
    const { pid, cid } = req.query;
    var p = child.exec('dir', (error, stdout, stderr) => {
        console.log(stdout);
    });
    res.end(`Comment #${cid} for post #${pid}`)
}