/**
 * Autor: Evstigneev Andrey
 * Date: 26.09.13
 * Time: 16:23
 */

(function(global){

    'use strict';

    TestCase('tmplTest', {

        testWithoutData : function(){
            var t = '<div></div>';
            assertEquals(global.tmpl(t)(), t);
        },

        testSubstituteVars : function(){
            var t = "<div>" +
                "<span><#= data.a #>-<#= data['a'] #></span>" +
                "</div>";

            assertEquals(global.tmpl(t)({a : 'test'}), '<div><span>test-test</span></div>');
        },

        testIter : function(){
            var t = "<div class = 'class'>" +
                    "<# data.items.forEach(function(item, i){ #>" +
                        "<span><#= i #> - <#= item #></span>" +
                    "<# }); #>" +
                "</div>";

            assertEquals(global.tmpl(t)({items : ['a', 'b', 'c']}), "<div class = 'class'><span>0 - a</span><span>1 - b</span><span>2 - c</span></div>");
        },

        testMoreQuotes : function(){
            var t = "<div class = 'class' id = \"id\">" +
                "<# data['items'][\"forEach\"](function(item, i){ #>" +
                    "<span><#= i #> - '<#= item #>'</span>" +
                "<# }); #>" +
            "</div>";

            assertEquals(global.tmpl(t)({items : ['a', 'b', 'c']}), "<div class = 'class' id = \"id\"><span>0 - 'a'</span><span>1 - 'b'</span><span>2 - 'c'</span></div>");
        },

        testUndefinedProp : function(){
            var t = '<div id = "id"><#= (data.prop || "no data") #></div>';
            assertEquals(global.tmpl(t)({}), '<div id = "id">no data</div>');
        },

        testCondition : function(){
            var t = '<# if(data.a){ #>test<# } #>';
            assertEquals(global.tmpl(t)({}), '');
            assertEquals(global.tmpl(t)({a : true}), 'test');
        },

        testConditionWithElse : function(){
            var t = '<# if(data.a){ #>test<# }else{ #>no test<# } #>';
            assertEquals(global.tmpl(t)({}), 'no test');
            assertEquals(global.tmpl(t)({a : true}), 'test');
        },

        testNewLinesInTemplate : function(){
            var t = "<div>\n\t<span><#= data.a #></span>\r\n</div>";
            assertEquals(global.tmpl(t)({a : 'test'}), "<div>  <span>test</span>  </div>");
        },

        testMethodCall : function(){
            var t = "<div><span><#= data.f() #></span></div>";
            assertEquals(global.tmpl(t)({f : function(){return 'test';}}), "<div><span>test</span></div>");
        },

        testNestedTemplate : function(){
            var t = "<div><span><#= data.f(data.n) #></span></div>";

            assertEquals(global.tmpl(t)({
                f : global.tmpl('<b><#= data.t #></b>'),
                n : {
                    t : 'test'
                }
            }), "<div><span><b>test</b></span></div>");
        },

        testEmptyInBrackets : function(){
            var t = "<# #>";
            assertEquals(global.tmpl(t)(), '');
        }

    });

}(this));