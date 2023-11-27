import { EditorState } from 'draft-js';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type Props = {
    value: EditorState;
    onChanges: (newState: EditorState) => void;
};

const RichEditor: React.FC<Props> = ({ value, onChanges }) => {
    return (
        <div>
            <Editor
                editorClassName="my-editor"
                wrapperClassName="my-editor-wrapper"
                editorState={value}
                onEditorStateChange={onChanges}
                toolbar={{
                    options: ['inline', 'link'],
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    // textAlign: { options: ['left', 'center', 'right'] },
                
                    link:{
                        popupClassName: 'linkStyle',
                        showOpenOptionOnHover: true,
                        defaultTargetOption: '_self',
                        options: ['link'],
                      }
                }}
            />
        </div>
    );
};

export default RichEditor;
