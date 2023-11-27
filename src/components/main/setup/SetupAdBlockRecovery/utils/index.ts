import { ContentState, EditorState, Modifier, convertFromHTML, convertToRaw ,convertFromRaw,RawDraftContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const getEditorStateByString = (value: string) => {
    const blocksFromHTML = convertFromHTML(value);
    const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    return EditorState.createWithContent(state);
};

/** Convert Editor data to html */
const convertEditorStateDataToHtml = (editorState: EditorState) => {
    let editorValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return editorValue;
};

// convert rawEditor state to content state
const convertRawDataToEditorState = (rawState:RawDraftContentState) =>{
    let contentState = convertFromRaw(rawState);
    return contentState;
}

/** get Editor data into string */
const getEditorStateValue = (editorState: EditorState) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value = blocks.map((block) => (!block.text.trim() && '\n') || block.text).join('\n');
    return value;
};

/** convert string to editor data then convert to html */
const convertStringToHtml = (value: string) => {
    let editorState = EditorState.createEmpty();
    const currentContent = editorState.getCurrentContent(),
        currentSelection = editorState.getSelection();
    const newContent = Modifier.replaceText(currentContent, currentSelection, value);
    const newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
    const html = convertEditorStateDataToHtml(newEditorState);
    return html;
};

const checkIsEmpty = (editor: EditorState) => {
    const content = editor.getCurrentContent();
    const isEditorEmpty = !content.hasText();
    const currentPlainText = content.getPlainText();
    const lengthOfTrimmedContent = currentPlainText.trim().length;
    const isContainOnlySpaces = !isEditorEmpty && !lengthOfTrimmedContent;

    if (isEditorEmpty || isContainOnlySpaces) {
        return true;
    }
    return false;
};

const adblockRecoverySetupUtils = {
    getEditorStateByString,
    convertStringToHtml,
    checkIsEmpty,
    convertEditorStateDataToHtml,
    getEditorStateValue,
    convertRawDataToEditorState,
};

export default adblockRecoverySetupUtils;
