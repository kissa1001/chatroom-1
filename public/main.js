$(document).ready(function() {
    var socket = io();
    var input = $('#message');
    var messages = $('#messages');
    var name = $('#screen-name');

    var showUser = function(name) {
        $('#current-user').text(name);
    };

    var displayClientCount = function(clients) {
        messages.append('<div>Connected Clients: ' + clients + '</div>');
    };

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    name.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var screenName = name.val();
        socket.emit('name', screenName);
        name.val('');
    });

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });

    socket.on('name', showUser);
    socket.on('userChange', addMessage);
    socket.on('message', addMessage);
    socket.on('users_count', displayClientCount);
});
