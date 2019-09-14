import React, { Component } from "react";
import { Tabs, Tab } from "material-ui/Tabs";

import axios from "axios";

class XML extends Component {
  render() {
    return (
      <div classname="main">
        <form
          enctype="multipart/form-data"
          action="http://localhost:8080/api/upload/"
          method="post"
        >
          <input id="image-file" type="file" />
          <p></p>
        </form>
        <button
          id="send"
          onClick={() => {
            this.send();
          }}
        >
          Отправить
        </button>{" "}
      </div>
    );
  }

  send = () => {
    let file = document.querySelector("#image-file").files[0];
    console.log(file);
    window.location.href = "file:///" + file.name
    let formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    let r = fetch("http://localhost:8080/api/upload", {
      method: "POST",
      body: file
    });
    console.log(r);
  };
}

export default XML;
