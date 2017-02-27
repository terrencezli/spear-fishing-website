(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function slkAddVideoBg (selector, videoBg){
    if (videoBg) {
        var videoTag = $('<video>').attr('class', 'slk-video-bg').attr('autoplay', '').attr('loop', '').attr('type', 'video/webm').attr('src', videoBg);
        //var vContainer = $('<div>').attr('class', 'slk-video-bg-container');
        //vContainer.append(videoTag);
        $(selector).prepend(videoTag);
    };
};

$(function () {
    if ($.prettyPhoto){
        $("a.video-player[data-type='youtube']").prettyPhoto();
    };
});

$(function () {
    $('[data-toggle="tab"]').click(function () {
        $(this).tab('show');
    });
});

// DNN compatibility UI
$(function () {

    // only do this if we have dnn elements on the page
    //var dnnForm = $('.dnnForm,.dnnPrimaryAction,.dnnFormItem');
    //if (dnnForm.length) {

    //    $('.dnnForm').addClass('form-horizontal').removeClass('dnnForm');
    //    $('.dnnFormSectionHead').parent().addClass('form-horizontal');

    //    $('.dnnFormItem input,.dnnFormItem textarea,.dnnFormItem select').not(':checkbox,.rcbInput,:radio').addClass('form-control')
    //        .wrap('<div class="col-sm-9"></div>');
    //    $('.dnnFormItem :checkbox').each(function () {
    //        var lbl = $(this).next('label');
    //        if (lbl.length) {
    //            lbl.prepend($(this));
    //            lbl.wrap('<div class="col-sm-9 col-sm-offset-3 checkbox"></div>');
    //        } else {
    //            lbl.wrap('<div class="col-sm-9 checkbox"></div>');
    //        }
    //    });
    //    $('.RadComboBox,.dnnDropDownList,.dnnFormRadioButtons').addClass('col-sm-9');
    //    //$('.dnnFormItem :checkbox').parent().addClass('col-sm-offset-3');
    //    $('.dnnFormItem').addClass('form-group').removeClass('dnnFormItem');
    //    $('.dnnLabel')
    //        .not($('.dnnLabel').parent('td[width]').find('.dnnLabel'))
    //        .not($('.dnnLabel').parent('.SubHead').find('.dnnLabel'))
    //        .addClass('col-sm-3 control-label').removeClass('dnnLabel')
    //        .next('span').wrap('<div class="col-sm-9"></div>');
    //    //$('.dnnFormLabel').addClass('control-label').removeClass('dnnFormLabel');
    //    $('.dnnActions').addClass('col-sm-offset-3');
    //    $('.dnnLoginActions a').removeClass('btn btn-default');

    //    $('.dnnPrimaryAction').addClass('btn btn-primary').removeClass('dnnPrimaryAction')
    //    .parent('.form-group').each(function () {
    //        $(this).children().wrapAll('<div class="col-sm-9 col-sm-offset-3"></div>');
    //    });
    //    $('.dnnSecondaryAction').addClass('btn btn-link').removeClass('dnnSecondaryAction');
    //    $('.CommandButton').addClass('btn btn-default');
    //}

    //$.fn.dnnTooltip = function () { }
    //$.fn.dnnModuleDragDrop = function () { }
    
});