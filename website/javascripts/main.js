(function($){
    $(document).ready(function() {

        // Set the size of the JDL storybook frame.
        var jdlStorybookFrame = $('.jdl-storybook');
        if (jdlStorybookFrame.length === 1) {
            var $window = $(window);

            function setStoryBookFrameHeith() {
                var offset = jdlStorybookFrame.offset();
                jdlStorybookFrame.height($window.height() - offset.top - 40);
            }
            $window.resize(setStoryBookFrameHeith);

            setStoryBookFrameHeith();
        }

        // Style the nav buttons using JDL styles
        var currentUrl = window.location.href;
        $('.nav a').addClass('btn-secondary inverse').each(function() {
            var a = $(this);
            var ahref = a.attr('href');

            if (ahref.indexOf('./') === 0) {
                ahref = ahref.substring(1);
            }
            if (currentUrl.length > ahref.length && currentUrl.substring(currentUrl.length - ahref.length) === ahref) {
                a.removeClass('btn-secondary').addClass('btn');
            }
        });
    });
}(jQuery));
