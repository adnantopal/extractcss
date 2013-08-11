/**
 * extractcss.js
 * https://github.com/adnantopal/extractcss
 * http://extractcss.com/
 * Author: @adnantopal
 * Copyright 2013, Adnan Topal (atopal.com)
 * Licensed under the MIT license.
 */
var extractCSS = {
    extractClasses : function( data, options, cssboptions )
    {
        var allClassesTmp = {},
            allClasses = [],
            classStyle = '',
            output = '';

        $(data).find('*[class=""]').removeAttr('class');

        $.each($(data).find('*[class]'), function()
        {
            var split = ($(this).attr('class').trim().length > 0 ? $(this).attr('class').trim().split(/\s+/).reverse() : false);
            for (var i=split.length;--i>-1;)
            {
                allClassesTmp[ split[i] ] = 1;

                if (i == '0' && split[i].length > 0 && $(data).find('.'+split[i]+' > *').length && options.extractChildren === 'on')
                {
                    $.each($(data).find('.'+split[i]+' > *'), function()
                    {
                        if (!$(this).attr('class') && !$(this).attr('id'))
                        {
                            var childTag = $(this).prop('tagName').toLowerCase(),
                                children = '',
                                ib = 0,
                                il = $(this).find("*").length;

                            allClassesTmp[ split[i] + ' > ' + childTag ] = 1;

                            for(;ib<il;ib++)
                            {
                                if ($(this).attr('class') || $(this).attr('id'))
                                {
                                    return;
                                }
                                else
                                {
                                    if (!$(this).find("*").eq(ib).attr('class') && !$(this).find("*").eq(ib).attr('id'))
                                    {
                                        children += ' > ' + $(this).find("*").eq(ib).prop('tagName').toLowerCase();
                                        if ($(data).find('.' + split[i] + ' > ' + childTag + ' ' + children).length)
                                        {
                                            allClassesTmp[ split[i] + ' > ' + childTag + children ] = 1;
                                        }
                                        else
                                        {
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });

        for (var i in allClassesTmp)
        {
            allClasses.push(i);
        }

        var is = 0,
            isl = allClasses.length;
        for (; is<isl; is++)
        {
            var element = $(data).find('.'+allClasses[is]);
            if (element.attr('style') !== undefined && options.extractInline === 'on')
            {
                classStyle = element.attr('style');
            }
            else
            {
                classStyle = '';
            }

            output += "."+ allClasses[is] + "{"+classStyle+"}";
        }
        return cssbeautify(output, cssboptions);
    },
    extractIDs : function( data, options, cssboptions )
    {
        var allIDsTmp = {},
            allIDs = [],
            idStyle = '',
            output = '';

        $(data).find('*[id=""]').removeAttr('id');

        $.each($(data).find('*[id]'), function()
        {
            var split = ($(this).attr('id').trim().length > 0 ? $(this).attr('id').trim().split(/\s+/).reverse() : false);
            for (var i=split.length;--i>-1;)
            {
                allIDsTmp[ split[i] ] = 1;

                if (i == '0' && split[i].length > 0 && $(data).find('#'+split[i]+' > *').length && options.extractChildren === 'on')
                {
                    $.each($(data).find('#'+split[i]+' > *'), function()
                    {
                        if (!$(this).attr('class') && !$(this).attr('id'))
                        {
                            var childTag = $(this).prop('tagName').toLowerCase(),
                                children = '',
                                ib = 0,
                                il = $(this).find("*").length;

                            allIDsTmp[ split[i] + ' > ' + childTag ] = 1;

                            for(;ib<il;ib++)
                            {
                                if ($(this).attr('class') || $(this).attr('id'))
                                {
                                    return;
                                }
                                else
                                {
                                    if (!$(this).find("*").eq(ib).attr('class') && !$(this).find("*").eq(ib).attr('id'))
                                    {
                                        children += ' > ' + $(this).find("*").eq(ib).prop('tagName').toLowerCase();
                                        if ($(data).find('.' + split[i] + ' > ' + childTag + ' ' + children).length)
                                        {
                                            allIDsTmp[ split[i] + ' > ' + childTag + children ] = 1;
                                        }
                                        else
                                        {
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });

        for (var i in allIDsTmp)
        {
            allIDs.push(i);
        }

        var is = 0,
            isl = allIDs.length;
        for (; is<isl; is++)
        {
            var element = $(data).find('#'+allIDs[is]);
            if (element.attr('style') !== undefined && options.extractInline === 'on')
            {
                idStyle = element.attr('style');
            }
            else
            {
                idStyle = '';
            }
            output += "#"+ allIDs[is] + "{"+idStyle+"}";
        }
        return cssbeautify(output, cssboptions);
    }
};