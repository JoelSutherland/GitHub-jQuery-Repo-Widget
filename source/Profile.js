require(['jquery', 'EasyWebApp'],  function ($, EWA) {


    function Repo_Filter(list) {

        return  $.map(list,  function (repo) {

            if ((! repo.fork)  &&  (
                repo.forks_count + repo.watchers_count + repo.stargazers_count
            )) {
                delete repo.owner;

                return repo;
            }
        }).sort(function (A, B) {

            return  (new Date( B.pushed_at ) - new Date( A.pushed_at ))  ||
                (B.stargazers_count - A.stargazers_count)  ||
                (B.watchers_count - A.watchers_count)  ||
                (B.forks_count - A.forks_count);
        });
    }

    function Tech_Filter(list) {

        var tech = { };

        $.each(list,  function () {

            for (var name in this) {

                tech[ name ] = tech[ name ]  ||  {
                    name:     name,
                    count:    0
                };

                tech[ name ].count += this[ name ];
            }
        });

        return  Array.from(Object.keys( tech ),  function (name) {

            return  tech[ name ];

        }).sort(function (A, B) {

            return  B.count - A.count;
        });
    }


    EWA.component(function (data) {

        data.countLanguage = function (event, data) {

            var view = this;

            data = Repo_Filter( data );

            Promise.all(Array.from(data,  function (repo) {

                return  $.getJSON( repo.languages_url );

            })).then(function (list) {

                view.languages = Tech_Filter( list ).slice(0, 8);
            });

            return data;
        };

        this.on('ready',  function () {

            this.render(
                'repoCount', this.$_View.find('[data-href]:listview > *').length
            ).watch('repoCount');
        });
    });
});
