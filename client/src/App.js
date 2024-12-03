import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

function App() {
  const [markdown, setMarkDown] = useState("");
  const [html, setHtml] = useState("");

  const convert = (e) => {
    setMarkDown(e.target.value);
  };

  useEffect(() => {
    const convertMarkdown = async () => {
      if (markdown.trim()) {
        try {
          const response = await axios.post(
            "http://localhost:8080/markdowntohtml",
            { markdown }
          );
          setHtml(response.data.html);
        } catch (error) {
          console.error(error);
        }
      } else {
        setHtml("");
      }
    };
    convertMarkdown();
  }, [markdown]);

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((el) => {
      hljs.highlightElement(el);
    });
  }, [html]);

  return (
    <div className="App">
      <p>MARKDOWN TO HTML CONVERTER</p>
      <div className="markdown-container">
        <div className="markdown-container-left">
          <textarea
            cols="30"
            rows="12"
            value={markdown}
            onChange={convert}
            placeholder=" MarkDown Text Here"
          />
        </div>
        <div className="markdown-container-right">
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className="htmldiv"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
