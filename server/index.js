const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { marked } = require("marked");
const hl = require("highlight.js");

let app = express();
app.use(bodyParser.json());
app.use(cors());
marked.setOptions({
    highlight:(code,language)=>{
        return hl.highlightAuto(code, language).value;
    }
})

app.post("/markdowntohtml", (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).json({ error: "Please Write Markdown Text" });
  }
  const html = marked(markdown);
  res.json({ html });
});

app.listen(8080, () => console.log("Server Running on Port 8080"));
