import * as child from 'child_process';

export default function handler(req, res) {
    const { pid, cid } = req.query;
    var p = child.exec('dir', (error, stdout, stderr) => {
        res.end(stdout)
    });
}