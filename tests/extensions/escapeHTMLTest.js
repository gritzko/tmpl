/**
 * Autor: Evstigneev Andrey
 * Date: 04.10.13
 * Time: 18:20
 */

(function(global){

    'use strict';

    var tmpl = global.tmpl;

    TestCase('escapeHTMLTest', {

        testStandalone : function(){
            var t1 = "<a href = 'http://example.com/t?a=b&d=c'></div>",
                t2 = '<a href = "http://example.com/t?a=b&d=c"></div>';

            assertEquals(tmpl.exts.escapeHTML(t1), '&lt;a href = &#39;http:&#x2F;&#x2F;example.com&#x2F;t?a=b&amp;d=c&#39;&gt;&lt;&#x2F;div&gt;');
            assertEquals(tmpl.exts.escapeHTML(t2), '&lt;a href = &quot;http:&#x2F;&#x2F;example.com&#x2F;t?a=b&amp;d=c&quot;&gt;&lt;&#x2F;div&gt;');
        },

        testInTemplate : function(){
            var t = "<div><#= tmpl.exts.escapeHTML(data.userInput) #></div>";

            assertEquals(tmpl(t)({
                userInput : '<script>alert(XSS);</script>'
            }), '<div>&lt;script&gt;alert(XSS);&lt;&#x2F;script&gt;</div>');
        }

    });

}(this));