function refreshedPage (req,res,next){
   console.log('You refreshed the page!'); // displays in terminal when refreshing the page
   next();
}

module.exports = refreshedPage;