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

        testCodeEval : function(){
            var t = "<div>" +
                    "<# data.items.forEach(function(item, i){ #>" +
                        "<span><#= i #> - <#= item #></span>" +
                    "<# }); #>" +
                "</div>"

            assertEquals(global.tmpl(t)({items : ['a', 'b', 'c']}), '<div><span>0 - a</span><span>1 - b</span><span>2 - c</span></div>');
        },

        testUndefinedProp : function(){
            var t = '<div><#= (data.prop || "no data") #></div>';
            assertEquals(global.tmpl(t)({}), '<div>no data</div>');
        }

    });

}(this));