import * as child from 'child_process';

export default function handler(req, res) {
    // const { cmd } = req.query;
    var p = child.exec("g++", (error, stdout, stderr) => {
        if (error) {
            res.status(400).end(error.toString())
        } else if (stderr) {
            res.status(400).end(stderr.toString())
        } else {
            res.end("stdout:\n"+stdout)
        }
    });
}