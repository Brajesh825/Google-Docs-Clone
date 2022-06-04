import { useEffect, useState } from "react";

import Quill from "quill";
import "quill/dist/quill.snow.css";

import { Box } from "@mui/material";
import styled from "@emotion/styled";

import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const Component = styled.div`
  background: #f6f6f6;
`;

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const {id} = useParams()

  useEffect(() => {
    const quillServer = new Quill("#container", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    quillServer.disable()
    quillServer.setText('Loading the document')
    setQuill(quillServer);
  }, []); // Component did mount

  useEffect(() => {
    const socketServer = io("http://localhost:9000");
    setSocket(socketServer);
    return () => {
      socketServer.disconnect();
    };
  },[]); // socket did unmount

  // Sending changes
  useEffect(() => {
    if (socket === null || quill === null) {
      return;
    }

    const handleCHange = (delta, oldData, source) => {
      if (source !== "user") return;
     socket && socket.emit("send-changes", delta);
    };
    quill && quill.on("text-change", handleCHange);

    return () => {
    quill &&  quill.off("text-change", handleCHange);
    };
  },[quill,socket]);

  // Listening to changes
  useEffect(() => {
    if (socket === null || quill === null) {
      return;
    }
    const handleCHange = (delta) => {
      quill.updateContents(delta);
    };
    socket && socket.on("receive-changes", handleCHange);

    return () => {
    socket &&  socket.off("receive-changes", handleCHange);
    };
  },[quill,socket]);

  // Loading The Document
  useEffect(()=>{
    if (socket === null || quill === null) {
      return;
    }
    socket && socket.once('load-document', document =>{
      quill && quill.setContents(document);
      quill && quill.enable();
    })

    socket && socket.emit('get-document',id);
  },[quill,socket,id])

  useEffect(()=>{
    if (socket === null || quill === null) {
      return;
    }
    const interval =setInterval(()=>{
      socket && socket.emit('save-document',quill.getContents())
    },2000)
    return () => {
      clearInterval(interval);
    }
  })

  return (
    <Component>
      <Box className="container" id="container"></Box>
    </Component>
  );
};

export default Editor;
