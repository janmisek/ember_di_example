    var Services = Ember.Namespace.create();

    // service class one
    Services.Me = Ember.Object.extend({
        name: function () {
            return 'Jan'
        }.property()
    })

    // service class two
    Services.Wife = Ember.Object.extend({
        name: function () {
            return 'Sarka'
        }.property()
    })

    // service class three
    Services.Children = Ember.Object.extend({
        name: function () {
            return 'Ondra'
        }.property()
    })


    App = Ember.Application.create({
        LOG_TRANSITIONS: true,

        ready: function () {
            // Register service class - instance will be created on demand
            this.register('service:me', Services.Me);
            this.register('service:wife', Services.Wife);

            // Register already instantiated service
            this.register('service:children', Services.Children.create(), {instantiate: false});

            // inject service to all routes, controllers, service will be accessible as me property
            this.inject('route', 'me', 'service:me');
            this.inject('controller', 'me', 'service:me');

            // inject wife and children to me, will be accessible as wife and children property
            this.inject('service:me', 'wife', 'service:wife');
            this.inject('service:me', 'children', 'service:children');

            // inject wife only to application controller, will be accessible as wife property on home controller
            this.inject('controller:Home', 'wife', 'service:wife')
        }
    });

    App.Router.map(function () {
        this.resource('Home', {path: '/home'});
    });