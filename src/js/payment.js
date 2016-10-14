const axios = require('axios');

const $items  = Array.from(document.querySelectorAll('.a-item[data-item-toggle]'));
const $submit = document.querySelector('.a-payment-button');
const $total  = $submit && $submit.querySelector('.a-payment-button__price');

const $sizeResult = document.querySelector('.a-item__selected-size');
const $sizes      = Array.from(document.querySelectorAll('.a-item__sizes__size'));

const $genderResult = document.querySelector('.a-item__selected-gender');
const $genders      = Array.from(document.querySelectorAll('.a-item__genders__gender'));

const $email = document.getElementById('changeEmail');

const $oneofs = Array.from(document.querySelectorAll('[data-oneof]'));

const isInt = n => (n % 1) === 0;

const makeSum = () => {
    const s = $items
        .filter($item => $item.classList.contains('a-item--selected'))
        .map($item => {
            return parseFloat($item.getAttribute('data-item-toggle'));
        })
        .reduce((a, b) => a + b, 0)

    $total.textContent = s.toString() + '€';
};

$oneofs.forEach($oneof => {
    $oneof.addEventListener('click', e => {
        $oneofs.forEach($o => $o.classList.remove('a-item--selected'));
    });
});

$items.forEach($item => {
    $item.addEventListener('click', e => {
        $item.classList.toggle('a-item--selected');

        makeSum();

        // Activate sizes for t-shirt
        const $next = $item.nextElementSibling;
        if (!$next) {
            return;
        }

        if ($next.classList.contains('a-item__genders')) {
            if ($item.classList.contains('a-item--selected')) {
                $sizes[0].parentElement.classList.add('a-item__sizes--active');
                $genders[0].parentElement.classList.add('a-item__genders--active');
                $sizeResult.textContent = document.querySelector('[data-default-size]').textContent;
                $genderResult.textContent = document.querySelector('[data-default-gender]').textContent;
            } else {
                $sizes[0].parentElement.classList.remove('a-item__sizes--active');
                $genders[0].parentElement.classList.remove('a-item__genders--active');
                $sizeResult.textContent = '';
                $genderResult.textContent = '';
                document.querySelector('.a-item__sizes__size--selected').classList.remove('a-item__sizes__size--selected');
                document.querySelector('.a-item__genders__gender--selected').classList.remove('a-item__genders__gender--selected');
                document.querySelector('[data-default-size]').classList.add('a-item__sizes__size--selected');
                document.querySelector('[data-default-gender]').classList.add('a-item__genders__gender--selected');
            }
        }
    });
});

if ($submit) {
    $submit.addEventListener('click', e => {
        e.preventDefault();

        const data = {};

        if (document.querySelector('[data-ethernet]').classList.contains('a-item--selected')) {
            data.ethernet = true;
        }

        if (document.querySelector('[data-visit]').classList.contains('a-item--selected')) {
            data.visit = true;
        } else if (document.querySelector('[data-plusone]').classList.contains('a-item--selected')) {
            data.plusone = true;
        } else {
            data.normal = true;
        }

        const shirt = document.querySelector('[data-shirt]');

        if (shirt.classList.contains('a-item--selected')) {
            data.shirt = JSON.stringify({
                gender: document.querySelector('.a-item__genders > .a-item__genders__gender--selected').textContent,
                size  : document.querySelector('.a-item__sizes > .a-item__sizes__size--selected').textContent
            });
        }

        data.email = $email.value;

        const form  = document.createElement('form');
        form.method = 'post';
        form.action = `${location.origin}/etupay`;

        Object.keys(data).forEach(name => {
            const input = document.createElement('input');
            input.type  = 'hidden';
            input.name  = name;
            input.value = data[name];
            form.appendChild(input);
        });

        form.submit();
    });
}

$sizes.forEach($size => {
    $size.addEventListener('click', e => {
        const $previousSize = document.querySelector('.a-item__sizes__size--selected');

        $previousSize.classList.remove('a-item__sizes__size--selected');

        $sizeResult.textContent = $size.textContent;

        $size.classList.add('a-item__sizes__size--selected');
    });
});

$genders.forEach($gender => {
    $gender.addEventListener('click', e => {
        const $previousGender = document.querySelector('.a-item__genders__gender--selected');

        $previousGender.classList.remove('a-item__genders__gender--selected');

        $genderResult.textContent = $gender.textContent;

        $gender.classList.add('a-item__genders__gender--selected');
    });
});

if ($email) {
    const endsWith = (str, end) => str.indexOf(end, str.length - end.length) !== -1;

    const isPartner = () => {
        return endsWith($email.value.toLowerCase(), '@utt.fr') ||
            endsWith($email.value.toLowerCase(), '@utc.fr') ||
            endsWith($email.value.toLowerCase(), '@utbm.fr');
    }

    const $first   = document.querySelector('.a-item__price');
    const $plusone = document.querySelector('[data-plusone] > .a-item__price');

    let actualIsPartner = false;

    const checkMail = () => {
        const newIsPartner = isPartner();

        if (newIsPartner === actualIsPartner) {
            return;
        }

        actualIsPartner = newIsPartner;

        let r;
        if (newIsPartner) {
            $first.textContent   = '10€';
            $first.parentElement.setAttribute('data-item-toggle', '10');
            $plusone.textContent = '10€';
            $plusone.parentElement.setAttribute('data-item-toggle', '10');

            makeSum();
        } else {
            $first.textContent   = '15€';
            $first.parentElement.setAttribute('data-item-toggle', '15');
            $plusone.textContent = '15€';
            $plusone.parentElement.setAttribute('data-item-toggle', '15');

            makeSum();
        }
    };

    $email.addEventListener('keyup', checkMail);

    checkMail();
}
