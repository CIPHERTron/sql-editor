import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/mode-mysql';
import 'ace-builds/src-noconflict/theme-monokai';

import React from 'react';

import AceEditor from 'react-ace';

// ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.6/src-noconflict');

const Editor = ({ value, setValue, isOpen }) => {
	const onChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<main className={`${isOpen ? 'col-start-2' : 'col-start-1'} col-end-3 row-start-2 row-end-3 mx-6 my-12 lg:mx-12`}>
			<label htmlFor="editor">
				<AceEditor
					id="editor"
					aria-label="editor"
					mode="mysql"
					theme="monokai"
					name="editor"
					fontSize={16}
					minLines={20}
					maxLines={50}
					width="100%"
					showPrintMargin={false}
					showGutter
					placeholder="Write your Query here..."
					editorProps={{ $blockScrolling: true }}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
					}}
					value={value}
					onChange={onChange}
					showLineNumbers
				/>
			</label>
		</main>
	);
};

export default Editor;
