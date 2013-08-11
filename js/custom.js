$(document).ready(function()
{
    var input = CodeMirror.fromTextArea(document.getElementById("input"), {
            lineNumbers: true,
            matchBrackets: false,
            lineWrapping: true,
            mode: 'text/html'
        }),
        output = CodeMirror.fromTextArea(document.getElementById("output"), {
            lineNumbers: true,
            matchBrackets: false,
            lineWrapping: true,
            readOnly: true,
            mode: 'css'
        }),
        checkboxes = $('input[type="checkbox"]'),
        radios = $('input[type="radio"]');

    $('input').iCheck({
        checkboxClass: 'icheckbox_futurico',
        radioClass: 'iradio_futurico'
    });

    checkboxes.on('ifChecked', function(){
        $(this).val('on');
    });
    checkboxes.on('ifUnchecked', function(){
        $(this).val('off');
    });

    $('#select_all').click(function(e)
    {
        e.preventDefault();

        var start = output.firstLine(), end = output.lastLine() + 1;
        output.setSelection({line: start, ch: 0}, {line:end, ch: 0});
    });

    $('#extract_form').on('submit', function(e)
    {
        e.preventDefault();

        var input_val = $('<div></div>').append($('#input').val()),
            extract_ids = $('#extract_ids').val(),
            extract_classes = $('#extract_classes').val(),
            extract_inline = $('#extract_inline').val(),
            extract_children = $('#extract_children').val(),
            indent = $('input[name="indent"]:checked').val(),
            openbrace = $('input[name="openbrace"]:checked').val(),
            autosemicolon = $('#autosemicolon').val(),
            options = {
                extractInline : extract_inline,
                extractChildren : extract_children
            },
            cssboptions = {
                openbrace : openbrace
            };

        if (indent === 'twospaces')
        {
            cssboptions.indent = '  ';
        }
        else if (indent === 'tab')
        {
            cssboptions.indent = '\t';
        }
        else
        {
            cssboptions.indent = '    ';
        }

        if (autosemicolon === 'on')
        {
            cssboptions.autosemicolon = true;
        }

        if (extract_ids === 'on' && extract_classes === 'on')
        {
            output.setValue(extractCSS.extractIDs(input_val, options, cssboptions)+'\n\n'+extractCSS.extractClasses(input_val, options, cssboptions));
        }
        else if (extract_ids === 'on' && extract_classes !== 'on')
        {
            output.setValue(extractCSS.extractIDs(input_val, options, cssboptions));
        }
        else
        {
            output.setValue(extractCSS.extractClasses(input_val, options, cssboptions));
        }
    });
});