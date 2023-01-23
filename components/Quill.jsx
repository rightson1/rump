import { Box } from "@mui/material";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

import React from "react";
import { useGlobalProvider } from "../utils/themeContext";

const Editor = ({ setText, text }) => {

    const { colors, mode } = useGlobalProvider();
    const [state, setState] = React.useState({ value: null });
    const handleChange = value => {
        setState({ value });
        setText(value)
    };
    return (
        <Box className="text-editor  w-full"
            sx={{
                '& .text-editor svg': {
                    // bgcolor: colors.grey[100] + '!important',
                    p: '.1rem',
                    borderRadius: '50%',

                },
                '&  .ql-toolbar': {
                    backgroundColor: colors.grey[mode === 'dark' ? 300 : 800] + '!important',
                    border: 'none  !important',
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                },
                '&  .ql-container': {
                    backgroundColor: colors.grey[mode === 'dark' ? 300 : 800] + '!important',
                    border: 'none !important',
                    padding: '10px',
                    my: .1,
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    color: "black",
                    overflow: 'scroll',
                    minHeight: '50vh'


                },
                '&  .quill': {
                    border: 'none',

                    borderRadius: '10px !important'
                },
            }}

        >
            {/* <QuillToolbar /> */}
            <QuillNoSSRWrapper
                theme="snow"
                value={text}

                onChange={handleChange}
                placeholder={"Write something and free your heart ♥"}
                modules={modules}
                formats={formats}
                toolbar={true}
            />
        </Box>
    );
}
export default Editor;

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]
const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],

        ['clean'],
    ],
    clipboard: {

        matchVisual: false,
    },
}

const QuillToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <select className="ql-font" defaultValue="arial">
                <option value="arial">Arial</option>
                <option value="comic-sans">Comic Sans</option>
                <option value="courier-new">Courier New</option>
                <option value="georgia">Georgia</option>
                <option value="helvetica">Helvetica</option>
                <option value="lucida">Lucida</option>
            </select>
            <select className="ql-size" defaultValue="medium">
                <option value="extra-small">Size 1</option>
                <option value="small">Size 2</option>
                <option value="medium">Size 3</option>
                <option value="large">Size 4</option>
            </select>
            <select className="ql-header" defaultValue="3">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="3">Normal</option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
        </span>
        <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-indent" value="-1" />
            <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
            <button className="ql-direction" />
        </span>
        <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
        </span>
        <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
        </span>
        <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block" />
            <button className="ql-clean" />
        </span>

    </div>
);