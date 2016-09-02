(function($){
    $(document).ready(function() {

        // Set the size of the JDL storybook frame.
        var jdlStorybookFrame = $('.jdl-storybook');
        if (jdlStorybookFrame.length === 1) {
            var $window = $(window);

            function setStoryBookFrameHeight() {
                var offset = jdlStorybookFrame.offset();
                jdlStorybookFrame.height($window.height() - offset.top - 40);
            }
            $window.resize(setStoryBookFrameHeight);

            setStoryBookFrameHeight();

            function removeActionLogger() {
                setTimeout(function() {
                    var actionLogger = $('.Pane.horizontal.Pane2', jdlStorybookFrame.contents());
                    if (actionLogger.length > 0) {
                        actionLogger.remove();
                    } else {
                        removeActionLogger();
                    }
                }, 10);
            }
            removeActionLogger();
        }

        // Style the nav buttons using JDL styles
        var currentUrl = window.location.pathname.replace('/jenkins-design-language', ''); // yeah, hacky
        if (currentUrl === '' || currentUrl === '/index') {
            currentUrl = '/';
        }
        $('.nav a').addClass('btn-secondary inverse').each(function() {
            var a = $(this);
            var ahref = a.attr('href');

            if (ahref.indexOf('./') === 0) {
                ahref = ahref.substring(1);
            }
            if (currentUrl === ahref) {
                a.removeClass('btn-secondary').addClass('btn');
            }
        });
    });
}(jQuery));
