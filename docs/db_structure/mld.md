# Conception Merise : MLD

EVENT (id INTEGER, event_date DATE, location TEXT, duration INTEGER, nb_team INTEGER, nb_max_participant INTEGER, status TEXT, #user_id(id), #sport_id(name))

USER (id INTEGER, username TEXT, email TEXT, password TEXT, #image_id(url))

SPORT (id INTEGER, name TEXT)

IMAGE (id INTEGER, title TEXT, url TEXT)

<!-- Convertion : JOUER, 1N EVENT, 0N USER -->
EVENT_ON_USER (event_id INTEGER, user_id INTEGER)

<!-- Convertion : AJOUTER_EN_AMI, 0N USER, 0N USER -->
USER_ON_FRIEND (user_ask_id INTEGER, user_friend_id INTEGER)

<!-- Convertion : MAITRISER, 0N SPORT, 0N USER -->
USER_ON_SPORT (user_sport_id INTEGER, sport_id INTEGER)

<!-- Convertion : DETENIR, 0N IMAGE, 1N SPORT -->
SPORT_ON_IMAGE (image_id INTEGER, sport_image_id INTEGER)

<!-- Convertion : DISCUTER, 0N EVENT, 0N USER -->
EVENT_CHAT_ON_USER (user_event_id INTEGER, event_user_id INTEGER)
