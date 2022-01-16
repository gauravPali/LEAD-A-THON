const getAllMoves = (req, res, moves) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    if (moves.length) {
        res.end(JSON.stringify(moves));
    } else {
        res.end(JSON.stringify({ message: 'Moves not found,Try again.' }));
    }
}

const getMoveByCode = (req, res, moves) => {
    const code = req.url.split('/')[1];
    const result = moves.filter(move => move.code === code);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let doc = '<p>Code does not exists.</p>';
    if (result.length) {
        doc = `<h1><i>${result[0].title}</h1><p>${result[0].move}</p>`
    }
    res.end(doc);
}


module.exports = {
    getAllMoves,
    getMoveByCode
}