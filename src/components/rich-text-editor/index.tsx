import React, {
  FC, ReactElement, memo, useState, useEffect,
} from 'react';
// 引入编辑器组件
import BraftEditor, { EditorState } from 'braft-editor';
// 引入编辑器样式

import 'braft-editor/dist/index.css';

import { useDispatch } from 'react-redux';
import { changeTheContentOfTheRichTextEditorAction } from '@src/pages/product/store/action-creators';
import { RichTextEditorWrapper } from './style';

interface IProps {
  htmlText?:string
}

const RichTextEditor: FC<IProps> = ({ htmlText }): ReactElement => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const dispatch = useDispatch();

  useEffect(() => {
    if (htmlText) {
      setEditorState(BraftEditor.createEditorState(htmlText));
    }
  }, [htmlText]);

  const handleEditorChange = (editorState:EditorState) => {
    setEditorState(editorState);
    const htmlContent:string = editorState.toHTML(); // 转成html字符串
    dispatch(changeTheContentOfTheRichTextEditorAction(htmlContent));
  };

  /*  const submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = editorState.toHTML();
    console.log(htmlContent.toText());
    // 存储富文本的内容
    // const result = await saveEditorContent(htmlContent);
  }; */
  return (
    <RichTextEditorWrapper className="my-component">
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        // onSave={submitContent}
      />
    </RichTextEditorWrapper>
  );
};

export default memo(RichTextEditor);
