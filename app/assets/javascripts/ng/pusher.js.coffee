angular.module('tj').factory '$actionCable', ['$rootScope', ($rootScope) ->

  socket = ActionCable.createConsumer();

  subscribe: (channel, callback) ->
    socket.subscriptions.create  { channel: channel },
      received: (data) ->
        console.log(data)
        $rootScope.$apply ()->
          callback(data)
]
