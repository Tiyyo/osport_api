# Conception Merise : MLD

Match (id INTEGER, name TEXT, description TEXT, event_date DATE, confirmed BOOLEAN, #sport_id(id), #player_id(id))

Sport (id INTEGER, name TEXT, description TEXT, picture url TEXT)

Player (id INTEGER, pseudo TEXT, name TEXT, email TEXT, password TEXT)

<!-- Convertion : jouer, NN Match, ON Player -->
Match_has_player (match_id INTEGER, player_id INTEGER)

<!-- Convertion : avoir en ami, ON Player, 1N Player -->
Player_is_friend_with_player (player_id INTEGER, player_friend_id INTEGER)
