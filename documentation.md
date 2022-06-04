Client

Technology Used
    React.js
    Quill.js
    Material UI v5
    mongoDB
    Socket.io

--------------------------------------------------------
Quill.js
Docs :- http://www.Quilljs.com

Installation
:- npm install quill

Working

step 1:- Include the quill library
    React:-import Quill from 'quill'

step 2:- import the css named quill.snow.css
    React:- import 'quill/dist/quill.snow.css'

step 3:- Initialise quill Editor
    React:-
        var quill = new Quill('#editor', {
        theme: 'snow'
        });

    #editor :- name of the html element where quill editor is loaded.

step 4:- Adding Options for the editor
    React:-
        var quill = new Quill('#editor', {
        theme: 'snow',
        modules:{
            toolbar = toolbarOptions
            }
        });

        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ];

--------------------------------------------------------

Material UI v5

Installation
:- npm install @mui/material @emotion/react @emotion/styled

Box is within @mui/material
styles is within @emotion

-------------------------------------------------------
React JS
:- StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).

-------------------------------------------------------