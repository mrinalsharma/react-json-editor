import './App.css';
import JSONEditorReact from './JSONEditorReact';


var config = {
  use_name_attributes: false,
  theme:'bootstrap4',
  disable_edit_json: true,
  disable_properties: true,
  disable_collapse: true,
  template: 'default',
  schema: {
    "title": "SQL Editor",
    "type": "object",
    "required": [
      "function"
    ],
    "properties": {
      "function": {
        "type": "string",
        "format": "javascript",
        "options": {
          "ace": {
            "theme": "ace/theme/vibrant_ink",
            "tabSize": 2,
            "useSoftTabs": true,
            "wrap": true
          }
        }
      }
    }
  },
  startval: {
"function": '/*We are currently showing off the JavaScript mode. ACE has support for 45* language modes and 24 color themes!*/\n var link = document.createElement("link"); \n link.onload = function() {alert("yay!");}'
}
}


function App() {

  console.log("In App component.")
  
  return (
    
    <div className="App">
      
      <JSONEditorReact
              config={config}
          />
    </div>
  );
}

export default App;
