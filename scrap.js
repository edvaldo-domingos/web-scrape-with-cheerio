const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const json2csv = require('json2csv').Parser;


const movies = ["https://www.imdb.com/title/tt0242519/?ref_=nv_sr_srsg_1",
    "https://www.imdb.com/video/vi1366081049?pf_rd_r=K2GVETG3HN2XB40RSRTP&pf_rd_p=222e65f3-d17f-4120-b09e-07aef8a28e23&pf_rd_m=A2FGELUUNOQJNL&pf_rd_t=15061&pf_rd_i=home&pf_rd_s=imdb-originals-2&ref_=hm_edcio_org_brf_uas3_2&listId=ls085924943",
    "https://www.imdb.com/title/tt0068646/?ref_=hm_stp_pvs_piv_tt_1",
    "https://www.imdb.com/title/tt0468569/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=HP6XXXZTWGV385R43BKZ&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_4",
    "https://www.imdb.com/title/tt0110912/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=HP6XXXZTWGV385R43BKZ&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_8",
    "https://www.imdb.com/title/tt8503618/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=e31d89dd-322d-4646-8962-327b42fe94b1&pf_rd_r=HP6XXXZTWGV385R43BKZ&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_28"
];

(async () => {
    let imdbData = [];

    for (let movie of movies) {
        const response = await request({
            uri: movie,
            headers: {},
            // gzip: true
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7"
        });

        let $ = cheerio.load(response);
        const title = $('div[class="title_wrapper"] > h1').text().trim()
        const rating = $('div[class="ratingValue"] > strong > span').text()
        const summary = $('div[class="summary_text"]').text().trim();
        const releadeData = $('a[title="See more release dates"]').text().trim();

        imdbData.push({
            title, rating, summary, releadeData
        });
    }
    const j2cp = new json2csv();
    const csv = j2cp.parse(imdbData);

    fs.writeFileSync('./imdb.csv', csv, 'utf-8');
}

)()
// const movie = "https://www.imdb.com/title/tt0242519/?ref_=nv_sr_srsg_1";


// (async () => {
//     let imdbData = [];
//     const response = await request({
//         uri: movie,
//         headers: {},
//         // gzip: true
//         accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//         "accept-encoding": "gzip, deflate, br",
//         "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7"
//     });

//     let $ = cheerio.load(response);
//     const title = $('div[class="title_wrapper"] > h1').text().trim()
//     const rating = $('div[class="ratingValue"] > strong > span').text()
//     const summary = $('div[class="summary_text"]').text().trim();
//     const releadeData = $('a[title="See more release dates"]').text().trim();


//     imdbData.push({
//         title, rating, summary, releadeData
//     });

//     const j2cp = new json2csv();
//     const csv = j2cp.parse(imdbData);

//     fs.writeFileSync('./imdb.csv', csv, 'utf-8');
// }

// )()


