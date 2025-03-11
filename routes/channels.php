<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


Broadcast::channel('chapter.{id}', function ($user, $id)  {
    return true;
});

Broadcast::channel('user.{id}', function ($user, $id)  {
    return true;
});