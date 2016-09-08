const Humane = require('humane-js');
const axios  = require('axios');

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
            Humane.log('Les mots de passe ne correspondent pas');
        }

        axios
            .post('/register', {
                name    : $registerNickname.value,
                password: $registerPassword1.value,
                email   : $registerMail.value
            })
            .then(res => console.log(res))
            .catch(err => {
                Humane.log('Pseudo ou mot de passe invalide');
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
                console.log('XX');
                Humane.log('Pseudo ou mot de passe invalide');
            });
    });
}
