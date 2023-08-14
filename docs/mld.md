# Conception Merise : MLD

EVENT (id INTEGER, event_date DATE, location TEXT, duration INTEGER, nb_team INTEGER, status TEXT, #user_id(id))

USER (id INTEGER, username TEXT, email TEXT, password TEXT, #image_id(id))

SPORT (id INTEGER, name TEXT)

IMAGE (id INTEGER, url TEXT, key INTEGER, size INTEGER)

SKILL (id INTEGER, capacity_1 INTEGER, capacity_2 INTEGER)

<!-- Convertion : JOUER, 1N EVENT, 0N USER -->
EVENT_HAS_USER (event_id INTEGER, user_id INTEGER)

<!-- Convertion : AVOIR2, 11 EVENT, 0N SPORT -->
EVENT_HAS_SPORT (event_sport_id INTEGER, sport_id INTEGER)

<!-- Convertion : DETENIR, 0N IMAGE, 1N SPORT -->
SPORT_HAS_IMAGE (image_id INTEGER, sport_image_id INTEGER)

<!-- Convertion : POSSEDER, 0N SKILL, 0N USER -->
USER_HAS_SKILL (user_skill_id INTEGER, skill_id INTEGER)

<!-- Convertion : POSSEDER2, 1N SPORT, 0N SKILL -->
SPORT_HAS_SKILL (sport_skill_id INTEGER, skill_sport_id INTEGER)
