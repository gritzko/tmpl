/**
 * Autor: Evstigneev Andrey
 * Date: 26.09.13
 * Time: 16:14
 */

(function(global){

    'use strict';

    global.tmpl = (function(){
        var proc = function(all, g1){
            var s = g1.replace(/\\'/g, "'");
            return s.charAt(0) === '=' ? ("'+" + s.slice(1) + "+'") : ("';" + s + "s+='");
        };

        return function(str){
            return new Function("data", "var s='" +
                str.replace(/[\r\t\n]/g, " ")
                    .replace(/'/g, "\\'")
                    .replace(/<#(.+?)#>/g, proc)
                + "';return s;");
        };
    })();

}(this));