import React, {Component} from 'react';
import { ScriptCache } from './ScriptCache ';

export default class JSONEditorReact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.scriptsLoaded = this.scriptsLoaded.bind(this)
        this.editorLoading = false; 
        this.state = {isScriptsLoaded:false};
        this.jsonEditor = null;
        console.log("In JSONEditorReact Constructor");
    }

    scriptsLoaded(status)
    {
        console.log("Print Status of Load "+ status)
        this.setState({isScriptsLoaded:true});
    }

    handleSubmit() {
        if(this.jsonEditor != null)
        {
            console.log(this.jsonEditor.getValue());
        }
    }

    editorReady()
    {
        this.editorLoading = false;
        console.log("editorReady");
    }  
    
    componentDidMount () {
        console.log("In componentDidMount", this.editorLoading);
        if(this.editorLoading === false && this.state.isScriptsLoaded === false)
        {
            this.scriptCache =  new ScriptCache([['https://cdn.jsdelivr.net/npm/@json-editor/json-editor@latest/dist/jsoneditor.min.js','script'],
            ['https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css','css'],
            ['https://cdn.jsdelivr.net/npm/ace-builds@latest/src-noconflict/ace.min.js','script']],this.scriptsLoaded);
        }
        console.log("Exit componentDidMount", this.editorLoading);
    }

    componentDidUpdate() {
        console.log("componentDidUpdate",this.editorLoading)
        if(this.editorLoading === false && this.state.isScriptsLoaded === true)
        {
            const options = Object.assign({}, this.props.config);
            this.jsonEditor = new window.JSONEditor(this.container, options)
            this.editorLoading = true;
            this.jsonEditor.on("ready", () => {this.editorReady()})
            window.ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@latest/src-noconflict/");
        }
/*         const schemaChanged = !isEqual(this.props.schema, this.schema);
        if (schemaChanged) {
        this.schema = cloneDeep(this.props.schema);
        } */
    }

    componentWillUnmount () {
        console.log("componentWillUnmount",this.editorLoading)
         if(this.editorLoading === false && this.state.isScriptsLoaded === true)
         {
            this.jsoneditor.destroy();
         }
    }

    render() {
        return (
            <div>
                <form >
                    <div className="container" ref={elem => this.container = elem} />
                    <input type="button" value="Submit" onClick={this.handleSubmit}/>
                </form>
            </div>
        );
    }
}