const axios  = require('axios');
const logger = require('./log.js');

const $anchors             = Array.from(document.querySelectorAll('.a-dashboard [data-scroll]'));
const $registerForm        = document.querySelector('form[action="/createTeam"]');
const $createTeamName      = document.getElementById('createTeamName');
const $createTeamSpotlight = document.getElementById('createTeamSpotlight');

const $joinForm     = document.querySelector('form[action="/joinTeam"]');
const $joinTeamName = document.getElementById('joinTeamName');

const $allowers = Array.from(document.querySelectorAll('.a-dashboard [data-allow]'));
const $denyers  = Array.from(document.querySelectorAll('.a-dashboard [data-deny]'));

if ($anchors.length > 0) {
    $anchors.forEach($anchor => {
        $anchor.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const $active = document.querySelector('.a-anchor--active');
            const $target = document.querySelector($anchor.getAttribute('href'));

            $active.classList.remove('a-anchor--active');
            $target.classList.add('a-anchor--active');
        });
    });
}

if ($registerForm) {
    $registerForm.addEventListener('submit', e => {
        e.preventDefault();

        axios
            .post('/createTeam', {
                name     : $createTeamName.value,
                spotlight: $createTeamSpotlight.value
            })
            .then(() => location.reload())
            .catch(err => {
                if (err.response.data.error === 'spotlight') {
                    logger.log('Veuillez choisir un spotlight');
                }

                if (err.response.data.error === 'teamlen') {
                    logger.log('Nom d\'équipe trop court (6 caractères minimum)');
                }

                if (err.response.data.error === 'alreadyInteam') {
                    logger.log('Vous êtes déjà dans une équipe');
                }

                if (err.response.data.error === 'duplicate') {
                    logger.log('Nom d\'équipe déjà existant');
                }

                if (err.response.data.error === 'full') {
                    logger.log('Spotlight plein');
                }
            });
    });
}

if ($joinForm) {
    $joinForm.addEventListener('submit', e => {
        e.preventDefault();

        axios
            .post('/joinTeam', {
                name: $joinTeamName.value
            })
            .then(() => location.reload())
            .catch(err => {
                if (err.response.data.error === 'full') {
                    logger.log('Équipe pleine');
                }
            });
    });
}

if ($allowers.length > 0) {
    $allowers.forEach($allower => {
        $allower.addEventListener('click', e => {
            e.preventDefault();

            const id = parseInt($allower.getAttribute('data-allow'), 10);

            axios
                .post('/allowPlayer', { id })
                .then(() => location.reload())
                .catch(err => {
                    if (err.response.data.error === 'team') {
                        logger.log('Vous devez être capitaine d\'équipe');
                    }

                    if (err.response.data.error === 'id') {
                        logger.log('Joueur invalide');
                    }
                });
        });
    });
}

if ($denyers.length > 0) {
    $denyers.forEach($denyer => {
        $denyer.addEventListener('click', e => {
            e.preventDefault();

            const id = parseInt($denyer.getAttribute('data-deny'), 10);

            axios
                .post('/denyPlayer', { id })
                .then(() => location.reload())
                .catch(err => {
                    if (err.response.data.error === 'team') {
                        logger.log('Vous devez être capitaine d\'équipe');
                    }

                    if (err.response.data.error === 'id') {
                        logger.log('Joueur invalide');
                    }
                });
        });
    });
}
