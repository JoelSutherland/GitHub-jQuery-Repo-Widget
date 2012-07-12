$(function(){
	
	var i = 0;

	$('.github-widget').each(function(){

		if(i == 0) $('head').append('<style type="text/css">.github-box{font-family:helvetica,arial,sans-serif;font-size:13px;line-height:18px;background:#fafafa;border:1px solid #ddd;color:#666;border-radius:3px}.github-box a{color:#4183c4;border:0;text-decoration:none}.github-box .github-box-title{position:relative;border-bottom:1px solid #ddd;border-radius:3px 3px 0 0;background:#fcfcfc;background:-moz-linear-gradient(#fcfcfc,#ebebeb);background:-webkit-linear-gradient(#fcfcfc,#ebebeb);}.github-box .github-box-title h3{font-family:helvetica,arial,sans-serif;font-weight:normal;font-size:16px;color:gray;margin:0;padding:10px 10px 10px 30px;background:url(https://a248.e.akamai.net/assets.github.com/images/icons/public.png) 7px center no-repeat}.github-box .github-box-title h3 .repo{font-weight:bold}.github-box .github-box-title .github-stats{position:absolute;top:8px;right:10px;background:white;border:1px solid #ddd;border-radius:3px;font-size:11px;font-weight:bold;line-height:21px;height:21px}.github-box .github-box-title .github-stats a{display:inline-block;height:21px;color:#666;padding:0 5px 0 18px;background:url(https://a248.e.akamai.net/assets.github.com/images/modules/pagehead/repostat.png) no-repeat}.github-box .github-box-title .github-stats .watchers{border-right:1px solid #ddd;background-position:3px -2px}.github-box .github-box-title .github-stats .forks{background-position:0 -52px;padding-left:15px}.github-box .github-box-content{padding:10px;font-weight:300}.github-box .github-box-content p{margin:0}.github-box .github-box-content .link{font-weight:bold}.github-box .github-box-download{position:relative;border-top:1px solid #ddd;background:white;border-radius:0 0 3px 3px;padding:10px;height:24px}.github-box .github-box-download .updated{margin:0;font-size:11px;color:#666;line-height:24px;font-weight:300}.github-box .github-box-download .updated strong{font-weight:bold;color:#000}.github-box .github-box-download .download{position:absolute;display:block;top:10px;right:10px;height:24px;line-height:24px;font-size:12px;color:#666;font-weight:bold;text-shadow:0 1px 0 rgba(255,255,255,0.9);padding:0 10px;border:1px solid #ddd;border-bottom-color:#bbb;border-radius:3px;background:#f5f5f5;background:-moz-linear-gradient(#f5f5f5,#e5e5e5);background:-webkit-linear-gradient(#f5f5f5,#e5e5e5);}.github-box .github-box-download .download:hover{color:#527894;border-color:#cfe3ed;border-bottom-color:#9fc7db;background:#f1f7fa;background:-moz-linear-gradient(#f1f7fa,#dbeaf1);background:-webkit-linear-gradient(#f1f7fa,#dbeaf1);</style>');
		i++;

		var $container = $(this);
		var repo = $container.data('repo');

		$.ajax({
			url: 'https://api.github.com/repos/' + repo,
			dataType: 'jsonp',

			success: function(results){
				var repo = results.data;

				var date = new Date(repo.pushed_at);
				var pushed_at = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
				
				var $widget = $(' \
					<div class="github-box repo">  \
					    <div class="github-box-title"> \
					        <h3> \
					            <a class="owner" href="' + repo.owner.url.replace('api.','').replace('users/','') + '">' + repo.owner.login  + '</a> \
					            /  \
					            <a class="repo" href="' + repo.url.replace('api.','').replace('repos/','') + '">' + repo.name + '</a> \
					        </h3> \
					        <div class="github-stats"> \
					            <a class="watchers" href="' + repo.url.replace('api.','').replace('repos/','') + '/watchers">' + repo.watchers + '</a> \
					            <a class="forks" href="' + repo.url.replace('api.','').replace('repos/','') + '/forks">' + repo.forks + '</a> \
					        </div> \
					    </div> \
					    <div class="github-box-content"> \
					        <p class="description">' + repo.description + ' &mdash; <a href="' + repo.url.replace('api.','').replace('repos/','') + '#readme">Read More</a></p> \
					        <p class="link"><a href="' + repo.homepage + '">' + repo.homepage + '</a></p> \
					    </div> \
					    <div class="github-box-download"> \
					        <p class="updated">Latest commit to the <strong>master</strong> branch on ' + pushed_at + '</p> \
					        <a class="download" href="' + repo.url.replace('api.','').replace('repos/','') + '/zipball/master">Download as zip</a> \
					    </div> \
					</div> \
				');

				$widget.appendTo($container);
			} 
		})

	});

});