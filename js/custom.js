document.addEventListener( 'DOMContentLoaded', function() {
    var input = CodeMirror.fromTextArea( document.getElementById( "input" ), {
            lineNumbers: true,
            matchBrackets: false,
            lineWrapping: true,
            mode: 'text/html'
        } ),
        output = CodeMirror.fromTextArea( document.getElementById( "output" ), {
            lineNumbers: true,
            matchBrackets: false,
            lineWrapping: true,
            readOnly: true,
            mode: 'css'
        } );

    input.setSize( 'auto', document.querySelector( '.Input' ).offsetHeight - 30 );
    output.setSize( 'auto', document.querySelector( '.Input' ).offsetHeight - 30 );

    document.getElementById( 'ExtractButton' ).addEventListener( 'click', function() {
        var indentVal = document.querySelector( 'input[name="indent"]:checked' ).value;

        output.setValue( cssbeautify( extractCSS.extract( input.getValue(), {
            extractIds: document.getElementById( 'extract_ids' ).checked,
            extractClasses: document.getElementById( 'extract_classes' ).checked,
            extractStyle: document.getElementById( 'extract_inline' ).checked,
            extractAnonStyle: document.getElementById( 'extract_anonstyle' ).checked
        } ), {
            indent: indentVal === 'tab' ? '\t' : indentVal === 'fourspaces' ? '    ' : '  '
        } ) );
    } );
} );