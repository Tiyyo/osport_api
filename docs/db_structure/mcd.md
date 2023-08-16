# Conception Merise : MCD

:
EVENT : ref, date, location, duration, nb_team, nb_max_participant, status
CREER, 11 EVENT, 0N USER
:

AVOIR2, 11 EVENT, 0N SPORT
JOUER, 1N EVENT, 0N USER
USER : ref, username, email, password
AJOUTER_EN_AMI, 0N USER, 0N USER

:
SPORT : ref, name
MAITRISER, 0N SPORT, 0N USER
AVOIR, 01 IMAGE, 01 USER

:
:
DETENIR, 0N IMAGE, 1N SPORT
IMAGE : ref,title ,url
