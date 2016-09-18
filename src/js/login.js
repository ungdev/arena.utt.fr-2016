const logger = require('./log.js');
const axios  = require('axios');

const $modal = document.getElementById('modal-login');

const $registerForm = document.getElementById('registerForm');
const $loginForm    = document.getElementById('loginForm');

const $registerNickname = document.getElementById('registerNickname');
const $registerPassword1 = document.getElementById('registerPassword1');
const $registerPassword2 = document.getElementById('registerPassword2');
const $registerMail = document.getElementById('registerMail');
const $registerRules = document.getElementById('registerRules');
const $registerConditions = document.getElementById('registerConditions');

const $loginNickname = document.getElementById('loginNickname');
const $loginPassword = document.getElementById('loginPassword');

if ($registerForm) {
    $registerForm.addEventListener('submit', e => {
        e.preventDefault();

        if ($registerPassword1.value !== $registerPassword2.value) {
            logger.log('Les mots de passe ne correspondent pas');
            return;
        }

        if (!$registerRules.checked) {
            logger.log('Veuillez accepter les règles du tournoi');
            return;
        }

        if (!$registerConditions.checked) {
            logger.log('Veuillez accepter les conditions générales');
            return;
        }

        axios
            .post('/register', {
                name    : $registerNickname.value,
                password: $registerPassword1.value,
                email   : $registerMail.value
            })
            .then(res => {
                logger.log('Compte créé avec succès. Vous pouvez vous connecter.');
                $registerForm.reset();
                $modal.classList.remove('a-modal--switched');
                $loginNickname.focus();
            })
            .catch(err => {
                if (err.response.data.error === 'pwdlen') {
                    return logger.log('Mot de passe trop court (6 caractères minimum)');
                }

                if (err.response.data.error === 'namelen') {
                    return logger.log('Nom d\'utilisateur trop court (6 caractères minimum)');
                }

                if (err.response.data.error === 'mail') {
                    return logger.log('E-Mail invalide');
                }

                if (err.response.data.error === 'duplicate') {
                    if (err.response.data.field === 'name') {
                        return logger.log('Nom d\'utilisateur déjà existant');
                    } else if (err.response.data.field === 'email') {
                        return logger.log('E-mail déjà existant');
                    }
                }

                logger.log('Impossible de créer le compte');
            });
    });

    $loginForm.addEventListener('submit', e => {
        e.preventDefault();

        axios
            .post('/login', {
                name: $loginNickname.value,
                password: $loginPassword.value
            })
            .then(res => {
                location.href = '/dashboard';
            })
            .catch(err => {
                logger.log('Pseudo ou mot de passe invalide');
            });
    });
}
