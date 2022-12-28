import os from 'os';

export default function (req, res) {
    res.json({
        type: os.type(),
        release: os.release(),
        platform: os.platform()
    })
}