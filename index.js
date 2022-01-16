const http = require('http');
const axios = require('axios');
const cheerio = require('cheerio');
const moves = [];
const { getAllMoves, getMoveByCode } = require('./controllers/move');

// Scrapping of Data and storing it 
const getChesssOpeningMoves = async () => {
    try {
        const result = await axios.get('https://www.chessgames.com/chessecohelp.html');
        const $ = cheerio.load(result.data);
        $('table > tbody > tr').each(function () {
            moves.push({
                code: $(this).children().eq(0).text(),
                move: $(this).children().eq(1).text().split('\n')[1],
                title: $(this).children().eq(1).text().split('\n')[0]
            })
        })
        console.log(moves);
    } catch (err) {
        console.log(err);
    }
}

getChesssOpeningMoves();

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        getAllMoves(req, res, moves);
    } else if (req.url.match(/[A-E][0-9][0-9]/) && req.method === 'GET') {
        getMoveByCode(req, res, moves);
    } else {
        res.writeHead(404).end('Not Found');
    }
})


server.listen(8080, () => console.log(`Server running on ${server.address().port}`));