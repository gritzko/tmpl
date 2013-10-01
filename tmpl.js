/**
 * Autor: Evstigneev Andrey
 * Date: 26.09.13
 * Time: 16:14
 *
 * function tmpl
 * originally written by John Resig (http://ejohn.org/blog/javascript-micro-templating/ - MIT Licensed)
 * and modified by me
 */

(function(global){

    'use strict';

    global.tmpl = (function(){
        var SPACE_RE = /[\r\t\n]/g,
            QUOTE_RE = /'/g,
            ESC_QUOTE_RE = /\\'/g,
            PROC_RE = /<#(.+?)#>/g,
            proc = function(all, g1){
               var s = g1.replace(ESC_QUOTE_RE, "'");
               return s.charAt(0) === '=' ? ("'+" + s.slice(1) + "+'") : ("';" + s + "s+='");
           };

        return function(str){
            return new Function("data", "var s='" +
                str.replace(SPACE_RE, " ").replace(QUOTE_RE, "\\'").replace(PROC_RE, proc) + "';return s;");
        }
    }());

}(this));



