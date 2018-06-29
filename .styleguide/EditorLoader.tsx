// this was code-splitting with import() but didn't want that
import * as React from 'react';
const EditorLoaderRenderer = require('../node_modules/react-styleguidist/lib/rsg-components/Editor/EditorLoaderRenderer')
    .default;

export default class EditorLoader extends React.Component {
    state = {
        editor: null,
    };

    componentDidMount() {
        (module => {
            this.setState({ editor: module.default });
        })(require('../node_modules/react-styleguidist/lib/rsg-components/Editor/Editor'));
    }

    render() {
        const Editor: any = this.state.editor;
        if (Editor) {
            return <Editor {...this.props} />;
        }

        return <EditorLoaderRenderer />;
    }
}
