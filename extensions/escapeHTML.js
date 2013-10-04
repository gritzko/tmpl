/**
 * Autor: Evstigneev Andrey
 * Date: 04.10.13
 * Time: 18:13
 */

(function(global){

    'use strict';

    if(!global.tmpl){
        throw new Error('tmpl library is not connected');
    }

    var re = /[&<>"'\/]/g,
        entityMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

    global.tmpl.exts.escapeHTML = function(str){
        return str.replace(re, function(entity){
            return entityMap[entity];
        });
    };

}(this));