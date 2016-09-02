(function($){
    $(document).ready(function() {

        // Set the size of the JDL storybook frame.
        var jdlStorybookFrame = $('.jdl-storybook');
        if (jdlStorybookFrame.length === 1) {
            var $window = $(window);

            function setStoryBookFrameHeith() {
                var offset = jdlStorybookFrame.offset();
                jdlStorybookFrame.height($window.height() - offset.top - 20);
            }
            $window.resize(setStoryBookFrameHeith);

            setStoryBookFrameHeith();
        }

    });
}(jQuery));
