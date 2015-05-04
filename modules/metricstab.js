function metricstab() {
var self = new TB.Module('Metrics Tab');
self.shortname = 'Metrics';

self.settings['enabled']['default'] = true;

self.getSectionFromUrl = function getSectionFromUrl(url) {
    var regex = new RegExp(/^(http|https):\/\/([a-z]+\.)?reddit\.com\/(user|r)\/([^\/]+)(\/|$)/g);
    var matches = regex.exec(url);

    if (matches != null) {
        return {section: matches[3], subSection: matches[4]};
    } else {
        return null;
    }
};

self.init = function () {
    var page = this.getSectionFromUrl(window.location.href),
        $body = $('body');

    if (page == null) {
        return false;
    }

    var metrics = {
        user: {
            'Observatory': 'http://0bservat0ry.com/reddit/u/{subSection}.html',
            'MetaReddit': 'http://metareddit.com/stalk?user={subSection}',
            'Redective': 'http://www.redective.com/?r=e&a=search&s=user&t=redective&q={subSection}',
            'Karmawhores': 'http://www.karmawhores.net/user/{subSection}',
            'Karmalb': 'http://www.karmalb.com/user/{subSection}',
            'Karmastats': 'http://reddit.dataoverload.de/karmastats/#{subSection}',
            'RateRedditors': 'http://rateredditors.com/{subSection}',
            'SnoopSnoo': 'http://www.snoopsnoo.com/u/{subSection}'
            //'RedditInsight': 'http://www.redditinsight.com/#trackuser', // donno if we want to add ones that don't propagate the user name.
            //'RedditInvestigator': 'http://www.redditinvestigator.com/'
        },

        r: {
            'Observatory': 'http://0bservat0ry.com/reddit/r/{subSection}.html',
            'MetaReddit': 'http://metareddit.com/r/{subSection}',
            'Redective': 'http://www.redective.com/?r=e&a=search&s=subreddit&t=redective&q={subSection}',
            'RedditMetrics': 'http://redditmetrics.com/r/{subSection}',
            'ExploreReddit': 'http://paulrosenzweig.com/explore-reddit/r/{subSection}'
        }
    };

    var header = document.getElementById("header-bottom-left");
    var tabList = header.getElementsByTagName("ul")[0];

    if (tabList == null) {
        return false;
    }
    $body.append('<div id="tb-metrics-expand-list" style="display: none;"><ul></ul></div>');

    var $tabList = $(tabList),
        $metricsDropDown = $body.find('#tb-metrics-expand-list ul');

    $tabList.css('overflow', 'visible');

    var $listItem = $("<li class='tb-metrics'><a href='javascript:;'>metrics</a></li>"),
        $tbMetricsList = $body.find('#tb-metrics-expand-list');


    $(tabList).append($listItem);

    var links = metrics[page.section];
    for (var i in links) {
        var url = links[i];
        url = url.replace(/\{subSection\}/g, page.subSection);
        $metricsDropDown.append('<li><a href="' + url + '" target="_blank">' + i + '</a></li>');
    }

    $listItem.on('click', function () {
        var offset = $(this).offset();
        var offsetLeft = offset.left;
        var offsetTop = (offset.top + 20);

        $body.find('#tb-metrics-expand-list').css({
            "left": offsetLeft + 'px',
            "top": offsetTop + 'px'
        });
        $tbMetricsList.toggle();
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.tb-metrics').length) {
            $tbMetricsList.hide();
        }
    });

};

TB.register_module(self);
}

(function () {
    window.addEventListener("TBModuleLoaded", function () {
        metricstab();
    });
})();