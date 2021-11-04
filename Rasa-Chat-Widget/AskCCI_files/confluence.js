WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'confluence.extra.noemailstorm:nes-prominent-button', location = 'js/no-email-storm-prominent-button.js' */
(function ($) {
    $.nes_change_primary_button = true;
})(AJS.$);
}catch(e){WRMCB(e)};