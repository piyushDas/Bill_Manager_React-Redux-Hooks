// const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const multer = require('multer')
const csv = require('fast-csv')
// const Router = express.Router
const upload = multer({ dest: 'tmp/csv/' })

const cors = require('cors')
const bodyParser = require('body-parser')
// const router = new Router();
// const server = http.createServer(app)
const port = 3012


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const dataSet = [];
const categoryFilters = []
let JSONHeaders = []

/*
  Versioned API - to fetch search results for list page
*/
app.get('/abcComm_v1/fetchAllproducts', (req, res) => {
  let {pageSize, pageNumber, searchStr, filter} = req.query
  pageSize = parseInt(pageSize)
  pageNumber = parseInt(pageNumber)
  let index = 0
  if (pageNumber > 0) {
    index = (pageNumber * pageSize)
  }
  let lastPageNumber = Math.ceil(dataSet.length/pageSize) - 1
  let paginatedData = dataSet.slice(index, index + pageSize)
  
  if (searchStr) {
    paginatedData = dataSet.filter(el => {
      return el.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
    })
    const len = paginatedData.length ? paginatedData.length : 0
    lastPageNumber = Math.ceil(len/pageSize) - 1
  }

  const categoriesSelected = filter ? filter.split(',') : []

  if (categoriesSelected.length) {
    paginatedData = dataSet.filter(el => {
      return categoriesSelected.indexOf(el['category']) > -1
    })
  }

  const updatedResponse = {
    type: 'available',
    paginatedData,
    currentPage: pageNumber,
    lastPageNumber,
    categoryFilters
  }

  if (!updatedResponse.paginatedData || !updatedResponse.paginatedData.length) {
    updatedResponse.type = 'itemsUnavailable'
  }
  console.log(updatedResponse)
  res.json(updatedResponse)
})

const keysArr = ['_id', 'image', 'name', 'currency_symbol', 'url', 'price', 'avlble', 'category', 'collection', 'full_description', 'description']
app.post('/abcComm_v1/uploadCSV', upload.single('csv'), function(req, res, next) {
  JSONHeaders.length = 0
  dataSet.length = 0
  console.log(req.file)
  // open uploaded file
  csv.parseFile(req.file.path)
    .on("data", function (data) {
      if (!JSONHeaders.length) {
        JSONHeaders = [...data]
      } else {
        const obj = {}
        for (let index = 0; index < JSONHeaders.length; index++) {
          if (keysArr.indexOf(JSONHeaders[index]) > -1) {
            obj[JSONHeaders[index]] = data[index]
          }
        }
        if (Number.isFinite(parseInt(obj['avlble'])) && parseInt(obj['avlble']) > 0) {
          dataSet.push(obj)
          if (obj['category'] && categoryFilters.indexOf(obj['category']) < 0) {
            categoryFilters.push(obj['category'])
          }
        }

      } // push each row
    })
    .on("end", function () {
      console.log(dataSet)
      fs.unlinkSync(req.file.path);   // remove temp file
      res.json({status: "success"})
    })
});

// Start server
function startServer() {
  app.listen(port, function () {
    console.log('ABCcommerce server listening on ', port);
  });
}

setImmediate(startServer);