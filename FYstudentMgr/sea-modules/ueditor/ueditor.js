define(function (require, exports, module) {
    require('ueditor-config');
    require('ueditor-all');
    require('ueditor-parse');
    require('ueditor-css');
    //alert(123);
    var init = function (name, option) {
        
        
            if (option == null) {
                editor= UE.getEditor(name);
            } else {
                editor= UE.getEditor(name, option);
               
            }
            return editor;
       
        
    }
        
      
    return {
        init: init
        
    }
})